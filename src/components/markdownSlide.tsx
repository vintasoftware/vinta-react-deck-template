import { Component as ReactComponent, type ReactNode } from "react";
import { parseMarkdownSlide, type DeckSlide } from "@/lib";
import { PATTERN_TEMPLATES, patternKey } from "./markdown";
import { SlideShell } from "./patterns/SlideShell";
import { SlideHeader } from "./elements/SlideHeader";
import { VividBackground } from "./elements/VividBackground";

// Loads a `.md` slide file into a deck slide: frontmatter `template:` names a pattern, the body fills its
// props (mappers in ./markdown.tsx) and frontmatter `props:` override anything the body produced. See MARKDOWN.md.

/** Frontmatter keys a markdown slide understands; anything else is reported as an error. */
const FRONTMATTER_KEYS = ["template", "title", "notes", "props"];

const optString = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v : undefined);

function withoutUndefined(props: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined));
}

/**
 * Build a {@link DeckSlide} from a markdown slide file. Problems (bad YAML, unknown pattern, stray
 * frontmatter keys, a pattern missing a required part) don't break the deck: they render as an error
 * slide naming the file, so the author sees exactly what to fix.
 */
export function markdownSlide(id: string, source: string): DeckSlide {
  try {
    const { frontmatter, doc } = parseMarkdownSlide(source);

    const unknown = Object.keys(frontmatter).filter((k) => !FRONTMATTER_KEYS.includes(k));
    if (unknown.length) {
      throw new Error(
        `Unknown frontmatter key${unknown.length > 1 ? "s" : ""}: ${unknown.join(", ")}. ` +
          `Allowed: ${FRONTMATTER_KEYS.join(", ")} — pattern props go under "props:".`,
      );
    }

    const name = frontmatter.template;
    if (name === undefined) throw new Error('Missing "template:" in frontmatter (e.g. template: SlideAgenda).');
    const template = typeof name === "string" ? PATTERN_TEMPLATES[patternKey(name)] : undefined;
    if (!template) {
      throw new Error(
        `Unknown template "${String(name)}" — use a pattern name such as SlideAgenda or agenda ` +
          `(browse /patterns; the list is in src/components/CATALOG.md).`,
      );
    }

    const overrides = frontmatter.props ?? {};
    if (typeof overrides !== "object" || Array.isArray(overrides)) {
      throw new Error('"props:" must be a mapping of pattern props (e.g. props: { tone: invert-navy }).');
    }

    const props = { ...withoutUndefined(template.fromMarkdown(doc)), ...(overrides as Record<string, unknown>) };
    const Layout = template.Component;
    // Patterns have required props a body may not supply; a render error shows the error slide, not a blank deck.
    const Component = () => (
      <SlideErrorBoundary file={`${id}.md`}>
        <Layout {...props} />
      </SlideErrorBoundary>
    );
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

/** Renders the error slide when a markdown slide's pattern throws while rendering. */
class SlideErrorBoundary extends ReactComponent<{ file: string; children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error(`[markdown slide] ${this.props.file}: ${error.message}`);
  }
  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <MarkdownErrorSlide
        file={this.props.file}
        message={`The pattern failed to render — usually a required part is missing (a list, sections or a table).\n${error.message}`}
      />
    );
  }
}

/** Shown in place of a markdown slide that failed to load. */
function MarkdownErrorSlide({ file, message }: { file: string; message: string }) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div style={{ padding: "112px var(--shell-safe-area) 120px", display: "flex", flexDirection: "column", gap: "var(--gap-header)" }}>
        <SlideHeader eyebrow={`src/slides/${file}`} title="This markdown slide" accent="couldn’t be rendered" width={1500} />
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--font-size-mono-md)",
            lineHeight: "var(--line-height-subtitle)",
            color: "var(--slate-700)",
          }}
        >
          {message}
        </pre>
      </div>
    </SlideShell>
  );
}
