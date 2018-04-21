import {GameOptions} from '../game-common/initial-options';
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
  if (dataResult.length < GameOptions.MAX_LEVELS || remainingNotes === 0) {
    return -1;
  }

  let correctAnswers = 0;
  let correctFastAnswers = 0;
  dataResult.forEach((result) => {
    const {answer, time} = result;
    if (answer) {
      correctAnswers++;
      if (time < GameOptions.TIME_LIMIT) {
        correctFastAnswers++;
      }
    }
  });

  const incorrectAnswers = GameOptions.MAX_LEVELS - correctAnswers;
  return correctAnswers * GameOptions.CORRECT_POINT + correctFastAnswers * GameOptions.FAST_POINT + incorrectAnswers * GameOptions.INCORRECT_POINT;
};
