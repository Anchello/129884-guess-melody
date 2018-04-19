import {GAME_OPTIONS} from '../game-common/initial-options';
/**
 *  Подсчет набранных очков за текущую игру
 * @param {Array} dataResult - массив состоит из ответов, каждый ответ содержит информацию об успешном или неуспешном ответе и времени, затраченном на ответ.
 * @param {Number} remainingNotes - оставшиеся ноты
 * @return {Number}
 */
export const countPoints = (dataResult, remainingNotes) => {
  if (!Array.isArray(dataResult)) {
    throw new Error(`DataResult should be of array`);
  }
  if (!dataResult.length) {
    throw new Error(`DataResult should not be empty`);
  }
  if (typeof remainingNotes !== `number`) {
    throw new TypeError(`RemainingNotes should be of type number`);
  }
  if (remainingNotes < 0) {
    throw new Error(`RemainingNotes should not be negative value`);
  }
  if (dataResult.length < GAME_OPTIONS.maxLevels || remainingNotes === 0) {
    return -1;
  }

  let correctAnswers = 0;
  let correctFastAnswers = 0;
  dataResult.forEach((result) => {
    const {answer, time} = result;
    if (answer) {
      correctAnswers++;
      if (time < GAME_OPTIONS.timeLimit) {
        correctFastAnswers++;
      }
    }
  });

  const incorrectAnswers = GAME_OPTIONS.maxLevels - correctAnswers;
  return correctAnswers * GAME_OPTIONS.correctPoint + correctFastAnswers * GAME_OPTIONS.fastPoint + incorrectAnswers * GAME_OPTIONS.incorrectPoint;
};
