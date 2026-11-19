import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type RefObject,
} from "react";
import { Stage } from "./Stage";
import { SLIDE_W, SLIDE_H, type DeckSlide } from "./types";

const RATIO = SLIDE_H / SLIDE_W;
/** Gap between the miniatures, and the height of the label row above prev/next. */
const GAP = 16;
const LABEL_H = 28;
/** Below this width the notes move under the slides instead of beside them. */
const STACK_BELOW = 640;

export interface PresenterViewProps {
  slides: DeckSlide[];
  idx: number;
  /** Digits typed so far for a number + Enter jump (shown in place of the slide number). */
  jump: string;
  onGo: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onOverview: () => void;
}

/**
 * The speaker's console, shown in the window opened with `p` (or at
 * `?presenter`): clock and elapsed timer, slide number, the current slide with
 * the previous and next ones beside it, the slide's `meta.notes`, and
 * navigation. It drives — and follows — the audience window via `useDeckSync`.
 */
export function PresenterView({ slides, idx, jump, onGo, onPrev, onNext, onOverview }: PresenterViewProps) {
  const count = slides.length;
  const cur = slides[idx];
  const areaRef = useRef<HTMLElement>(null);
  const area = useContentSize(areaRef);
  const stacked = area.w < STACK_BELOW;
  const colW = slideColumnWidth(area.w, area.h, stacked);
  const thumbW = (colW - GAP) / 2;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#1a1a1c] font-mono text-white">
      <header className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-white/10 px-5 py-3">
        <Clocks />
        <div className="ml-auto flex min-w-0 items-baseline gap-3">
          {cur.title && <span className="hidden truncate text-sm text-white/55 sm:inline">{cur.title}</span>}
          <span className="text-2xl tabular-nums" aria-label={`Slide ${idx + 1} of ${count}`}>
            {jump || idx + 1}
            <span className="text-white/45"> / {count}</span>
          </span>
        </div>
      </header>

      <main
        ref={areaRef}
        className={`flex min-h-0 flex-1 gap-5 p-5 ${stacked ? "flex-col overflow-y-auto" : ""}`}
      >
        {area.w > 0 && (
          <>
            <section className="flex shrink-0 flex-col" style={{ width: colW, gap: GAP }}>
              <Stage
                Component={cur.Component}
                scale={colW / SLIDE_W}
                className="rounded ring-2 ring-vinta-blue"
              />
              <div className="flex" style={{ gap: GAP }}>
                <Miniature
                  label="Previous"
                  empty="Start of deck"
                  slide={slides[idx - 1]}
                  number={idx}
                  width={thumbW}
                  onClick={onPrev}
                />
                <Miniature
                  label="Next"
                  empty="End of deck"
                  slide={slides[idx + 1]}
                  number={idx + 2}
                  width={thumbW}
                  onClick={onNext}
                />
              </div>
            </section>

            <section
              className={`flex min-w-0 flex-1 flex-col rounded bg-white/5 ${stacked ? "min-h-40 shrink-0" : "min-h-0"}`}
              aria-label="Speaker notes"
            >
              <h2 className="px-5 pt-4 text-[11px] uppercase tracking-widest text-white/45">Notes</h2>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-3 font-sans">
                {cur.notes ? (
                  <p className="whitespace-pre-wrap text-[19px] leading-relaxed text-white/90">{cur.notes}</p>
                ) : (
                  <p className="text-sm text-white/40">
                    No notes for this slide. Add them in the slide file:{" "}
                    <code className="font-mono text-white/60">export const meta = {"{ notes: \"…\" }"}</code>{" "}
                    in a <code className="font-mono text-white/60">.tsx</code> slide, or a closing{" "}
                    <code className="font-mono text-white/60">{"<!-- … -->"}</code> comment in a{" "}
                    <code className="font-mono text-white/60">.md</code> slide.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-3 text-sm">
        <NavButton onClick={onPrev} disabled={idx === 0}>‹ Previous</NavButton>
        <NavButton onClick={onNext} disabled={idx === count - 1} primary>Next ›</NavButton>
        <label className="ml-auto flex min-w-0 items-center gap-2 text-white/55">
          Go to
          <select
            className="max-w-[260px] truncate rounded bg-white/10 px-2 py-1.5 text-white outline-none focus-visible:ring-2 focus-visible:ring-vinta-blue-soft"
            value={idx}
            onChange={(e) => {
              onGo(Number(e.target.value));
              e.target.blur(); // hand the arrow keys back to slide navigation
            }}
          >
            {slides.map((sl, i) => (
              <option key={sl.id} value={i} className="text-black">
                {pad(i + 1)} · {sl.title ?? sl.id}
              </option>
            ))}
          </select>
        </label>
        <NavButton onClick={onOverview} title="All slides (O)">⊞ All slides</NavButton>
      </footer>
    </div>
  );
}

/** Wall-clock time plus a pausable, resettable elapsed-time counter. */
function Clocks() {
  const [now, setNow] = useState(Date.now);
  // `base` is time banked before the last pause; `since` is when it last resumed.
  const [timer, setTimer] = useState<{ base: number; since: number | null }>(() => ({
    base: 0,
    since: Date.now(),
  }));

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const running = timer.since != null;
  const elapsed = timer.base + (timer.since == null ? 0 : Math.max(0, now - timer.since));

  const toggle = () => {
    const at = Date.now();
    setNow(at);
    setTimer((t) =>
      t.since == null ? { base: t.base, since: at } : { base: t.base + at - t.since, since: null },
    );
  };
  const reset = () => {
    const at = Date.now();
    setNow(at);
    setTimer((t) => ({ base: 0, since: t.since == null ? null : at }));
  };

  return (
    <>
      <time className="text-2xl tabular-nums" aria-label="Current time">
        {new Date(now).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </time>
      <div className="flex items-center gap-2">
        <span
          className={`text-2xl tabular-nums ${running ? "text-vinta-blue-soft" : "text-white/45"}`}
          aria-label="Elapsed time"
        >
          {formatElapsed(elapsed)}
        </span>
        <NavButton onClick={toggle} title={running ? "Pause timer" : "Resume timer"}>
          {running ? "Pause" : "Resume"}
        </NavButton>
        <NavButton onClick={reset} title="Reset timer">Reset</NavButton>
      </div>
    </>
  );
}

function Miniature({
  label,
  empty,
  slide,
  number,
  width,
  onClick,
}: {
  label: string;
  /** Shown instead of a slide at either end of the deck. */
  empty: string;
  slide: DeckSlide | undefined;
  number: number;
  width: number;
  onClick: () => void;
}) {
  return (
    <div style={{ width }}>
      <div
        className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/45"
        style={{ height: LABEL_H }}
      >
        <span>{label}</span>
        {slide && (
          <span className="truncate normal-case tracking-normal text-white/70">
            {pad(number)} · {slide.title ?? slide.id}
          </span>
        )}
      </div>
      {slide ? (
        <button
          className="block rounded outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-vinta-blue-soft"
          onClick={(e) => {
            onClick();
            e.currentTarget.blur();
          }}
          aria-label={`${label} slide: ${slide.title ?? slide.id}`}
        >
          <Stage Component={slide.Component} scale={width / SLIDE_W} className="rounded" />
        </button>
      ) : (
        <div
          className="flex items-center justify-center rounded border border-dashed border-white/15 text-xs text-white/35"
          style={{ height: width * RATIO }}
        >
          {empty}
        </div>
      )}
    </div>
  );
}

/**
 * A console button. It drops focus after a click so the next Space/Enter keeps
 * meaning "next slide" instead of re-pressing whatever was clicked last.
 */
function NavButton({
  primary = false,
  className = "",
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        e.currentTarget.blur();
      }}
      className={`rounded px-3 py-1.5 outline-none transition focus-visible:ring-2 focus-visible:ring-vinta-blue-soft disabled:opacity-30 ${
        primary ? "bg-vinta-blue enabled:hover:bg-vinta-blue-soft" : "bg-white/10 enabled:hover:bg-white/20"
      } ${className}`}
    />
  );
}

/** Tracks an element's content-box size (0×0 until first measured). */
function useContentSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/**
 * Width of the slide column. Side by side with the notes it takes up to 60% of
 * the area, shrinking so the current slide plus the prev/next row still fit the
 * height: `h = L·R + GAP + LABEL_H + ((L − GAP) / 2)·R`, solved for `L`.
 */
function slideColumnWidth(w: number, h: number, stacked: boolean): number {
  if (stacked) return w;
  const byHeight = (h - GAP - LABEL_H + (GAP / 2) * RATIO) / (1.5 * RATIO);
  return Math.max(240, Math.min(w * 0.6, byHeight));
}

function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const mmss = `${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
  return h > 0 ? `${h}:${mmss}` : mmss;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
