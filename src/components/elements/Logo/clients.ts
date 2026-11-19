/** Client logo catalog, extracted from the website.vinta.studio home ("Working with teams across
 *  healthcare" and "Healthcare products we've designed and built" sections). Each client's link is its case page on the site. */

export type ClientLogoTone = 'muted' | 'color' | 'ink' | 'white'

export interface ClientLogoFile {
  /** Path in public/ */
  src: string
  /** muted = blue-gray #657ca1 (the site's trust strip) · color = brand color · ink = #172235
   *  · white = white logo for dark backgrounds (case library logos, from vintasoftware.com/clients) */
  tone: ClientLogoTone
  /** Different logo variant (e.g. wordmark only). */
  variant?: 'wordmark'
}

export interface ClientEntry {
  name: string
  /** Other names used on the site. */
  aka?: string[]
  logos: ClientLogoFile[]
  /** Case page on the site. Absent = the site has no case for this client. */
  caseUrl?: string
  /** Case page title. */
  caseTitle?: string
  /** What was left open or decided during extraction. */
  note?: string
}

const S = '/assets/clients/site'
const SITE = 'https://website.vinta.studio'

export const CLIENTS: ClientEntry[] = [
  {
    name: 'Medplum',
    logos: [{ src: `${S}/medplum.svg`, tone: 'muted' }, { src: `${S}/medplum-color.svg`, tone: 'color' }],
    caseUrl: `${SITE}/work/medplum`,
    caseTitle: 'Medplum: fast-tracking healthcare solutions for EHR building',
  },
  {
    name: 'Mayo Clinic',
    logos: [{ src: `${S}/mayo-clinic.svg`, tone: 'muted' }],
    note: 'No case page on the site.',
  },
  {
    name: 'Quilted Health',
    aka: ['Quilted EHR'],
    logos: [
      { src: `${S}/quilted-health.svg`, tone: 'muted' },
      { src: `${S}/quilted-health-color.svg`, tone: 'color' },
      { src: `${S}/quilted-health-wordmark-color.svg`, tone: 'color', variant: 'wordmark' },
    ],
    caseUrl: `${SITE}/work/quilted-health`,
    caseTitle: 'Quilted Health: legacy EHR meets modern healthcare tech',
  },
  {
    name: 'Brain Health USA',
    aka: ['Brain Health USA Center'],
    logos: [{ src: `${S}/brain-health-usa.webp`, tone: 'muted' }],
    caseUrl: `${SITE}/work/brain-health-usa`,
    caseTitle: 'Brain Health USA: a production-ready EHR roadmap for high-volume, multi-state psychiatric care',
    note: 'Único logo raster (WebP) do site.',
  },
  {
    name: 'Everself',
    aka: ['Bariendo'],
    logos: [{ src: `${S}/everself.svg`, tone: 'muted' }, { src: `${S}/everself-ink.svg`, tone: 'ink' }],
    caseUrl: `${SITE}/work/everself-bariendo`,
    caseTitle: 'Everself: extending Medplum’s Provider App to power obesity care workflows',
  },
  {
    name: 'Family Caregiver Alliance',
    logos: [{ src: `${S}/family-caregiver-alliance.svg`, tone: 'muted' }, { src: `${S}/family-caregiver-alliance-ink.svg`, tone: 'ink' }],
    caseUrl: `${SITE}/work`,
    note: 'The home card points to the /work list; there is no dedicated case page.',
  },
  {
    name: 'UNDP',
    aka: ['United Nations'],
    logos: [{ src: `${S}/undp.svg`, tone: 'muted' }, { src: `${S}/undp-color.svg`, tone: 'color' }],
    caseUrl: `${SITE}/work/un-social-protection-org`,
    caseTitle: 'United Nations: social protection knowledge powered by LLM',
  },
  {
    name: 'Unilever',
    logos: [{ src: `${S}/unilever.svg`, tone: 'muted' }],
    caseUrl: `${SITE}/work/unilever-product-discovery`,
    caseTitle: 'Unilever: product discovery boosts factory efficiency in 2 weeks',
  },
  {
    name: 'Rewind',
    logos: [{ src: `${S}/rewind.webp`, tone: 'color' }],
    caseUrl: `${SITE}/work/rewind`,
    caseTitle: 'Rewind: breaking down EHR migration barriers',
  },
  {
    name: 'Origin Therapy',
    aka: ['Child Care Healthtech'],
    logos: [{ src: `${S}/origin-therapy-color.svg`, tone: 'color' }],
    caseUrl: `${SITE}/work/child-care-ehr`,
    caseTitle: 'Child Care Healthtech: building a platform for specialty healthcare',
  },
  {
    name: 'Perci Health',
    logos: [{ src: '/assets/who-is-vinta/client-perci-health.png', tone: 'muted' }],
    caseUrl: `${SITE}/work/perci-health`,
    caseTitle: 'Mapping Perci’s care operations into a scalable Medplum architecture',
    note: 'The home has no Perci logo; uses the Figma PNG (Who is Vinta).',
  },
  {
    name: 'Carta',
    logos: [{ src: '/assets/cases/case-carta-logo.png', tone: 'white' }],
    caseTitle: 'Carta: Django modernization at high growth',
    note: 'White logo only (case library); use it on dark backgrounds.',
  },
  {
    name: 'PlusPlus',
    logos: [{ src: '/assets/cases/case-plusplus-logo.png', tone: 'white' }],
    caseTitle: 'PlusPlus: scaling Twitter University to a global platform',
    note: 'White logo only (case library); use it on dark backgrounds.',
  },
  {
    name: 'Lastmile',
    logos: [{ src: '/assets/cases/case-lastmile-logo.png', tone: 'white' }],
    caseTitle: 'Lastmile: a multi-location retail platform',
    note: 'White logo only (case library); use it on dark backgrounds.',
  },
  {
    name: 'Tesorio',
    logos: [{ src: '/assets/cases/case-tesorio-logo.png', tone: 'white' }],
    caseTitle: 'Tesorio: importing large-scale fintech data',
    note: 'White logo only (case library); use it on dark backgrounds.',
  },
  {
    name: 'Splendid Spoon',
    logos: [{ src: '/assets/cases/case-splendid-spoon-logo.png', tone: 'white' }],
    caseTitle: 'Splendid Spoon: healthy food delivered across the US',
    note: 'White logo only (case library); use it on dark backgrounds.',
  },
]

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

/** Finds the client by name (or alternative name), case-insensitive. */
export function getClient(name: string): ClientEntry | undefined {
  const n = norm(name)
  return CLIENTS.find((c) => norm(c.name) === n || c.aka?.some((a) => norm(a) === n))
}

/** Logo path of a client by name. Returns the requested variant, or the first available. */
export function clientLogo(name: string, tone: ClientLogoTone = 'muted'): string | undefined {
  const client = getClient(name)
  if (!client) return undefined
  const main = client.logos.filter((l) => !l.variant)
  return (main.find((l) => l.tone === tone) ?? main[0])?.src
}
