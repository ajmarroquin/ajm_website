import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { rows } from '../../lib/content';

export async function GET(context: APIContext) {
  const posts = (await rows('posts')).filter((r) => !r.hidden);
  return rss({
    title: 'AJ Marroquin: posts',
    description: 'Ramblings from marroqu.in',
    site: context.site!,
    items: posts.map((r) => ({
      title: r.title,
      link: r.href,
      pubDate: (r.entry.data as { date: Date }).date,
      description: r.entry.data.summary ?? undefined,
    })),
  });
}
