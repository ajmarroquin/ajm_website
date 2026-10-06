export interface VaultNote {
  section: string;
  id: string;
  /** Slugified file name: what [[wikilinks]] match against. */
  key: string;
  title: string;
  href: string;
  draft: boolean;
  published: boolean;
  /** Keys of notes this one links to. */
  links: string[];
}
export const VAULT_DIR: string;
export const SECTIONS: string[];
export const WIKILINK_RE: RegExp;
export function showDrafts(): boolean;
export function slugify(text: string): string;
export function entryId(file: string, data?: Record<string, unknown>): string;
export function stripLink(value: string): string;
export function isPublished(section: string, data: Record<string, unknown>): boolean;
export function loadVault(): { notes: VaultNote[]; byKey: Map<string, VaultNote> };
export function resolve(target: string | undefined | null): VaultNote | null;
export function fileMeta(relPath: string): { modified: string; size: number };
