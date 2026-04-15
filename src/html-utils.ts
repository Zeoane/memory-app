/**
 * Escapes text for safe HTML embedding.
 * @param text Raw text
 * @returns Escaped string safe for innerHTML
 */
export function escapeHtml(text: string): string {
  const wrapper = document.createElement('div');
  wrapper.textContent = text;
  return wrapper.innerHTML;
}
