// Turns Obsidian-style [[wikilinks]] in note bodies into real links.
// - [[Note]] / [[Note|label]] link to the note's page.
// - ![[photo.png]] embeds a file from content/attachments.
// - A link to a note that doesn't exist yet (normal in Obsidian) or isn't
//   published renders as plain text with a "missing" style, and is logged.
import { WIKILINK_RE, resolve } from './vault.mjs';

const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

function splitText(value, file) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(WIKILINK_RE)) {
    const [whole, bang, target, , alias] = m;
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    last = m.index + whole.length;
    const name = target.trim();

    if (bang) {
      const url = '/' + encodeURI(name);
      out.push(
        IMAGE_RE.test(name)
          ? { type: 'image', url, alt: alias ?? '' }
          : { type: 'link', url, children: [{ type: 'text', value: alias ?? name }] },
      );
      continue;
    }

    const note = resolve(name);
    const label = alias ?? name;
    if (note) {
      out.push({
        type: 'link',
        url: note.href,
        data: { hProperties: { className: ['wikilink'], 'data-preview': '' } },
        children: [{ type: 'text', value: label }],
      });
    } else {
      console.warn(`[wikilinks] ${file}: [[${name}]] has no published note; rendering as text`);
      out.push({
        type: 'emphasis',
        data: { hName: 'span', hProperties: { className: ['wikilink-missing'], title: 'Not written yet' } },
        children: [{ type: 'text', value: label }],
      });
    }
  }
  if (last === 0) return null;
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

function walk(node, file) {
  if (!node.children) return;
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text') {
      const parts = splitText(child.value, file);
      if (parts) {
        next.push(...parts);
        continue;
      }
    }
    walk(child, file);
    next.push(child);
  }
  node.children = next;
}

export default function remarkWikilinks() {
  return (tree, vfile) => walk(tree, vfile.path ?? 'note');
}
