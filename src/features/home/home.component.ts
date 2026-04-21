import primaryButtonUrl from '../../assets/img_homescreen/Primary button.svg?url';
import playClickBtnUrl from '../../assets/img_homescreen/play-click-btn.svg?url';
import stadiaSvg from '../../assets/img_homescreen/stadia_controller.svg?raw';
import { fillTemplate } from '../../shared/template-utils';
import { getTemplate } from '../../shared/template-registry';

/** Generates the home screen HTML by populating the template with 
 required asset URLs and SVG icons.*/
export function buildHomeHtml(): string {
  return fillTemplate(getTemplate('home.html'), {
    PRIMARY_BUTTON_SRC: primaryButtonUrl,
    PLAY_CLICK_BUTTON_SRC: playClickBtnUrl,
    STADIA_CONTROLLER_SVG: stadiaSvg.trim(),
  });
}

