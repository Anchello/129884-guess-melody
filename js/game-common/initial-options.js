export const GAME_OPTIONS = {
  correctPoint: 1,
  fastPoint: 1,
  incorrectPoint: -2,
  timeLimit: 30,
  maxLevels: 10,
  maxNotes: 3
};

export const GAME_INITIAL = Object.freeze({
  level: 0,
  notes: 0,
  remainingTimes: 300,
  dataResult: []
});
