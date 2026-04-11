import primaryButtonUrl from './assets/img_homescreen/Primary button.svg?url';
import stadiaSvg from './assets/img_homescreen/stadia_controller.svg?raw';
import homeTpl from './templates/home.html?raw';
import { fillTemplate } from './template-utils';

/**
 * Generates the markup for the homepage
 */
export function buildHomeHtml(): string {
  return fillTemplate(homeTpl, {
    PRIMARY_BUTTON_SRC: primaryButtonUrl,
    STADIA_CONTROLLER_SVG: stadiaSvg.trim(),
  });
}
