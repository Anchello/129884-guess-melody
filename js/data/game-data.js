export const GAME_OPTIONS = {
  correctPoint: 1,
  fastPoint: 1,
  incorrectPoint: -2,
  timeLimit: 30,
  maxAnswers: 10,
  maxNotes: 3
};
/**
 *  Подсчет набранных очков за текущую игру
 * @param {Array} dataResult
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
    throw new Error(`RemainingNotes should be of type number`);
  }
  if (remainingNotes < 0) {
    throw new Error(`RemainingNotes should not be negative value`);
  }
  if (dataResult.length < GAME_OPTIONS.maxAnswers || remainingNotes === 0) {
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

  const incorrectAnswers = GAME_OPTIONS.maxAnswers - correctAnswers;
  return correctAnswers * GAME_OPTIONS.correctPoint + correctFastAnswers * GAME_OPTIONS.fastPoint + incorrectAnswers * GAME_OPTIONS.incorrectPoint;
};
