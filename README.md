# marroqu.in

My personal site. It's a folder of Markdown files (`content/`) that doubles as an Obsidian vault, built into a static site with [Astro](https://astro.build) that looks and works like a file browser.

## Run it

```sh
npm install
npm run dev            # http://localhost:4321, drafts visible with a badge
npm run build          # what gets published: drafts hidden
npm run build:drafts   # production build with drafts showing, for checking
```

## Writing in Obsidian

1. Open the `content/` folder as a vault (Open folder as vault → `content`). Not the repo root.
2. Settings → Community plugins → turn them on → Browse → install and enable **Templater**. Its settings are already in the repo.
3. To add something: **Alt+N** ("Templater: Create new note from template"), pick a template, answer the prompts. The note gets named, moved to the right folder and filled with the right properties.
   - Or right-click a folder (e.g. `people/`) → New note. Its template applies by itself.
4. Fill it in, then flip `draft: false` when it's ready. Commit and push.

| Template      | Goes in     | Asks for                              |
| ------------- | ----------- | ------------------------------------- |
| Mentee        | `people/`   | a name (see consent below), the role you mentored them in |
| Role          | `work/`     | role name, company                    |
| Side project  | `projects/` | project name                          |
| Hobby         | `hobbies/`  | hobby                                 |
| Post          | `posts/`    | title                                 |

Link notes with `[[wikilinks]]`, the same way you would in Obsidian. A link to a note that doesn't exist yet is fine: it shows as plain text until you write it. Paste images and they land in `attachments/`.

## Rules the build enforces

- **`draft: true` never publishes.** Every template starts as a draft.
- **Mentees need `consent: true` too.** Without it they're left off the site, the graph, and links.
- **The repo is public**, so drafts and unpublished mentees can still be read on GitHub. Don't put someone's real name in a note until they've said yes.
- **URLs come from `slug`**, which the templates set once. Renaming a note in Obsidian won't break its URL.

## Layout

```
content/              Obsidian vault (and the site's content)
  README.md           home page intro
  <folder>/README.md  intro shown under each folder's listing
  work/ people/ projects/ hobbies/ posts/
  templates/          Templater templates (not published)
  attachments/        images and other files, served from the site root
src/
  content.config.ts   frontmatter schemas for each folder
  lib/vault.mjs       wikilink resolution, drafts/consent rules, git dates
  lib/remark-wikilinks.mjs
  layouts/Shell.astro the file-browser frame
  components/         listing, properties, graph
  scripts/preview.ts  the slide-over "view" panel
```

## Hosting

GitHub Actions builds every push and PR. Deploys to GitHub Pages from `main` once the repo is public. DNS stays at Fastmail: turn off the default A record for `marroqu.in`, and add GitHub Pages' A records (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) plus `www` CNAME → `ajmarroquin.github.io`. The subdomains Fastmail hosts aren't affected.
