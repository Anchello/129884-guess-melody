import {assert} from 'chai';
import {getPlayerResults} from './game-result';

const STATISTICS = [5, 12, 13, 15, 2];

const GAME_RESULT = [
  {
    points: 14,
    remainingNotes: 2,
    remainingTimes: 22
  },
  {
    points: -1,
    remainingNotes: 0,
    remainingTimes: 150
  },
  {
    points: 14,
    remainingNotes: 2,
    remainingTimes: 0
  }
];

const INCORRECTED_RESULT = {
  points: 14,
  remainNotes: 2,
  remainTime: 22
};

describe(`Get player results`, () => {
  it(`should get the game of result`, () => {
    const i = 2;
    const t = STATISTICS.length + 1;
    const n = Math.round((t - i) / t * 100);
    assert.equal(`Вы заняли ${i} место из ${t} игроков. Это лучше, чем у ${n}% игроков`, getPlayerResults(STATISTICS, GAME_RESULT[0]));
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, getPlayerResults(STATISTICS, GAME_RESULT[1]));
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, getPlayerResults(STATISTICS, GAME_RESULT[2]));
    assert.isString(getPlayerResults(STATISTICS, GAME_RESULT[0]));
  });
  it(`should not allow set non object or not null`, () => {
    assert.throws(() => getPlayerResults(STATISTICS, 0), /GameResult should be of type object and not null/);
    assert.throws(() => getPlayerResults(STATISTICS, null), /GameResult should be of type object and not null/);
    assert.throws(() => getPlayerResults(STATISTICS, `DataResult`), /GameResult should be of type object and not null/);
    assert.throws(() => getPlayerResults(STATISTICS, true), /GameResult should be of type object and not null/);
  });
  it(`should not allow has incorrect properties of object`, () => {
    assert.throws(() => getPlayerResults(STATISTICS, INCORRECTED_RESULT), /GameResult should has properties 'points', 'remainingNotes' and 'remainingTimes'/);
  });
  it(`should not allow set empty value`, () => {
    assert.throws(() => getPlayerResults([], GAME_RESULT[0]), /Statistics should not be empty/);
  });
  it(`should not allow set non array`, () => {
    assert.throws(() => getPlayerResults(0, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => getPlayerResults(null, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => getPlayerResults({}, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => getPlayerResults(`Statistics`, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => getPlayerResults(), /Statistics should be of array/);
  });
});
