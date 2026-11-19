import type { ComponentType } from "react";
import { CHART_PALETTE, Slide, mdText, parseMarkdownSlide, type DeckSlide, type MdContent, type MdDoc, type MdSection } from "@/lib";
import {
  Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18, Slide19, Slide20,
  Slide21, Slide22, Slide23, Slide24, Slide25, Slide26, Slide27, Slide28, Slide29, Slide30,
  Slide31, Slide32, Slide33, Slide34, Slide35, Slide36, Slide37, Slide38, Slide39, Slide40,
  Slide41, Slide42, Slide43, Slide44, Slide45, Slide46, Slide47, Slide48, Slide49, Slide50,
} from "./index";

// Markdown slides: a `.md` file picks one of the 50 layouts with `template: NN` in its
// frontmatter, and its body is mapped onto that layout's props by the table below.
// Frontmatter `props:` override anything the body produced. See MARKDOWN.md.

/** How one template turns a parsed markdown body into its props. */
interface MarkdownTemplate {
  Component: ComponentType<Record<string, unknown>>;
  fromMarkdown: (doc: MdDoc) => Record<string, unknown>;
}

/** Ties a mapper to its component so the mapper's return type is checked against the layout's props. */
function tpl<P extends object>(Component: ComponentType<P>, fromMarkdown: (doc: MdDoc) => P): MarkdownTemplate {
  return {
    Component: Component as unknown as ComponentType<Record<string, unknown>>,
    fromMarkdown: fromMarkdown as (doc: MdDoc) => Record<string, unknown>,
  };
}

// ---- body → prop helpers ---------------------------------------------------
// Each returns `undefined` when the body has nothing for it, so the layout keeps its default.

const some = <T,>(xs: T[]): T[] | undefined => (xs.length ? xs : undefined);
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Every paragraph line and list item in a block, in order. */
const lines = (c: MdContent) => [...c.paragraphs.flatMap((p) => p.split("\n")), ...c.list];

/** First paragraph = the lead/subtitle; the rest = body. */
const lead = (c: MdContent) => c.paragraphs[0];
const afterLead = (c: MdContent) => mdText({ paragraphs: c.paragraphs.slice(1) });

const body = (d: MdDoc) => mdText(d);
const paragraphs = (d: MdDoc) => some(d.paragraphs);
const list = (d: MdDoc) => some(d.list);

/** Every image in the slide (top level first, then by section). */
const images = (d: MdDoc) => [...d.images, ...d.sections.flatMap((s) => s.images)].map((i) => i.src);
const photo = (d: MdDoc) => images(d)[0];

/** The first fenced code block anywhere in the slide. */
const code = (d: MdDoc) => d.code ?? d.sections.find((s) => s.code)?.code;
const codeProps = (d: MdDoc) => ({ title: d.title, code: code(d)?.value, language: code(d)?.lang });

/** `## Heading` + text → `{ title, text }`. */
const cards = (d: MdDoc) => some(d.sections.map((s) => ({ title: s.heading, text: mdText(s) ?? "" })));

/** A heading like `03 Ship` or `03. Ship` keeps its number; otherwise items are numbered 01, 02… */
function numbered(heading: string, i: number) {
  const m = heading.match(/^(\d+)[.)]?\s+(.+)$/);
  return m ? { number: m[1], title: m[2] } : { number: pad2(i + 1), title: heading };
}
const numberedSections = (d: MdDoc) =>
  some(d.sections.map((s, i) => ({ ...numbered(s.heading, i), text: mdText(s) ?? "" })));

/** `## 200+` + caption → `{ value, caption }`. */
const stats = (d: MdDoc) => some(d.sections.map((s) => ({ value: s.heading, caption: mdText(s) ?? "" })));

/** `- Label: value` list items → `{ label, value }`. */
function pairs(d: MdDoc) {
  return some(
    d.list.map((item) => {
      const at = item.indexOf(":");
      return at === -1
        ? { label: "", value: item }
        : { label: item.slice(0, at).trim(), value: item.slice(at + 1).trim() };
    }),
  );
}

/** `## Name` + one line each for role, line1, line2. */
const people = (d: MdDoc) =>
  some(d.sections.map((s: MdSection) => {
    const [role = "", line1 = "", line2 = ""] = lines(s);
    return { name: s.heading, role, line1, line2 };
  }));

/** "$1,200 USD" → 1200. */
function num(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Chart rows from a `| label | value |` table or `- label: value` list items. */
function dataRows(d: MdDoc): { label: string; raw: string }[] {
  if (d.table) return d.table.rows.map((r) => ({ label: r[0] ?? "", raw: r[1] ?? "" }));
  return (pairs(d) ?? []).map((p) => ({ label: p.label, raw: p.value }));
}
const isPlainNumber = (s: string) => /^-?\d+(\.\d+)?$/.test(s.trim());

const PIE_COLORS = [
  { color: "#0052ff", labelColor: "#ffffff" },
  { color: "#0b1220", labelColor: "#ffffff" },
  { color: "#d9d9d9", labelColor: "#000000" },
  { color: "#2e6bff", labelColor: "#ffffff" },
  { color: "#a8c5f5", labelColor: "#000000" },
];
const COLUMN_COLORS = ["#0b1220", "#0052ff", ...CHART_PALETTE.slice(2)];

// ---- the table -------------------------------------------------------------

const none = () => ({});

/** Layout number → how a markdown body fills it. Mirrors the props in CATALOG.md. */
export const MARKDOWN_TEMPLATES: Record<number, MarkdownTemplate> = {
  1: tpl(Slide01, none),
  2: tpl(Slide02, none),
  3: tpl(Slide03, none),
  4: tpl(Slide04, (d) => ({ line1: d.title, line2: lead(d), meta: pairs(d) })),
  5: tpl(Slide05, (d) => ({ title: d.title, meta: pairs(d) })),
  6: tpl(Slide06, (d) => ({ line1: d.title, line2: lead(d) })),
  7: tpl(Slide07, (d) => ({ title: d.title, meta: pairs(d) })),
  8: tpl(Slide08, (d) => ({
    title: d.title,
    heading: d.sections[0]?.heading,
    body: d.sections[0] ? mdText(d.sections[0]) : body(d),
    photo: photo(d),
  })),
  9: tpl(Slide09, (d) => ({ title: d.title, body: body(d), photo: photo(d) })),
  10: tpl(Slide10, (d) => ({
    title: d.title,
    intro: body(d),
    items: d.ordered ? some(d.list.map((t, i) => `${pad2(i + 1)}. ${t}`)) : list(d),
  })),
  11: tpl(Slide11, (d) => ({
    title: d.title,
    overlayTitle: lead(d),
    overlayBody: afterLead(d),
    features: cards(d),
  })),
  12: tpl(Slide12, (d) => ({ title: d.title, body: paragraphs(d), stats: stats(d) })),
  13: tpl(Slide13, (d) => ({ title: d.title, body: body(d), stats: stats(d) })),
  14: tpl(Slide14, (d) => ({
    items: d.list.length
      ? some(d.list.map((t, i) => numbered(t, i)))
      : some(d.sections.map((s, i) => numbered(s.heading, i))),
  })),
  15: tpl(Slide15, (d) => ({ cards: cards(d) })),
  16: tpl(Slide16, (d) => ({ title: d.title, items: list(d) })),
  17: tpl(Slide17, (d) => ({ title: d.title, body: body(d), cards: cards(d) })),
  18: tpl(Slide18, (d) => ({ items: numberedSections(d) })),
  19: tpl(Slide19, (d) => ({ title: d.title, subtitle: lead(d), body: afterLead(d), items: numberedSections(d) })),
  20: tpl(Slide20, (d) => ({ kicker: d.kicker, statement: d.title })),
  21: tpl(Slide21, (d) => ({ title: d.title, body: body(d), photo: photo(d) })),
  22: tpl(Slide22, (d) => ({ title: d.title, body: body(d), stats: stats(d) })),
  23: tpl(Slide23, (d) => ({
    title: d.title,
    body: body(d),
    data: some(dataRows(d).map((r) => ({
      label: r.label,
      value: num(r.raw),
      valueLabel: isPlainNumber(r.raw) ? undefined : r.raw,
    }))),
  })),
  24: tpl(Slide24, (d) => ({
    title: d.title,
    data: some(dataRows(d).map((r, i) => ({ label: r.label, value: num(r.raw), ...PIE_COLORS[i % PIE_COLORS.length] }))),
  })),
  25: tpl(Slide25, (d) => ({
    title: d.title,
    series: d.table && some(d.table.head.slice(1).map((name, i) => ({ name, color: COLUMN_COLORS[i % COLUMN_COLORS.length] }))),
    groups: d.table && some(d.table.rows.map((r) => ({ label: r[0] ?? "", values: r.slice(1).map(num) }))),
  })),
  26: tpl(Slide26, (d) => ({
    panels: some(d.sections.map((s) => {
      const [title = "", ...caption] = lines(s);
      return {
        stat: s.heading,
        percent: /%\s*$/.test(s.heading) ? num(s.heading) / 100 : undefined,
        title,
        caption: caption.join("\n"),
      };
    })),
  })),
  27: tpl(Slide27, (d) => ({ title: d.title, body: paragraphs(d) })),
  28: tpl(Slide28, (d) => ({ title: d.title, photos: some(images(d)) })),
  29: tpl(Slide29, (d) => ({ title: d.title, body: body(d), photo: photo(d) })),
  30: tpl(Slide30, (d) => ({ title: d.title, body: body(d), photo: photo(d) })),
  31: tpl(Slide31, (d) => ({ photos: some(images(d)) })),
  32: tpl(Slide32, (d) => ({ title: d.title, labels: list(d), graphic: photo(d) })),
  33: tpl(Slide33, (d) => ({ title: d.title, cards: cards(d) })),
  34: tpl(Slide34, (d) => ({ title: d.title, items: list(d), photo: photo(d) })),
  35: tpl(Slide35, codeProps),
  36: tpl(Slide36, codeProps),
  37: tpl(Slide37, codeProps),
  38: tpl(Slide38, (d) => ({ ...codeProps(d), topics: list(d) })),
  39: tpl(Slide39, (d) => ({ ...codeProps(d), subtitle: lead(d) })),
  40: tpl(Slide40, (d) => ({ ...codeProps(d), body: paragraphs(d) })),
  41: tpl(Slide41, (d) => ({ ...codeProps(d), body: paragraphs(d) })),
  42: tpl(Slide42, (d) => ({
    title: d.title,
    body: body(d),
    people: people(d)?.map(({ name, role }) => ({ name, role })),
  })),
  43: tpl(Slide43, (d) => ({ title: d.title, body: body(d), people: people(d) })),
  44: tpl(Slide44, (d) => ({ title: d.title, people: people(d) })),
  45: tpl(Slide45, (d) => ({ title: d.title, contacts: pairs(d) })),
  46: tpl(Slide46, (d) => ({ title: d.title, contacts: list(d) })),
  47: tpl(Slide47, (d) => ({ title: d.kicker, subtitle: d.title, contacts: pairs(d) })),
  48: tpl(Slide48, (d) => ({ title: d.title, contacts: pairs(d) })),
  49: tpl(Slide49, (d) => ({ title: d.title, body: body(d), email: d.list[0] })),
  50: tpl(Slide50, none),
};

// ---- loading a .md file into a deck slide ----------------------------------

/** Frontmatter keys a markdown slide understands; anything else is reported as an error. */
const FRONTMATTER_KEYS = ["template", "title", "notes", "props"];

/** `19`, `"19"`, `"Slide19"`, `"slide-19"` → 19. */
function templateNumber(value: unknown): number | undefined {
  if (typeof value !== "number" && typeof value !== "string") return undefined;
  const m = String(value).match(/^\s*(?:slide[-_ ]?)?0*(\d{1,2})\s*$/i);
  return m ? parseInt(m[1], 10) : undefined;
}

const optString = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v : undefined);

function withoutUndefined(props: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined));
}

/**
 * Build a {@link DeckSlide} from a markdown slide file. Problems (bad YAML, unknown
 * template, stray frontmatter keys) don't break the deck: they render as an error slide
 * naming the file, so the author sees exactly what to fix.
 */
export function markdownSlide(id: string, source: string): DeckSlide {
  try {
    const { frontmatter, doc } = parseMarkdownSlide(source);

    const unknown = Object.keys(frontmatter).filter((k) => !FRONTMATTER_KEYS.includes(k));
    if (unknown.length) {
      throw new Error(
        `Unknown frontmatter key${unknown.length > 1 ? "s" : ""}: ${unknown.join(", ")}. ` +
          `Allowed: ${FRONTMATTER_KEYS.join(", ")} — layout props go under "props:".`,
      );
    }

    const n = templateNumber(frontmatter.template);
    if (frontmatter.template === undefined) throw new Error('Missing "template:" in frontmatter (e.g. template: 19).');
    const template = n === undefined ? undefined : MARKDOWN_TEMPLATES[n];
    if (!template) throw new Error(`Unknown template "${String(frontmatter.template)}" — use a layout number 1–50.`);

    const overrides = frontmatter.props ?? {};
    if (typeof overrides !== "object" || Array.isArray(overrides)) {
      throw new Error('"props:" must be a mapping of layout props (e.g. props: { title: Hi }).');
    }

    const props = { ...withoutUndefined(template.fromMarkdown(doc)), ...(overrides as Record<string, unknown>) };
    const Layout = template.Component;
    const Component = () => <Layout {...props} />;
    Component.displayName = `Markdown(${id})`;

    return {
      id,
      Component,
      title: optString(frontmatter.title) ?? doc.title ?? doc.kicker,
      // Speaker notes for the presenter window: frontmatter `notes:` and/or the closing comment.
      notes: [optString(frontmatter.notes), doc.notes].filter(Boolean).join("\n\n") || undefined,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[markdown slide] ${id}.md: ${message}`);
    const Component = () => <MarkdownErrorSlide file={`${id}.md`} message={message} />;
    return { id, Component, title: `⚠ ${id}.md` };
  }
}

/** Shown in place of a markdown slide that failed to load. */
function MarkdownErrorSlide({ file, message }: { file: string; message: string }) {
  return (
    <Slide bg="white">
      <div className="flex h-full flex-col justify-center gap-8">
        <div className="font-mono text-[28px] text-vinta-blue">src/slides/{file}</div>
        <div className="text-[64px] font-bold leading-tight text-vinta-ink">This markdown slide couldn’t be rendered</div>
        <div className="max-w-[1500px] whitespace-pre-wrap font-mono text-[32px] leading-snug text-vinta-muted">{message}</div>
      </div>
    </Slide>
  );
}
