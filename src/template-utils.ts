/**
 * Ersetzt alle Platzhalter `{{KEY}}` in einem Template-String.
 * @param template Roh-HTML mit Platzhaltern
 * @param replacements Map von Platzhalter-Name zu Ersatztext
 */
export function fillTemplate(template: string, replacements: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}
