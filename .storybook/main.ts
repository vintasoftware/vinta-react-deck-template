import type { StorybookConfig } from '@storybook/react-vite'
import type { PluginOption } from 'vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    // GitHub-flavored markdown, so the tables in the foundations pages (src/foundations/*.mdx) render as tables.
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  // Storybook reuses vite.config.ts (the `@` alias, React). Its `story-export-order` plugin is for the deck's
  // /patterns and /samples routes only: Storybook adds `__namedExportsOrder` itself, so a second copy would clash.
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    plugins: (viteConfig.plugins ?? []).flat(Infinity as 1).filter(
      (p: PluginOption) => !(p && typeof p === 'object' && 'name' in p && p.name === 'story-export-order'),
    ),
  }),
}
export default config
