// Builds a deck as a single self-contained HTML (the normal deck runtime: arrows/click/swipe navigation,
// overview, fullscreen; fonts and images embedded), ready to publish as a Claude artifact.
// Ported from vinta-slidedeck's build-deck; the publish-deck skill is the guide.
//
// Usage:
//   npm run build-deck                       your deck (src/slides/, served at /)
//   npm run build-deck -- samples            the sample presentations (or: patterns)
//   npm run build-deck -- --shots            also save one PNG per slide, rendered from the final HTML
//   npm run build-deck -- --name "Q3 Review" artifact title (default: the <title> in index.html)
//
// Output in output/exports/<name>/ (gitignored): <name>.html, text.txt (each slide's words and links, to scan
// before publishing), artifact.json (what to pass to the Artifact tool) and, with --shots, artifact-preview/.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'
import { chromium } from 'playwright'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const PUBLIC = path.join(ROOT, 'public')
const DECKS = ['main', 'patterns', 'samples']
const WAIT_MS = 1500 // time per slide for animations to load their images
const WARN_MB = 25
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm' }

const argv = process.argv.slice(2)
const shots = argv.includes('--shots')
const nameAt = argv.indexOf('--name')
const nameArg = nameAt !== -1 ? argv[nameAt + 1] : undefined
const deckName = argv.filter((a, i) => !a.startsWith('--') && (nameAt === -1 || i !== nameAt + 1))[0] ?? 'main'
if (!DECKS.includes(deckName)) fail(`Unknown deck "${deckName}". Use one of: ${DECKS.join(', ')}`)

const indexTitle = readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/<title>([^<]*)<\/title>/)?.[1]?.trim()
const title =
  nameArg ?? { main: indexTitle || 'Vinta deck', patterns: 'Vinta patterns', samples: 'Vinta sample presentations' }[deckName]
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'deck'
const dir = path.join(ROOT, 'output', 'exports', slug)
mkdirSync(dir, { recursive: true })

// 1. Bundle the app (JS and CSS in memory; fonts inlined as data URIs)
const ENTRY = 'virtual:artifact-entry'
const entryCode = `
import '/src/artifact/assets.ts'
import '/src/main.tsx'
`
const result = await build({
  configFile: path.join(ROOT, 'vite.config.ts'),
  root: ROOT,
  publicDir: false,
  // 'error': public/ is left out on purpose, so Vite would warn about every CSS url(/assets/...); step 3 embeds them.
  logLevel: 'error',
  plugins: [
    {
      name: 'artifact-entry',
      resolveId: (id) => (id === ENTRY ? '\0' + ENTRY : null),
      load: (id) => (id === '\0' + ENTRY ? entryCode : null),
    },
  ],
  build: {
    write: false,
    cssCodeSplit: false,
    modulePreload: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      input: ENTRY,
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'deck.js', assetFileNames: 'deck[extname]' },
    },
  },
})
const output = (Array.isArray(result) ? result[0] : result).output
const js = output.find((o) => o.type === 'chunk')?.code ?? ''
let css = output
  .filter((o) => o.type === 'asset' && o.fileName.endsWith('.css'))
  .map((o) => String(o.source))
  .join('\n')

// 2. Find the images in use by rendering each slide and recording the requests to /assets/
const browser = await chromium.launch()
const used = new Set()
for (const [, , p] of css.matchAll(/url\((['"]?)(\/assets\/[^'")]+)\1\)/g)) used.add(p)
{
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
  const errors = trackErrors(page)
  await page.route('http://deck.local/**', async (route) => {
    const { pathname } = new URL(route.request().url())
    if (pathname === '/index.html') return route.fulfill({ contentType: 'text/html', body: renderHtml(title, css, js, null) })
    const asset = decodeURIComponent(pathname)
    const file = path.join(PUBLIC, asset)
    if (asset.startsWith('/assets/') && existsSync(file)) {
      used.add(asset)
      return route.fulfill({ path: file })
    }
    errors.push(`file not found: ${asset}`)
    return route.fulfill({ status: 404, body: '' })
  })
  await page.goto('http://deck.local/index.html#/1')
  const count = await slideCount(page)
  for (let i = 1; i <= count; i++) await showSlide(page, i)
  await page.close()
  if (errors.length) fail(`Errors rendering the deck:\n- ${[...new Set(errors)].join('\n- ')}`)
}

// 3. Assemble the final HTML with the path → data URI map
const assets = {}
for (const asset of [...used].sort()) assets[asset] = dataUri(path.join(PUBLIC, asset))
css = css.replace(/url\((['"]?)(\/assets\/[^'")]+)\1\)/g, (m, _q, p) => (assets[p] ? `url("${assets[p]}")` : m))
const html = renderHtml(title, css, js, assets)
const outFile = path.join(dir, `${slug}.html`)
const outUrl = pathToFileURL(outFile).href
// The HTML may have been edited by hand since the last build: keep that version instead of overwriting it.
const manifestFile = path.join(dir, 'artifact.json')
const editedFile = path.join(dir, `${slug}.edited.html`)
if (existsSync(outFile) && existsSync(manifestFile)) {
  const built = JSON.parse(readFileSync(manifestFile, 'utf8')).sha256
  if (built && sha256(readFileSync(outFile)) !== built) {
    copyFileSync(outFile, editedFile)
    console.warn(`The HTML was edited after the last build; that version is kept in ${path.relative(ROOT, editedFile)}`)
  }
}
writeFileSync(outFile, html)
// Record this build's hash right away: a run that stops before step 4 must not leave artifact.json pointing at the
// previous HTML, or the next build would take this one for a hand edit.
const branch = git('branch', '--show-current')
const commit = git('rev-parse', '--short', 'HEAD')
const repo = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')).name
writeManifest({})

// 4. Check the final HTML offline (no network request, no error), save previews and the text to scan
{
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
  const errors = trackErrors(page)
  await page.route('**/*', (route) => {
    const url = route.request().url()
    if (url.split('#')[0] === outUrl) return route.continue()
    errors.push(`external request: ${url.startsWith('file://') ? url.slice(7) : url}`)
    return route.abort()
  })
  await page.goto(`${outUrl}#/1`)
  const count = await slideCount(page)
  if (shots) mkdirSync(path.join(dir, 'artifact-preview'), { recursive: true })
  // The previews show the slide alone, without the navigation bar.
  await page.addStyleTag({ content: '[data-deck-hud]{display:none!important}' })
  const sections = []
  const links = new Set()
  for (let i = 1; i <= count; i++) {
    await showSlide(page, i)
    if (shots) await page.screenshot({ path: path.join(dir, 'artifact-preview', `${String(i).padStart(2, '0')}.png`) })
    // The words and addresses a viewer sees, for the scan before publishing (publish-deck skill).
    const slide = await page.evaluate(() => {
      const stage = document.querySelector('[data-deck-index] [data-slide]')
      const name = document.querySelector('[data-deck-hud] .truncate')?.textContent ?? ''
      return {
        name,
        text: (stage?.innerText ?? '').replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim(),
        links: [...(stage?.querySelectorAll('a[href]') ?? [])].map((a) => a.href).filter((href) => /^(https?|mailto|tel):/.test(href)),
      }
    })
    sections.push(`## ${String(i).padStart(2, '0')}${slide.name ? ` · ${slide.name}` : ''}\n${slide.text}`)
    slide.links.forEach((href) => links.add(href))
  }
  await page.close()
  await browser.close()
  if (errors.length) fail(`The final HTML is not self-contained:\n- ${[...new Set(errors)].join('\n- ')}`)
  const mb = Buffer.byteLength(html) / 1024 / 1024
  const textFile = path.join(dir, 'text.txt')
  writeFileSync(textFile, `${sections.join('\n\n')}\n\n# Links\n${[...links].sort().join('\n')}\n`)

  writeManifest({
    description: `${title}: Vinta deck, ${count} slides, from ${repo}${branch ? ` (branch ${branch})` : ''}.`,
    slides: count,
    mb: Number(mb.toFixed(1)),
  })

  console.log(`\nArtifact: ${path.relative(ROOT, outFile)} (${count} slides, ${used.size} images, ${mb.toFixed(1)} MB)`)
  console.log(`Scan: ${path.relative(ROOT, textFile)} · Publish: ${path.relative(ROOT, manifestFile)}`)
  if (shots) console.log(`Preview: ${path.relative(ROOT, path.join(dir, 'artifact-preview'))}/`)
  if (mb > WARN_MB) console.warn(`Warning: file over ${WARN_MB} MB. Large images in public/assets weigh more than everything else.`)
}

function renderHtml(docTitle, styles, script, assetMap) {
  const safe = (s) => s.replace(/<\/(script|style)/gi, '<\\/$1')
  const json = (v) => JSON.stringify(v).replace(/</g, '\\u003c')
  const map = assetMap ? `window.__DECK_ASSETS__=${json(assetMap)};` : ''
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${docTitle.replace(/</g, '&lt;')}</title>
<style>${safe(styles)}</style>
<script>window.__DECK_NAME__=${json(deckName)};${map}</script>
</head>
<body>
<div id="root"></div>
<script>${safe(script)}</script>
</body>
</html>
`
}

async function slideCount(page) {
  await page.waitForSelector('[data-deck-count]')
  return Number(await page.getAttribute('[data-deck-count]', 'data-deck-count'))
}

async function showSlide(page, n) {
  await page.evaluate((i) => (window.location.hash = `#/${i}`), n)
  await page.waitForSelector(`[data-deck-index="${n - 1}"]`)
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
  })
  await page.waitForTimeout(WAIT_MS)
}

function trackErrors(page) {
  const errors = []
  page.on('pageerror', (err) => errors.push(`script error: ${err.message}`))
  page.on('console', (msg) => msg.type() === 'error' && !msg.text().includes('ERR_FAILED') && errors.push(`console: ${msg.text()}`))
  return errors
}

function dataUri(file) {
  const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream'
  return `data:${type};base64,${readFileSync(file).toString('base64')}`
}

// What to pass to the Artifact tool; the description's fixed shape finds the artifact again from another session.
function writeManifest(extra) {
  const manifest = {
    title,
    deck: deckName,
    ...extra,
    page: path.relative(ROOT, outFile),
    branch,
    commit,
    // tells a hand edit of the HTML from the build's own output
    sha256: sha256(html),
  }
  writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`)
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex')
}

function git(...args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

function fail(message) {
  console.error(message)
  process.exit(1)
}
