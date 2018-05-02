import {assert} from 'chai';
import ResultScreen from './result-screen';
import GameModel from "../data/game-model";

const STATISTICS = [5, 12, 13, 15, 2];

const GAME_RESULT = [
  {
    points: 14,
    remainingNotes: 2,
    remainingTime: 22
  },
  {
    points: -1,
    remainingNotes: 0,
    remainingTime: 150
  },
  {
    points: 14,
    remainingNotes: 2,
    remainingTime: 0
  }
];

const INCORRECTED_RESULT = {
  points: 14,
  remainNotes: 2,
  remainTime: 22
};

describe(`Get output result`, () => {
  const model = new GameModel();
  model.init();
  const resultScreen = new ResultScreen(model);
  it(`should get the game of result`, () => {
    const i = 2;
    const t = STATISTICS.length + 1;
    const n = Math.round((t - i) / t * 100);
    assert.equal(`Вы заняли ${i} место из ${t} игроков. Это лучше, чем у ${n}% игроков`, resultScreen.outputGameResult(STATISTICS, GAME_RESULT[0]));
    assert.equal(`У вас закончились все попытки. <br> Ничего, повезёт в следующий раз!`, resultScreen.outputGameResult(STATISTICS, GAME_RESULT[1]));
    assert.equal(`Время вышло! <br> Вы не успели отгадать все мелодии`, resultScreen.outputGameResult(STATISTICS, GAME_RESULT[2]));
    assert.isString(resultScreen.outputGameResult(STATISTICS, GAME_RESULT[0]));
  });
  it(`should not allow set non object or not null`, () => {
    assert.throws(() => resultScreen.outputGameResult(STATISTICS, 0), /GameResult should be of type object and not null/);
    assert.throws(() => resultScreen.outputGameResult(STATISTICS, null), /GameResult should be of type object and not null/);
    assert.throws(() => resultScreen.outputGameResult(STATISTICS, `DataResult`), /GameResult should be of type object and not null/);
    assert.throws(() => resultScreen.outputGameResult(STATISTICS, true), /GameResult should be of type object and not null/);
  });
  it(`should not allow has incorrect properties of object`, () => {
    assert.throws(() => resultScreen.outputGameResult(STATISTICS, INCORRECTED_RESULT), /GameResult should has properties 'points', 'remainingNotes' and 'remainingTime'/);
  });
  it(`should not allow set non array`, () => {
    assert.throws(() => resultScreen.outputGameResult(0, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => resultScreen.outputGameResult(null, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => resultScreen.outputGameResult({}, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => resultScreen.outputGameResult(`Statistics`, GAME_RESULT[0]), /Statistics should be of array/);
    assert.throws(() => resultScreen.outputGameResult(), /Statistics should be of array/);
  });
});
