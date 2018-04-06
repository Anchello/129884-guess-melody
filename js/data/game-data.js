export const SCORE_OPTIONS = {
  correctAnswer: 1,
  correctFastAnswer: 1,
  incorrectAnswer: -2,
  timeLimit: 30000
};

export const INITIAL_GAME = {
  maxAnswers: 10
};

export const countScore = (dataResult) => {
  if (!Array.isArray(dataResult)) {
    throw new Error(`DataResult should be array`);
  }

  console.log(dataResult.length);
  if (dataResult.length < 10) {
    return -1;
  }

  let correctAnswers = 0;
  let correctFastAnswers = 0;
  dataResult.forEach((result) => {
    const {answer, time} = result;
    if (answer) {
      correctAnswers++;
      if (time < 30000) {
        ++correctFastAnswers;
      }
    }
  });

  const incorrectAnswers = INITIAL_GAME.maxAnswers - correctAnswers;
  return correctAnswers * SCORE_OPTIONS.correctAnswer + correctFastAnswers * SCORE_OPTIONS.correctFastAnswer + incorrectAnswers * SCORE_OPTIONS.incorrectAnswer;
};
