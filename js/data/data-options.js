export const GameOptions = {
  CORRECT_POINT: 1,
  FAST_POINT: 1,
  INCORRECT_POINT: -2,
  TIME_LIMIT: 30,
  MAX_LEVELS: 10,
  MAX_NOTES: 3
};

export const GAME_INITIAL = Object.freeze({
  level: 1,
  notes: 0,
  remainingTime: 300,
  dataResult: [],
  points: 0
});

export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};
