import type { ComponentProps, ComponentType, JSXElementConstructor } from "react";
import { mdText, type MdContent, type MdDoc, type MdSection } from "@/lib";
import * as DS from "./index";

// Markdown slides on the design-system patterns: `template: SlideCover` (or `cover`, `slide-cover`…)
// in a `.md` slide's frontmatter. Every pattern can be picked this way and filled through `props:`;
// the ones below also read the markdown body. Icons and other components can't be written in
// markdown — patterns that need them (StepPath, IconCards…) are for `.tsx` slides. See MARKDOWN.md.

export interface PatternTemplate {
  Component: ComponentType<Record<string, unknown>>;
  /** Maps the body onto props; absent for patterns filled only through `props:`. */
  fromMarkdown?: (doc: MdDoc) => Record<string, unknown>;
}

/** "SlideCover", "slide-cover", "Cover", "big stat" → "cover" / "bigstat". */
export function patternKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/^slide(?=.)/, "");
}

/** Ties a mapper to its pattern so the mapper's return type is checked against the pattern's props. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function map<C extends JSXElementConstructor<any>>(
  _Component: C,
  fromMarkdown: (doc: MdDoc) => Partial<ComponentProps<C>>,
) {
  return fromMarkdown as (doc: MdDoc) => Record<string, unknown>;
}

// ---- body → prop helpers ---------------------------------------------------
// Each returns `undefined` when the body has nothing for it, so the prop stays unset.

const some = <T,>(xs: T[]): T[] | undefined => (xs.length ? xs : undefined);
const lines = (c: MdContent) => [...c.paragraphs.flatMap((p) => p.split("\n")), ...c.list];
const lead = (c: MdContent) => c.paragraphs[0];
const afterLead = (c: MdContent) => mdText({ paragraphs: c.paragraphs.slice(1) });
const rest = (xs: string[]) => (xs.length ? xs.join("\n") : undefined);

/** A bare `photo.webp` resolves from `public/assets/`; paths and URLs pass through. */
const assetSrc = (src: string) => (/^(https?:|\/|data:)/.test(src) ? src : `/assets/${src}`);
const images = (d: MdDoc) => [...d.images, ...d.sections.flatMap((s) => s.images)].map((i) => assetSrc(i.src));
const photo = (d: MdDoc) => images(d)[0];

/** The two-tone header every site-look pattern opens with. */
const header = (d: MdDoc) => ({ eyebrow: d.kicker, title: d.title, accent: d.accent, lede: lead(d) });

/** Each `## Heading` + its lines → `f(heading, lines, section)`. */
const sections = <T,>(d: MdDoc, f: (heading: string, ls: string[], s: MdSection) => T) =>
  some(d.sections.map((s) => f(s.heading, lines(s), s)));

/** The first number in a cell: "$1,200 USD" → 1200, "28% · 10" → 28. */
function num(s: string): number {
  const m = s.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
}
const isPlainNumber = (s: string) => /^-?\d+(\.\d+)?%?$/.test(s.trim());

/** Chart rows from a `| label | value |` table, or `- label: value` list items. */
function dataRows(d: MdDoc): { label: string; raw: string }[] {
  if (d.table) return d.table.rows.map((r) => ({ label: r[0] ?? "", raw: r[1] ?? "" }));
  return d.list.flatMap((item) => {
    const at = item.indexOf(":");
    return at === -1 ? [] : [{ label: item.slice(0, at).trim(), raw: item.slice(at + 1).trim() }];
  });
}

/** Table cells: ✓ / yes / true → a check, — / - / no / false → a dash, anything else as written. */
function cell(value: string): string | boolean {
  const v = value.trim().toLowerCase();
  if (["✓", "✔", "yes", "true", "x"].includes(v)) return true;
  if (["—", "-", "–", "no", "false", ""].includes(v)) return false;
  return value;
}

// ---- the table -------------------------------------------------------------

/** Pattern name (normalized with {@link patternKey}) → how a markdown body fills it. */
const MAPPERS: Record<string, (doc: MdDoc) => Record<string, unknown>> = {
  cover: map(DS.SlideCover, (d) => ({
    ...header(d),
    tags: some(d.list),
    photo: photo(d),
    variant: photo(d) ? ("split" as const) : undefined,
  })),
  statement: map(DS.SlideStatement, (d) => ({ ...header(d), text: afterLead(d) })),
  code: map(DS.SlideCode, (d) => {
    const fence = d.code ?? d.sections.find((s) => s.code)?.code;
    return { ...header(d), code: fence?.value, language: fence?.lang };
  }),
  agenda: map(DS.SlideAgenda, (d) => ({
    ...header(d),
    items:
      sections(d, (title, [detail, meta]) => ({ title, detail, meta })) ??
      some(d.list.map((title) => ({ title }))),
    photo: photo(d),
  })),
  content: map(DS.SlideContent, (d) => ({ ...header(d), bullets: some(d.list), photo: photo(d) })),
  twocolumn: map(DS.SlideTwoColumn, (d) => ({ ...header(d), body: afterLead(d), bullets: some(d.list), photo: photo(d) })),
  quote: map(DS.SlideQuote, (d) => {
    const [author, role] = (d.paragraphs[1] ?? "").split("\n");
    return { quote: d.paragraphs[0], author: author || undefined, role: role || undefined, photo: photo(d) };
  }),
  bigstat: map(DS.SlideBigStat, (d) => ({
    ...header(d),
    stats: sections(d, (value, ls) => ({ value, label: ls.join("\n") })),
    photo: photo(d),
  })),
  faq: map(DS.SlideFaq, (d) => ({ ...header(d), items: sections(d, (question, ls) => ({ question, answer: ls.join("\n") })) })),
  numberedlist: map(DS.SlideNumberedList, (d) => ({ ...header(d), items: sections(d, (title, ls) => ({ title, text: ls.join("\n") })) })),
  numberedgrid: map(DS.SlideNumberedGrid, (d) => ({ ...header(d), cards: sections(d, (title, _ls, s) => ({ title, bullets: s.list })) })),
  statrows: map(DS.SlideStatRows, (d) => ({
    ...header(d),
    rows: sections(d, (value, [title = "", ...more]) => ({ value, title, text: more.join("\n") })),
  })),
  versus: map(DS.SlideVersus, (d) => {
    const [left, right] = d.sections.map((s) => ({ title: s.heading, items: s.list }));
    return { ...header(d), left, right };
  }),
  comparison: map(DS.SlideComparison, (d) => ({
    ...header(d),
    note: afterLead(d),
    table: d.table && {
      labelHeader: d.table.head[0],
      columns: d.table.head.slice(1).map((title) => ({ title })),
      rows: d.table.rows.map(([label = "", ...cells]) => ({ label, cells: cells.map(cell) })),
    },
  })),
  datatable: map(DS.SlideDataTable, (d) => ({
    ...header(d),
    columns: d.table?.head.map((header) => ({ header })),
    rows: d.table?.rows,
  })),
  team: map(DS.SlideTeam, (d) => ({
    ...header(d),
    people: sections(d, (name, [role = "", ...bio], s) => ({
      name,
      role,
      bio: rest(bio),
      src: s.images[0] && assetSrc(s.images[0].src),
    })),
  })),
  rankingbars: map(DS.SlideRankingBars, (d) => ({
    ...header(d),
    rows: some(dataRows(d).map((r) => ({ label: r.label, value: num(r.raw), valueLabel: isPlainNumber(r.raw) ? undefined : r.raw }))),
  })),
  donutchart: map(DS.SlideDonutChart, (d) => ({
    ...header(d),
    segments: some(dataRows(d).map((r) => ({ label: r.label, value: num(r.raw) }))),
    takeaways: d.table ? some(d.list) : undefined,
  })),
  progressrings: map(DS.SlideProgressRings, (d) => ({
    ...header(d),
    rings: sections(d, (value, [label = "", ...description]) => ({ value: num(value), label, description: rest(description) })),
  })),
  heronumber: map(DS.SlideHeroNumber, (d) => {
    const s = d.sections[0];
    const [previous, value] = s?.heading.includes("→") ? s.heading.split("→").map((x) => x.trim()) : [undefined, s?.heading];
    return { ...header(d), value, previous, caption: s && mdText(s), points: some(d.list) ?? some(s?.list ?? []) };
  }),
  funnel: map(DS.SlideFunnel, (d) => ({
    ...header(d),
    stages: sections(d, (label, [value = "", ...description]) => ({ label, value, description: description.join("\n") })),
  })),
  barchart: map(DS.SlideBarChart, (d) => ({
    ...header(d),
    groups: d.table && some(d.table.rows.map(([label = "", ...values]) => ({
      label,
      bars: d.table!.head.slice(1).map((bar, i) => ({ label: bar, value: num(values[i] ?? "") })),
    }))),
  })),
  linechart: map(DS.SlideLineChart, (d) => {
    const t = d.table;
    const series = (col: number) =>
      t && t.head[col] !== undefined ? { label: t.head[col], values: t.rows.map((r) => num(r[col] ?? "")) } : undefined;
    return { ...header(d), labels: t?.rows.map((r) => r[0] ?? ""), primary: series(1), reference: series(2) };
  }),
};

/** Every exported `Slide*` pattern, keyed by {@link patternKey}. */
export const PATTERN_TEMPLATES: Record<string, PatternTemplate> = Object.fromEntries(
  Object.entries(DS)
    .filter(([name, value]) => /^Slide[A-Z]/.test(name) && name !== "SlideShell" && typeof value === "function")
    .map(([name, Component]) => {
      const key = patternKey(name);
      return [key, { Component: Component as ComponentType<Record<string, unknown>>, fromMarkdown: MAPPERS[key] }];
    }),
);
