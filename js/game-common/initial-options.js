export const GameOptions = {
  CORRECT_POINT: 1,
  FAST_POINT: 1,
  INCORRECT_POINT: -2,
  TIME_LIMIT: 30,
  MAX_LEVELS: 10,
  MAX_NOTES: 3
};

export const GAME_INITIAL = Object.freeze({
  level: 0,
  notes: 0,
  remainingTimes: 300,
  dataResult: []
});

export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};
