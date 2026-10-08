import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { entryId } from './lib/vault.mjs';

// Each folder in /content is a collection. README.md is the folder's intro
// and is loaded separately; templates/ and attachments/ are never loaded.
const folder = (name: string) =>
  glob({
    base: `./content/${name}`,
    pattern: ['*.md', '!README.md'],
    generateId: ({ entry, data }) => entryId(entry, data),
  });

// YAML turns 2024-03-01 into a Date and 2024-03 into a string; accept both.
const when = z
  .union([z.string(), z.date(), z.number()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)));

// Obsidian leaves untouched properties empty (null or ""). Treat that as unset.
const opt = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === null || v === '' ? undefined : v), schema.optional());

// Lists: Obsidian writes an empty list item as null, so drop those.
const list = <T extends z.ZodType>(item: T) =>
  z.array(item.nullable()).nullish().transform((v) => (v ?? []).filter((x): x is z.output<T> => x != null && x !== ''));

// "[[Some Note]]" in frontmatter. Kept as written; resolved when rendering.
const link = z.string();

const base = {
  title: opt(z.string()),
  summary: opt(z.string()),
  tags: list(z.string()),
  draft: z.boolean().default(false),
  slug: opt(z.string()),
};

export const collections = {
  readmes: defineCollection({
    loader: glob({
      base: './content',
      pattern: ['README.md', '*/README.md', '!templates/**'],
      generateId: ({ entry }) => (entry === 'README.md' ? 'root' : entry.split('/')[0]),
    }),
    schema: z.object({ title: opt(z.string()) }),
  }),

  work: defineCollection({
    loader: folder('work'),
    schema: z.object({
      ...base,
      org: opt(z.string()),
      start: when,
      end: opt(when),
    }),
  }),

  volunteering: defineCollection({
    loader: folder('volunteering'),
    schema: z.object({
      ...base,
      org: opt(z.string()),
      start: when,
      end: opt(when),
    }),
  }),

  people: defineCollection({
    loader: folder('people'),
    schema: z.object({
      ...base,
      consent: z.boolean().default(false),
      role_then: opt(z.string()),
      role_now: opt(z.string()),
      mentored_during: opt(z.union([link, list(link)])),
      how: opt(z.string()),
      outcomes: list(z.string()),
      links: list(link),
    }),
  }),

  projects: defineCollection({
    loader: folder('projects'),
    schema: z.object({
      ...base,
      status: z.enum(['idea', 'active', 'shipped', 'paused', 'archived']).default('active'),
      started: opt(when),
      url: opt(z.url()),
      repo: opt(z.url()),
    }),
  }),

  hobbies: defineCollection({
    loader: folder('hobbies'),
    schema: z.object({ ...base, since: opt(when) }),
  }),

  posts: defineCollection({
    loader: folder('posts'),
    schema: z.object({ ...base, date: z.coerce.date() }),
  }),
};
