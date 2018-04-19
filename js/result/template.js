import {outputGameResult} from './output-result';
import {countPoints} from './count-points';
import {GAME_INITIAL, GAME_OPTIONS} from '../game-common/initial-options';

/**
 * Получение результата игры в виде кол-ва очков, оставшихся нот и оставшегося времени
 * @param {object} dataGame - данные по игре
 * @return {{points: number, remainingNotes: number, remainingTimes: number}}
 */
const getGameResult = (dataGame) => {
  const remainingNotes = GAME_OPTIONS.maxNotes - dataGame.notes;
  const dataResult = dataGame.dataResult;
  return {
    points: countPoints(dataResult, remainingNotes),
    remainingNotes,
    remainingTimes: dataGame.remainingTimes
  };
};
/**
 * Получение результата времени отдельно в минутах и секундах
 * @param {object} gameResult - результат игры
 * @return {{mins: number, secs: number}}
 */
const getTimeResult = (gameResult) => {
  const timeSeconds = GAME_INITIAL.remainingTimes - gameResult.remainingTimes;
  const SECS_IN_ONE_MIN = 60;
  return {
    mins: Math.trunc(timeSeconds / SECS_IN_ONE_MIN),
    secs: timeSeconds % SECS_IN_ONE_MIN
  };
};

export default (statistics, dataGame) => {
  const gameResult = getGameResult(dataGame);
  const resultText = outputGameResult(statistics, gameResult);
  let resultTemplate;
  switch (true) {
    case (gameResult.remainingNotes === 0 || gameResult.points < 0):
      resultTemplate = {
        title: `Какая жалость!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
      break;
    case gameResult.remainingTimes === 0:
      resultTemplate = {
        title: `Увы и ах!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
      break;
    case gameResult.points > 0:
      const timeResult = getTimeResult(gameResult);
      resultTemplate = {
        title: `Вы настоящий меломан!`,
        state: `За ${timeResult.mins} минуты и ${timeResult.secs} секунд
          <br>вы набрали ${gameResult.points} баллов (8 быстрых)
          <br>совершив ${GAME_OPTIONS.maxNotes - gameResult.remainingNotes} ошибки`,
        comparison: resultText,
        button: `Сыграть ещё раз`
      };
      break;
  }
  return resultTemplate;
};


