/**
 * Escapes text for safe HTML embedding.
 */
export function escapeHtml(text: string): string {
  const wrapper = document.createElement('div');
  wrapper.textContent = text;
  return wrapper.innerHTML;
}

