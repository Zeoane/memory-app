/**
 * Replaces all placeholders `{{KEY}}` in a template string.
 * @param template Template source HTML
 * @param replacements Map of placeholder keys to values
 */
export function fillTemplate(template: string, replacements: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

