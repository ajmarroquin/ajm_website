# aj.marroqu.in

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
2. Settings → Core plugins → turn on **Templates**. Its template folder is already set to `templates/`.
3. To add something: right-click the folder it belongs in (e.g. `people/`) → **New note** → type its name → run **Templates: Insert template** from the command palette (Ctrl/Cmd+P) and pick the matching template. Tip: give that command a hotkey in Settings → Hotkeys.
4. Fill it in, then flip `draft: false` when it's ready. Commit and push.

| Template      | Goes in     | Note name                             |
| ------------- | ----------- | ------------------------------------- |
| Mentee        | `people/`   | a label until they agree to be named (see below) |
| Role          | `work/`     | the role, e.g. "Product Owner, AVMS"  |
| Side project  | `projects/` | project name                          |
| Hobby         | `hobbies/`  | hobby                                 |
| Post          | `posts/`    | post title                            |

Link notes with `[[wikilinks]]`, the same way you would in Obsidian. A link to a note that doesn't exist yet is fine: it shows as plain text until you write it. Paste images and they land in `attachments/`.

## Rules the build enforces

- **`draft: true` never publishes.** Every template starts as a draft.
- **Mentees need `consent: true` too.** Without it they're left off the site, the graph, and links.
- **The repo is public**, so drafts and unpublished mentees can still be read on GitHub. Don't put someone's real name in a note until they've said yes.
- **URLs come from the note name**, e.g. `people/Jane Doe.md` → `/people/jane-doe/`. To rename a published note without breaking its URL, first add `slug: jane-doe` (the current URL name) to its properties.

## Layout

```
content/              Obsidian vault (and the site's content)
  README.md           home page intro
  <folder>/README.md  intro shown under each folder's listing
  work/ people/ projects/ hobbies/ posts/
  templates/          Obsidian templates (not published)
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

GitHub Actions builds every push and PR, and deploys `main` to GitHub Pages. In Settings → Pages, Source must be **GitHub Actions** (not "Deploy from a branch", which runs Jekyll on the raw source and fails). The site lives at **aj.marroqu.in**. DNS stays at Fastmail, with one custom record: CNAME `aj.marroqu.in` → `ajmarroquin.github.io`. It overrides Fastmail's `*.marroqu.in` wildcard for `aj` only, so mail, the bare domain and the other Fastmail-hosted subdomains aren't affected. The custom domain is set in Settings → Pages (a `CNAME` file in the repo is ignored when deploying with Actions).
