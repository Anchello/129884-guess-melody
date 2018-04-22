import {GameOptions} from './initial-options';
import {showScreenElement} from '../utils';
import startScreen from '../start/start-screen';
import genreScreen from '../genre/genre-screen';
import artistScreen from '../artist/artist-screen';
import resultScreen from '../result/result-screen';

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
      screen = startScreen(dataGame).element;
      break;
    case nextLevel > GameOptions.MAX_LEVELS || isGameOver:
      screen = resultScreen(dataGame).element;
      break;
    case nextLevel % 2 !== 0:
      screen = artistScreen(dataGame).element;
      break;
    case nextLevel % 2 === 0:
      screen = genreScreen(dataGame).element;
      break;
  }
  showScreenElement(screen);
};
