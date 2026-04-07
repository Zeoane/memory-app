import primaryButtonUrl from './assets/img_homescreen/Primary button.svg?url';
import stadiaSvg from './assets/img_homescreen/stadia_controller.svg?raw';
import homeTpl from './templates/home.html?raw';
import { fillTemplate } from './template-utils';

/**
 * Erzeugt das Markup der Startseite (Figma Home).
 */
export function buildHomeHtml(): string {
  return fillTemplate(homeTpl, {
    PRIMARY_BUTTON_SRC: primaryButtonUrl,
    STADIA_CONTROLLER_SVG: stadiaSvg.trim(),
  });
}
