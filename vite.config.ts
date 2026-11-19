import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Adds `__namedExportsOrder` to every `*.stories.tsx` (as Storybook's compiler does), so the
 * `/patterns` and `/samples` decks list stories in source order rather than alphabetically.
 */
function storyExportOrder(): Plugin {
  return {
    name: "story-export-order",
    enforce: "pre",
    transform(code, id) {
      if (!/\.stories\.tsx$/.test(id.split("?")[0])) return;
      const names = [...code.matchAll(/^export const (\w+)/gm)].map((m) => m[1]);
      return { code: `${code}\nexport const __namedExportsOrder = ${JSON.stringify(names)};\n`, map: null };
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [storyExportOrder(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
