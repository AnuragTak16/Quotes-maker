/** Wrap each word in a span for Faith-style clip reveals. */
export function splitWords(el: HTMLElement | null) {
  if (!el || el.dataset.split === 'true') return [];
  const text = el.textContent?.trim() ?? '';
  el.setAttribute('aria-label', text);
  el.innerHTML = text
    .split(/\s+/)
    .map(
      (word) =>
        `<span class="split-word-wrap" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.1em;margin-bottom:-0.1em"><span class="split-word" style="display:inline-block;will-change:transform">${word}&nbsp;</span></span>`
    )
    .join('');
  el.dataset.split = 'true';
  return Array.from(el.querySelectorAll<HTMLElement>('.split-word'));
}

/** Wrap each line (by <br> or block) — uses word split as fallback. */
export function splitLines(el: HTMLElement | null) {
  if (!el || el.dataset.splitLines === 'true') return [];
  const html = el.innerHTML.trim();
  const parts = html.split(/<br\s*\/?>/i);
  if (parts.length <= 1) {
    const text = el.textContent?.trim() ?? '';
    el.setAttribute('aria-label', text);
    el.innerHTML = `<span class="split-line-wrap" style="display:block;overflow:hidden"><span class="split-line" style="display:block;will-change:transform">${text}</span></span>`;
    el.dataset.splitLines = 'true';
    return Array.from(el.querySelectorAll<HTMLElement>('.split-line'));
  }
  el.innerHTML = parts
    .map(
      (part) =>
        `<span class="split-line-wrap" style="display:block;overflow:hidden"><span class="split-line" style="display:block;will-change:transform">${part.trim()}</span></span>`
    )
    .join('');
  el.dataset.splitLines = 'true';
  return Array.from(el.querySelectorAll<HTMLElement>('.split-line'));
}
