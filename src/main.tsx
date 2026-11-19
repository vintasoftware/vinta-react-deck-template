import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Brand fonts, bundled offline (no CDN dependency).
import "@fontsource/dm-sans/100.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/400-italic.css";
// DM Mono: the mono face of the patterns (eyebrows, labels, code) and the deck chrome.
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";

import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
