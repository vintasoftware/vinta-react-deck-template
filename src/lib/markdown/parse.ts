import { parse as parseYaml } from "yaml";

/** An image written as `![alt](src)` on its own line. */
export interface MdImage {
  src: string;
  alt: string;
}

/** A fenced code block (```lang … ```). */
export interface MdCode {
  /** Info string after the opening fence (e.g. `ts`), if any. */
  lang?: string;
  value: string;
}

/** A GFM pipe table: header cells + body rows. */
export interface MdTable {
  head: string[];
  rows: string[][];
}

/** Block content found under a heading (or at the top level of the slide). */
export interface MdContent {
  /** Paragraphs in order. Lines inside one paragraph are joined with `\n` (hard line breaks). */
  paragraphs: string[];
  /** List items in order (`-`, `*`, `+` or `1.`). Continuation lines are joined with `\n`. */
  list: string[];
  /** True when the list was an ordered (`1.`) list. */
  ordered: boolean;
  images: MdImage[];
  /** The first fenced code block. */
  code?: MdCode;
  /** The first pipe table. */
  table?: MdTable;
}

/** A `##` (or deeper) section and the content under it. */
export interface MdSection extends MdContent {
  heading: string;
}

/** The structured view of a markdown slide's body. */
export interface MdDoc extends MdContent {
  /** A paragraph written *before* the `#` heading — an eyebrow/kicker line. */
  kicker?: string;
  /** The first `#` heading. */
  title?: string;
  /** Every `##`+ heading after the title, with its content. */
  sections: MdSection[];
}

/** A markdown slide file split into its YAML frontmatter and parsed body. */
export interface MarkdownSlideSource {
  frontmatter: Record<string, unknown>;
  doc: MdDoc;
}

const emptyContent = (): MdContent => ({ paragraphs: [], list: [], ordered: false, images: [] });

/**
 * Flatten inline markdown to plain text — template text props render strings,
 * not markup. `**b**`, `*i*`, `` `c` `` and `[text](url)` keep only their text.
 */
export function plain(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[^\w*])([*_])(?!\s)(.+?)(?<!\s)\2(?![\w*])/g, "$1$3")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\\([\\`*_{}[\]()#+\-.!|])/g, "$1")
    .trim();
}

/** Split a `---`-fenced YAML frontmatter block off the top of `source`. */
function splitFrontmatter(source: string): { yaml: string | null; body: string } {
  const text = source.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const m = text.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  if (!m) return { yaml: null, body: text };
  return { yaml: m[1], body: text.slice(m[0].length) };
}

const FENCE = /^(\s*)(`{3,}|~{3,})\s*([^\s`]*)?.*$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const LIST_ITEM = /^\s{0,3}([-*+]|\d+[.)])\s+(.*)$/;
const IMAGE = /^!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)\s*$/;
const TABLE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

function tableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((c) => plain(c.replace(/\\\|/g, "|")));
}

/**
 * Parse a markdown slide body into an {@link MdDoc}. Supports the subset that
 * maps onto slide props: headings, paragraphs, flat lists, standalone images,
 * fenced code, pipe tables and `<!-- comments -->` (ignored).
 */
export function parseMarkdownBody(body: string): MdDoc {
  const doc: MdDoc = { ...emptyContent(), sections: [] };
  let cur: MdContent = doc;
  const lines = body.replace(/\r\n?/g, "\n").split("\n");

  // Pending multi-line blocks.
  let para: string[] | null = null;
  let item: string[] | null = null;

  const flush = () => {
    if (para) cur.paragraphs.push(para.map(plain).join("\n"));
    if (item) cur.list.push(item.map(plain).join("\n"));
    para = null;
    item = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // HTML comments (single or multi-line) are author notes — skip them.
    if (/^\s*<!--/.test(line)) {
      flush();
      while (i < lines.length && !lines[i].includes("-->")) i++;
      continue;
    }

    // Fenced code.
    const fence = line.match(FENCE);
    if (fence) {
      flush();
      const marker = fence[2];
      const closing = new RegExp(`^\\s*${marker[0] === "`" ? "`" : "~"}{${marker.length},}\\s*$`);
      const indent = new RegExp(`^ {0,${fence[1].length}}`);
      const code: string[] = [];
      for (i++; i < lines.length && !closing.test(lines[i]); i++) {
        code.push(lines[i].replace(indent, ""));
      }
      cur.code ??= { lang: fence[3] || undefined, value: code.join("\n") };
      continue;
    }

    if (line.trim() === "") {
      flush();
      continue;
    }

    // Headings: the first `#` is the title; `##`+ open a section.
    const h = line.match(HEADING);
    if (h) {
      flush();
      const text = plain(h[2]);
      if (h[1].length === 1 && doc.title === undefined && doc.sections.length === 0) {
        // A paragraph above the title is its kicker/eyebrow.
        if (doc.paragraphs.length > 0 && doc.kicker === undefined) {
          doc.kicker = doc.paragraphs.join("\n\n");
          doc.paragraphs = [];
        }
        doc.title = text;
        cur = doc;
      } else {
        const section: MdSection = { heading: text, ...emptyContent() };
        doc.sections.push(section);
        cur = section;
      }
      continue;
    }

    // Pipe table: a `|` row followed by a `---|---` separator.
    if (line.includes("|") && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1]) && lines[i + 1].includes("-")) {
      flush();
      const head = tableCells(line);
      const rows: string[][] = [];
      for (i += 2; i < lines.length && lines[i].includes("|") && lines[i].trim() !== ""; i++) {
        rows.push(tableCells(lines[i]));
      }
      i--;
      cur.table ??= { head, rows };
      continue;
    }

    // Standalone image.
    const img = line.trim().match(IMAGE);
    if (img) {
      flush();
      cur.images.push({ alt: img[1], src: img[2] });
      continue;
    }

    // List item (or continuation of the current one).
    const li = line.match(LIST_ITEM);
    if (li) {
      flush();
      if (cur.list.length === 0) cur.ordered = /\d/.test(li[1]);
      item = [li[2]];
      continue;
    }
    if (item && /^\s+\S/.test(line)) {
      item.push(line.trim());
      continue;
    }

    // Paragraph text; a trailing two-space/backslash break is implied by the newline.
    if (item) flush();
    (para ??= []).push(line.trim().replace(/\\$/, ""));
  }
  flush();
  return doc;
}

/**
 * Parse a markdown slide file: optional `---` YAML frontmatter, then a body.
 * Throws with a readable message when the frontmatter is not a YAML mapping.
 */
export function parseMarkdownSlide(source: string): MarkdownSlideSource {
  const { yaml, body } = splitFrontmatter(source);
  let frontmatter: Record<string, unknown> = {};
  if (yaml != null && yaml.trim() !== "") {
    const data: unknown = parseYaml(yaml);
    if (data == null) frontmatter = {};
    else if (typeof data === "object" && !Array.isArray(data)) frontmatter = data as Record<string, unknown>;
    else throw new Error("Frontmatter must be a YAML mapping (key: value pairs).");
  }
  return { frontmatter, doc: parseMarkdownBody(body) };
}

/** Join a content block's paragraphs into one string (blank line between paragraphs). */
export function mdText(c: Pick<MdContent, "paragraphs">): string | undefined {
  return c.paragraphs.length ? c.paragraphs.join("\n\n") : undefined;
}
