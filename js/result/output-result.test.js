import {assert} from 'chai';
import ResultScreen from './result-screen';
import GameModel from "../data/data-model";

const STATISTICS = [5, 12, 13, 15, 2, 14];

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
  it(`should get the game of result`, () => {
    const i = 2;
    const t = STATISTICS.length;
    const n = Math.round((t - i) / t * 100);
    assert.equal(`Вы заняли ${i} место из ${t} игроков. Это лучше, чем у ${n}% игроков`, ResultScreen.outputGameResult(STATISTICS, GAME_RESULT[0]));
    assert.equal(`У вас закончились все попытки. <br> Ничего, повезёт в следующий раз!`, ResultScreen.outputGameResult(STATISTICS, GAME_RESULT[1]));
    assert.equal(`Время вышло! <br> Вы не успели отгадать все мелодии`, ResultScreen.outputGameResult(STATISTICS, GAME_RESULT[2]));
    assert.isString(ResultScreen.outputGameResult(STATISTICS, GAME_RESULT[0]));
  });
  it(`should not allow set non Object or not null`, () => {
    assert.throws(() => ResultScreen.outputGameResult(STATISTICS, 0), /GameResult should be of type Object and not null/);
    assert.throws(() => ResultScreen.outputGameResult(STATISTICS, null), /GameResult should be of type Object and not null/);
    assert.throws(() => ResultScreen.outputGameResult(STATISTICS, `DataResult`), /GameResult should be of type Object and not null/);
    assert.throws(() => ResultScreen.outputGameResult(STATISTICS, true), /GameResult should be of type Object and not null/);
  });
  it(`should not allow has incorrect properties of Object`, () => {
    assert.throws(() => ResultScreen.outputGameResult(STATISTICS, INCORRECTED_RESULT), /GameResult should has properties 'points', 'remainingNotes' and 'remainingTime'/);
  });
  it(`should not allow set non Array`, () => {
    assert.throws(() => ResultScreen.outputGameResult(0, GAME_RESULT[0]), /Statistics should be of Array/);
    assert.throws(() => ResultScreen.outputGameResult(null, GAME_RESULT[0]), /Statistics should be of Array/);
    assert.throws(() => ResultScreen.outputGameResult({}, GAME_RESULT[0]), /Statistics should be of Array/);
    assert.throws(() => ResultScreen.outputGameResult(`Statistics`, GAME_RESULT[0]), /Statistics should be of Array/);
    assert.throws(() => ResultScreen.outputGameResult(), /Statistics should be of Array/);
  });
});
