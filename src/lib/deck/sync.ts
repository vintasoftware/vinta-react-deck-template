import { useEffect, useRef } from "react";

/** Which side of the presentation a window is: the projected deck or the speaker's console. */
export type DeckRole = "audience" | "presenter";

type SyncMessage =
  | { type: "goto"; from: DeckRole; idx: number }
  /** A window just opened and asks the other side where it is. */
  | { type: "hello"; from: DeckRole };

/**
 * Keeps the audience window and the presenter window on the same slide.
 *
 * Both are the same deck URL open in two windows of one browser, so they talk
 * over a `BroadcastChannel` scoped to the deck path. Each side only follows the
 * *other* role — two plain tabs of the same deck never drag each other around.
 * A window that just opened adopts the other side's position, and a slide
 * change that arrived from the channel is not echoed back, so quick navigation
 * can't ping-pong between the windows.
 */
export function useDeckSync({
  role,
  idx,
  onRemote,
  enabled = true,
}: {
  role: DeckRole;
  idx: number;
  /** Called with the slide index the other window moved to. */
  onRemote: (idx: number) => void;
  enabled?: boolean;
}) {
  const channel = useRef<BroadcastChannel | null>(null);
  /** The last index both sides are known to share; only departures from it are sent. */
  const synced = useRef(idx);
  const latest = useRef({ idx, onRemote });
  latest.current = { idx, onRemote };

  useEffect(() => {
    if (!enabled || typeof BroadcastChannel === "undefined") return;
    const ch = new BroadcastChannel(`vinta-deck:${window.location.pathname}`);
    const send = (msg: SyncMessage) => ch.postMessage(msg);
    channel.current = ch;
    ch.onmessage = (e: MessageEvent<SyncMessage>) => {
      const msg = e.data;
      if (msg.from === role) return;
      if (msg.type === "hello") {
        send({ type: "goto", from: role, idx: latest.current.idx });
      } else {
        synced.current = msg.idx;
        latest.current.onRemote(msg.idx);
      }
    };
    send({ type: "hello", from: role });
    return () => {
      ch.close();
      channel.current = null;
    };
  }, [enabled, role]);

  useEffect(() => {
    if (synced.current === idx) return;
    synced.current = idx;
    channel.current?.postMessage({ type: "goto", from: role, idx } satisfies SyncMessage);
  }, [idx, role]);
}
