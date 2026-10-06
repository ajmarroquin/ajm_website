// The slide-over preview. Any link with [data-preview] opens its page in the
// side panel instead of navigating. Without JavaScript (or with a modifier
// key held) the link just works as a normal link.

const dialog = document.querySelector<HTMLDialogElement>('#preview')!;
const body = document.querySelector<HTMLElement>('#preview-body')!;
const fileLabel = document.querySelector<HTMLElement>('#preview-file')!;
const openLink = document.querySelector<HTMLAnchorElement>('#preview-open')!;
const closeBtn = document.querySelector<HTMLButtonElement>('#preview-close')!;

const cache = new Map<string, Document>();

async function load(href: string): Promise<Document> {
  if (!cache.has(href)) {
    const res = await fetch(href);
    if (!res.ok) throw new Error(`${res.status}`);
    cache.set(href, new DOMParser().parseFromString(await res.text(), 'text/html'));
  }
  return cache.get(href)!;
}

// `initial` marks a preview opened straight from a shared ?view= link: there's
// no history entry behind it to go back to, so closing must not call back().
export async function openPreview(href: string, { push = true, initial = false } = {}) {
  const url = new URL(href, location.href);
  if (url.origin !== location.origin) return void (location.href = href);
  const path = url.pathname;
  try {
    const doc = await load(path);
    const article = doc.querySelector('[data-doc]');
    if (!article) return void (location.href = path);
    body.replaceChildren(document.importNode(article, true));
    fileLabel.textContent = `~/${article.getAttribute('data-file') ?? path}`;
  } catch {
    body.innerHTML = '<p class="empty">Could not load this file.</p>';
    fileLabel.textContent = path;
  }
  openLink.href = path;
  body.scrollTop = 0;
  if (!dialog.open) dialog.showModal();
  closeBtn.focus();

  const next = new URL(location.href);
  next.searchParams.set('view', path);
  const keepInitial = initial || Boolean(history.state?.initial);
  if (push && !history.state?.preview) history.pushState({ preview: path }, '', next);
  else history.replaceState({ preview: path, initial: keepInitial }, '', next);
}

function closePreview() {
  if (!dialog.open) return;
  if (history.state?.preview && !history.state.initial) {
    history.back(); // popstate closes the dialog
  } else {
    dialog.close();
    const next = new URL(location.href);
    next.searchParams.delete('view');
    history.replaceState(null, '', next);
  }
}

document.addEventListener('click', (e) => {
  const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-preview]');
  if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  openPreview(link.href);
});

closeBtn.addEventListener('click', closePreview);
dialog.addEventListener('cancel', (e) => {
  e.preventDefault();
  closePreview();
});
// Clicking the dimmed backdrop closes the panel.
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) closePreview();
});

window.addEventListener('popstate', () => {
  const view = new URL(location.href).searchParams.get('view');
  if (view) openPreview(view, { push: false });
  else if (dialog.open) dialog.close();
});

// A shared link like /people/?view=/people/jane/ opens straight into the preview.
const initial = new URL(location.href).searchParams.get('view');
if (initial?.startsWith('/')) openPreview(initial, { push: false, initial: true });
