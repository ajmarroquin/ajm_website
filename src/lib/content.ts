import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { fileMeta, isPublished, resolve, loadVault } from './vault.mjs';

export type SectionKey = 'work' | 'people' | 'projects' | 'hobbies' | 'posts';
export type Entry = CollectionEntry<SectionKey>;

// Order and one-line descriptions for the sidebar and the root listing.
export const SECTIONS: { key: SectionKey; blurb: string }[] = [
  { key: 'work', blurb: 'Roles, and what I got done in them' },
  { key: 'people', blurb: 'People I have mentored, and where they went' },
  { key: 'projects', blurb: 'Things I build on the side' },
  { key: 'hobbies', blurb: 'What I do when I am not working' },
  { key: 'posts', blurb: 'Ramblings' },
];

export const titleOf = (e: Entry) => e.data.title ?? e.id;

export interface Row {
  entry: Entry;
  file: string;
  href: string;
  title: string;
  modified: string;
  size: number;
  draft: boolean;
  /** Why a dev-only entry won't publish, if it won't. */
  hidden?: string;
}

function sortKey(e: Entry): string {
  const d = e.data as Record<string, unknown>;
  const v = d.date ?? d.end ?? d.start ?? d.started ?? d.since ?? '';
  return v instanceof Date ? v.toISOString() : String(v);
}

export async function rows(section: SectionKey): Promise<Row[]> {
  const entries = (await getCollection(section)) as Entry[];
  return entries
    .filter((e) => isPublished(section, e.data))
    .map((e) => {
      const file = e.filePath?.split('/').pop() ?? `${e.id}.md`;
      const meta = fileMeta(`${section}/${file}`);
      const data = e.data as Record<string, unknown>;
      const hidden = data.draft
        ? 'draft'
        : section === 'people' && data.consent !== true
          ? 'no consent yet'
          : undefined;
      return {
        entry: e,
        file,
        href: `/${section}/${e.id}/`,
        title: titleOf(e),
        modified: meta.modified,
        size: meta.size,
        draft: Boolean(data.draft),
        hidden,
      };
    })
    .sort((a, b) => {
      // "present" (no end date) sorts first for work; otherwise newest first.
      const ae = section === 'work' && !(a.entry.data as any).end ? '9999' : sortKey(a.entry);
      const be = section === 'work' && !(b.entry.data as any).end ? '9999' : sortKey(b.entry);
      return be.localeCompare(ae) || a.title.localeCompare(b.title);
    });
}

export const readme = (id: string) => getEntry('readmes', id);

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}K`;
}

export { resolve, loadVault };
