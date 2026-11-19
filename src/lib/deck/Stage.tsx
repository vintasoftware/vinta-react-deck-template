import type { ComponentType } from "react";
import { SLIDE_W, SLIDE_H } from "./types";

/** Renders one slide component scaled to `scale`, sized to the scaled box. */
export function Stage({
  Component,
  scale,
  className = "",
}: {
  Component: ComponentType;
  scale: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-white ${className}`}
      style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }}
    >
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Component />
      </div>
    </div>
  );
}
