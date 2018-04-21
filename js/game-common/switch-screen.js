import {GameOptions} from './initial-options';
import {showScreenElement} from '../utils';
import screenStart from '../start/start';
import screenGenre from '../genre/screen';
import screenArtist from '../artist/screen';
import screenResult from '../result/screen';

/**
 * Переключение экранов игры
 * @param {object} dataGame
 */
export const switchScreen = (dataGame) => {
  const isGameOver = dataGame.notes === GameOptions.MAX_NOTES || dataGame.remainingTimes <= 0;
  const nextLevel = dataGame.level;
  let screen;
  switch (true) {
    case nextLevel <= 0:
      screen = screenStart;
      break;
    case nextLevel > GameOptions.MAX_LEVELS || isGameOver:
      screen = screenResult;
      break;
    case nextLevel % 2 !== 0:
      screen = screenArtist;
      break;
    case nextLevel % 2 === 0:
      screen = screenGenre;
      break;
  }
  showScreenElement(screen(dataGame));
};
