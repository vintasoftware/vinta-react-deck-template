import type { CSSProperties, ReactNode } from "react";

export interface StatProps {
  /** The headline figure, e.g. `200+`, `10M`, `$4.2B`. */
  value: ReactNode;
  /** Small caption beneath (e.g. "Worldwide offices"). */
  caption?: ReactNode;
  valueColor?: string;
  captionColor?: string;
  /** Figure size in slide px. Default 96. */
  size?: number;
  align?: "left" | "center";
  mono?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A big statistic with an optional caption. */
export function Stat({
  value,
  caption,
  valueColor,
  captionColor,
  size = 96,
  align = "left",
  mono,
  className = "",
  style,
}: StatProps) {
  return (
    <div className={className} style={{ textAlign: align, ...style }}>
      <div
        className={`${mono ? "font-mono" : "font-sans"} font-bold`}
        style={{ fontSize: size, lineHeight: 1, color: valueColor }}
      >
        {value}
      </div>
      {caption != null && (
        <div className="mt-2 text-[24px] leading-tight" style={{ color: captionColor ?? "var(--color-vinta-muted)" }}>
          {caption}
        </div>
      )}
    </div>
  );
}

export interface DonutProps {
  /** Fraction filled, 0–1. */
  percent?: number;
  /** Label rendered in the middle (e.g. "10M"). */
  value?: ReactNode;
  /** Outer diameter in slide px. */
  size?: number;
  /** Ring thickness in slide px. */
  thickness?: number;
  color?: string;
  track?: string;
  valueColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** An SVG donut/progress ring with a centered value. */
export function Donut({
  percent = 0.7,
  value,
  size = 300,
  thickness = 46,
  color = "var(--color-vinta-blue)",
  track = "rgba(0,82,255,.15)",
  valueColor = "#fff",
  className = "",
  style,
}: DonutProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, ...style }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${c * percent} ${c}`}
        />
      </svg>
      {value != null && (
        <div
          className="absolute inset-0 flex items-center justify-center font-bold"
          style={{ fontSize: size * 0.18, color: valueColor }}
        >
          {value}
        </div>
      )}
    </div>
  );
}

export interface DataTableProps {
  head: ReactNode[];
  rows: ReactNode[][];
  /** CSS grid template for the columns, e.g. "1.2fr 1fr 1fr". */
  cols?: string;
  className?: string;
  style?: CSSProperties;
}

/** A bordered table with a blue header row (`.runtime-table`). */
export function DataTable({ head, rows, cols, className = "", style }: DataTableProps) {
  const template = cols ?? `repeat(${head.length}, minmax(0, 1fr))`;
  return (
    <div className={`overflow-hidden rounded border border-vinta-gray ${className}`} style={style}>
      <div
        className="grid bg-vinta-blue px-[18px] py-3.5 font-bold text-white"
        style={{ gridTemplateColumns: template, gap: 12 }}
      >
        {head.map((h, i) => (
          <div key={i} className="text-[15px]">{h}</div>
        ))}
      </div>
      {rows.map((row, r) => (
        <div
          key={r}
          className="grid border-b border-vinta-gray px-[18px] py-3.5 last:border-b-0"
          style={{ gridTemplateColumns: template, gap: 12 }}
        >
          {row.map((cell, i) => (
            <div key={i} className="text-[15px] text-vinta-ink">{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
