import {outputGameResult} from './output-result';
import {countPoints} from './count-points';
import {getInitialDataGame} from './../utils';
import {GAME_INITIAL, GameOptions} from '../game-common/initial-options';
import ResultView from './result-view';
import {switchScreen} from '../game-common/switch-screen';

/**
 * Получение результата игры в виде объекта содержащего кол-во очков, оставшихся нот и оставшегося времени
 * @param {object} dataGame - данные по игре
 * @return {{points: number, remainingNotes: number, remainingTimes: number}}
 */
const getGameResult = (dataGame) => {
  const remainingNotes = GameOptions.MAX_NOTES - dataGame.notes;
  const dataResult = dataGame.dataResult;
  return {
    points: countPoints(dataResult, remainingNotes),
    remainingNotes,
    remainingTimes: dataGame.remainingTimes
  };
};
/**
 * Получение результата времени отдельно в минутах и секундах
 * @param {object} gameResult - результат игры в виде объекта содержащего кол-во очков, оставшихся нот и оставшегося времени
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
/**
 * Получение результата в виде объекта, который содержит данные для вывода на экран
 * @param {object} gameResult - результат игры в виде объекта содержащего кол-во очков, оставшихся нот и оставшегося времени
 * @return {object}
 */
const getResult = (gameResult) => {
  let statistics = [];
  const resultText = outputGameResult(statistics, gameResult);
  let result;
  if (gameResult.remainingNotes === 0 || gameResult.points < 0) {
    result = {
      title: `Какая жалость!`,
      state: resultText,
      button: `Попробовать ещё раз`
    };
  } else if (gameResult.remainingTimes === 0) {
    result = {
      title: `Увы и ах!`,
      state: resultText,
      button: `Попробовать ещё раз`
    };
  } else if (gameResult.points > 0) {
    const timeResult = getTimeResult(gameResult);
    result = {
      title: `Вы настоящий меломан!`,
      state: `За ${timeResult.mins} минуты и ${timeResult.secs} секунд
        <br>вы набрали ${gameResult.points} баллов (8 быстрых)
        <br>совершив ${GameOptions.MAX_NOTES - gameResult.remainingNotes} ошибки`,
      comparison: resultText,
      button: `Сыграть ещё раз`
    };
  } else {
    throw new Error(`Unknown result: ${gameResult}`);
  }
  return result;
};

export default (dataGame) => {
  const gameResult = getGameResult(dataGame);
  const result = getResult(gameResult);
  const resultScreen = new ResultView(result);
  resultScreen.onButtonClick = () => switchScreen(getInitialDataGame());
  return resultScreen;
};


