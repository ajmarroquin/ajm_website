import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkWikilinks from './src/lib/remark-wikilinks.mjs';

export default defineConfig({
  site: 'https://marroqu.in',
  // Obsidian saves pasted images into content/attachments; serve them as-is.
  publicDir: './content/attachments',
  trailingSlash: 'always',
  markdown: {
    // The remark pipeline, not Astro 7's default (Sätteri), because the
    // wikilink plugin is a remark plugin and Sätteri's plugin API is young.
    processor: unified({ remarkPlugins: [remarkWikilinks] }),
  },
});
