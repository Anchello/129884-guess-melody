export const GAME_OPTIONS = {
  correctPoint: 1,
  fastPoint: 1,
  incorrectPoint: -2,
  timeLimit: 30,
  maxLevels: 10,
  maxNotes: 3
};

export const INITIAL_GAME = Object.freeze({
  level: 0,
  notes: 0,
  remainingTimes: 300
});

/**
 *  Подсчет набранных очков за текущую игру
 * @param {Array} dataResult - массив состоит из ответов, каждый ответ содержит информацию об успешном или неуспешном ответе и времени, затраченном на ответ.
 * @param {Number} remainingNotes
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
/**
 * Конец игры
 * @param {object} gameOptions - текущие параметры игры
 * @return {boolean}
 */
export const isGameOver = (gameOptions) => gameOptions.level > GAME_OPTIONS.maxLevels || gameOptions.notes === GAME_OPTIONS.maxNotes || gameOptions.remainingTimes <= 0;
