// Reads the Obsidian vault in /content directly from disk so that wikilinks
// can be resolved anywhere: in the Markdown pipeline (remark plugin), and in
// pages that need the link graph. Astro's content collections handle schema
// validation and rendering; this module only knows names, ids and links.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parse as parseYaml } from 'yaml';

export const VAULT_DIR = path.resolve(process.cwd(), 'content');
export const SECTIONS = ['work', 'volunteering', 'people', 'projects', 'hobbies', 'posts'];

export const showDrafts = () =>
  process.env.SHOW_DRAFTS === '1' || process.env.NODE_ENV !== 'production';

export function slugify(text) {
  return String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// The single rule for turning a note into a URL id. content.config.ts uses
// this too, so links and pages always agree.
export const entryId = (file, data) => (data?.slug ? String(data.slug) : slugify(path.basename(file, '.md')));

// Matches [[Target]], [[Target|Alias]], [[Target#Heading]] and ![[embed.png]].
export const WIKILINK_RE = /(!?)\[\[([^\]|#]+)(#[^\]|]*)?(?:\|([^\]]+))?\]\]/g;

export const stripLink = (value) => String(value).replace(/^!?\[\[/, '').replace(/\]\]$/, '').split(/[|#]/)[0].trim();

function readNote(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  let data = {};
  if (match) {
    try {
      data = parseYaml(match[1]) ?? {};
    } catch {
      data = {};
    }
  }
  return { data, body: match ? raw.slice(match[0].length) : raw };
}

// Every outgoing link in a note: frontmatter values written as "[[Note]]"
// (Obsidian shows these in its graph too) plus links in the body.
function linksIn(data, body) {
  const found = new Set();
  const walk = (value) => {
    if (typeof value === 'string') {
      for (const m of value.matchAll(WIKILINK_RE)) if (!m[1]) found.add(slugify(m[2]));
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(walk);
    }
  };
  walk(data);
  walk(body);
  return [...found];
}

// Drafts show up in `npm run dev` (with a badge) but never in the real build.
// Mentees also need `consent: true`, so nobody ends up on the site by accident.
export function isPublished(section, data) {
  if (showDrafts()) return true;
  if (data.draft === true) return false;
  if (section === 'people' && data.consent !== true) return false;
  return true;
}

// Re-read at most every couple of seconds so `astro dev` picks up notes you
// add in Obsidian without a restart.
let cache;
let cachedAt = 0;
export function loadVault() {
  if (cache && Date.now() - cachedAt < 2000) return cache;
  const byKey = new Map(); // slugified note name -> note
  const notes = [];
  for (const section of SECTIONS) {
    const dir = path.join(VAULT_DIR, section);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.md') || name === 'README.md') continue;
      const file = path.join(dir, name);
      const { data, body } = readNote(file);
      const id = entryId(name, data);
      const note = {
        section,
        id,
        key: slugify(path.basename(name, '.md')),
        title: data.title ?? data.name ?? path.basename(name, '.md'),
        href: `/${section}/${id}/`,
        draft: data.draft === true,
        published: isPublished(section, data),
        links: linksIn(data, body),
      };
      notes.push(note);
      byKey.set(note.key, note);
    }
  }
  cache = { notes, byKey };
  cachedAt = Date.now();
  return cache;
}

// Resolve "[[Some Note]]", "Some Note" or "some-note" to a published note.
export function resolve(target) {
  if (!target) return null;
  const note = loadVault().byKey.get(slugify(stripLink(target)));
  return note && note.published ? note : null;
}

// Last-modified date from git, falling back to the file's mtime for notes
// that haven't been committed yet.
export function fileMeta(relPath) {
  const abs = path.join(VAULT_DIR, relPath);
  let modified;
  try {
    modified = execFileSync('git', ['log', '-1', '--format=%cs', '--', abs], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {}
  let size = 0;
  try {
    const stat = fs.statSync(abs);
    size = stat.size;
    modified ||= stat.mtime.toISOString().slice(0, 10);
  } catch {}
  return { modified: modified || '', size };
}
