import gtBananaUrl from './assets/img_gaming-theme/gt-icons/gt-banana.svg?url';
import gtCircleUrl from './assets/img_gaming-theme/gt-icons/gt-circle.svg?url';
import gtCmiycUrl from './assets/img_gaming-theme/gt-icons/gt-cmiyc.svg?url';
import gtControllerUrl from './assets/img_gaming-theme/gt-icons/gt-controller.svg?url';
import gtDiamondCardUrl from './assets/img_gaming-theme/gt-icons/gt-diamond-card.svg?url';
import gtDiceUrl from './assets/img_gaming-theme/gt-icons/gt-dice.svg?url';
import gtGbUrl from './assets/img_gaming-theme/gt-icons/gt-gb.svg?url';
import gtMazeUrl from './assets/img_gaming-theme/gt-icons/gt-maze.svg?url';
import gtMedalUrl from './assets/img_gaming-theme/gt-icons/gt-medal.svg?url';
import gtMushroomUrl from './assets/img_gaming-theme/gt-icons/gt-mushroom.svg?url';
import gtPackManUrl from './assets/img_gaming-theme/gt-icons/gt-pack-man.svg?url';
import gtPacmanPixelUrl from './assets/img_gaming-theme/gt-icons/gt-pacman-pixel.svg?url';
import gtPlayUrl from './assets/img_gaming-theme/gt-icons/gt-play.svg?url';
import gtPuzzleUrl from './assets/img_gaming-theme/gt-icons/gt-puzzle.svg?url';
import gtSqFaceUrl from './assets/img_gaming-theme/gt-icons/gt-sq-face.svg?url';
import gtSquareUrl from './assets/img_gaming-theme/gt-icons/gt-square.png?url';
import gtStarUrl from './assets/img_gaming-theme/gt-icons/gt-star.svg?url';
import gtTriangleUrl from './assets/img_gaming-theme/gt-icons/gt-triangle.svg?url';

const GAMING_ICON_URLS: Readonly<Record<string, string>> = {
  'gt-banana': gtBananaUrl,
  'gt-circle': gtCircleUrl,
  'gt-cmiyc': gtCmiycUrl,
  'gt-controller': gtControllerUrl,
  'gt-diamond-card': gtDiamondCardUrl,
  'gt-dice': gtDiceUrl,
  'gt-gb': gtGbUrl,
  'gt-maze': gtMazeUrl,
  'gt-medal': gtMedalUrl,
  'gt-mushroom': gtMushroomUrl,
  'gt-pack-man': gtPackManUrl,
  'gt-pacman-pixel': gtPacmanPixelUrl,
  'gt-play': gtPlayUrl,
  'gt-puzzle': gtPuzzleUrl,
  'gt-sq-face': gtSqFaceUrl,
  'gt-square': gtSquareUrl,
  'gt-star': gtStarUrl,
  'gt-triangle': gtTriangleUrl,
};

/** Returns the icon URL for a given gaming symbol key. */
export function getGamingIconUrl(key: string): string | undefined {
  return GAMING_ICON_URLS[key];
}

