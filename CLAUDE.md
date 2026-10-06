# marroqu.in

AJ's personal site: Astro 7 static site over an Obsidian vault in `content/`. See README.md for the writing workflow.

## Commands

- `npm run dev` (drafts visible) / `npm run build` (drafts hidden) / `npm run build:drafts`
- `npx astro check` must pass; CI runs it.
- Builds use `--force` on purpose: Astro caches rendered Markdown, and wikilinks depend on *other* notes, so a cached render can go stale.

## Conventions

- Content is plain `.md` only (no MDX); it has to render in Obsidian too.
- Links between notes are `[[wikilinks]]`, resolved by file name (`src/lib/vault.mjs`). Frontmatter links are quoted: `mentored_during: "[[Note]]"`.
- Publishing rules live in `isPublished()` in `src/lib/vault.mjs`: `draft: true` never publishes; `people/` also needs `consent: true`. Everything that lists, links or graphs notes must go through it.
- New folder = add it to `SECTIONS` in `src/lib/vault.mjs` and `src/lib/content.ts`, a collection in `src/content.config.ts`, and a template in `content/templates/`.
- Templates use Obsidian's core Templates plugin (only `{{title}}`, `{{date}}`, `{{time}}`), not Templater: no plugin to install.
- Markdown runs on the remark (`unified`) processor, not Astro 7's default Sätteri, because the wikilink plugin is a remark plugin.
- Colors are tokens on `:root` in `src/styles/global.css`, with dark mode overrides. Keep the site working with JS off: previews and the graph are enhancements.
- Never write facts about AJ or the people AJ mentored that AJ didn't provide. Placeholders get a `TODO(AJ)` comment.
