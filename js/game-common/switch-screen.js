import {GAME_OPTIONS} from './initial-options';
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
  const getRandomNumber = Math.random();
  const isGameOver = dataGame.notes === GAME_OPTIONS.maxNotes || dataGame.remainingTimes <= 0;
  const nextLevel = dataGame.level;
  let screen;
  switch (true) {
    case nextLevel <= 0:
      screen = screenStart;
      break;
    case nextLevel > GAME_OPTIONS.maxLevels || isGameOver:
      screen = screenResult;
      break;
    case getRandomNumber < 0.5:
      screen = screenArtist;
      break;
    case getRandomNumber >= 0.5:
      screen = screenGenre;
      break;
  }
  showScreenElement(screen(dataGame));
};
