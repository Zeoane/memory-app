/**
 * Escaped HTML special characters for safe text embedding.
 * @param text Raw text 
 * @returns for innerHTML safe string
 */
export function escapeHtml(text: string): string {
  const wrapper = document.createElement('div');
  wrapper.textContent = text;
  return wrapper.innerHTML;
}
