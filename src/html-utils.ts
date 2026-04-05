/**
 * Escaped HTML-Sonderzeichen für sichere Texteinbettung.
 * @param text Rohtext
 * @returns für innerHTML sicherer String
 */
export function escapeHtml(text: string): string {
  const wrapper = document.createElement('div');
  wrapper.textContent = text;
  return wrapper.innerHTML;
}
