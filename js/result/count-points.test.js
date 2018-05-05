import {assert} from 'chai';
import ResultScreen from './result-screen';
import GameModel from "../data/data-model";
/**
 * Получение массива данных с одинаковыми результатами
 * @param {Object} answers
 * @param {Number} lengthResult
 * @return {Array}
 */
const getDataResult = (answers, lengthResult) => {
  if (typeof lengthResult !== `number`) {
    throw new TypeError(`LengthResult should be of type number`);
  }
  if (typeof answers !== `object`) {
    throw new TypeError(`Answers should be of type object`);
  }
  const dataResult = [];
  for (let i = 0; i < lengthResult; i++) {
    dataResult.push(answers);
  }
  return dataResult;
};
const CORRECT_ANSWER = {
  answer: true,
  time: 30
};
const INCORRECT_ANSWER = {
  answer: false,
  time: 10
};
const FAST_ANSWER = {
  answer: true,
  time: 10
};
const FailedDataResult = getDataResult(INCORRECT_ANSWER, 3);
const FailedDataResult2 = getDataResult(CORRECT_ANSWER, 7);
const FailedDataResult3 = [...getDataResult(CORRECT_ANSWER, 7), ...getDataResult(INCORRECT_ANSWER, 3)];
const winDataResult = getDataResult(CORRECT_ANSWER, 10);
const winDataResult2 = [...getDataResult(CORRECT_ANSWER, 8), ...getDataResult(INCORRECT_ANSWER, 2)];
const winDataResult3 = [...getDataResult(CORRECT_ANSWER, 9), ...getDataResult(INCORRECT_ANSWER, 1)];
const fastDataResult = getDataResult(FAST_ANSWER, 10);
const fastDataResult2 = [...getDataResult(FAST_ANSWER, 9), ...getDataResult(INCORRECT_ANSWER, 1)];
const fastDataResult3 = [...getDataResult(FAST_ANSWER, 3), ...getDataResult(CORRECT_ANSWER, 7)];
const fastDataResult4 = [...getDataResult(INCORRECT_ANSWER, 2), ...getDataResult(FAST_ANSWER, 4), ...getDataResult(CORRECT_ANSWER, 4)];

describe(`Count the points`, () => {
  const resultScreen = new ResultScreen(new GameModel());
  it(`should be fail game`, () => {
    assert.equal(-1, resultScreen.countPoints(FailedDataResult, 0));
    assert.equal(-1, resultScreen.countPoints(FailedDataResult2, 3));
    assert.equal(-1, resultScreen.countPoints(FailedDataResult3, 0));
    assert.equal(-1, resultScreen.countPoints([], 0));
  });
  it(`should all answers are correct`, () => {
    assert.equal(10, resultScreen.countPoints(winDataResult, 3));
    assert.equal(4, resultScreen.countPoints(winDataResult2, 1));
    assert.equal(7, resultScreen.countPoints(winDataResult3, 2));
    assert.equal(20, resultScreen.countPoints(fastDataResult, 3));
    assert.equal(16, resultScreen.countPoints(fastDataResult2, 2));
    assert.equal(13, resultScreen.countPoints(fastDataResult3, 3));
    assert.equal(8, resultScreen.countPoints(fastDataResult4, 1));
  });
  it(`should not allow set non array`, () => {
    assert.throws(() => resultScreen.countPoints(0, 0), /DataResult should be of array/);
    assert.throws(() => resultScreen.countPoints(null, 0), /DataResult should be of array/);
    assert.throws(() => resultScreen.countPoints({}, 0), /DataResult should be of array/);
    assert.throws(() => resultScreen.countPoints(`DataResult`, 0), /DataResult should be of array/);
    assert.throws(() => resultScreen.countPoints(), /DataResult should be of array/);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => resultScreen.countPoints(FailedDataResult, -1), /RemainingNotes should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => resultScreen.countPoints(FailedDataResult, CORRECT_ANSWER), /RemainingNotes should be of type number/);
    assert.throws(() => resultScreen.countPoints(FailedDataResult, FailedDataResult), /RemainingNotes should be of type number/);
    assert.throws(() => resultScreen.countPoints(FailedDataResult, null), /RemainingNotes should be of type number/);
    assert.throws(() => resultScreen.countPoints(FailedDataResult, `RemainingNotes`), /RemainingNotes should be of type number/);
    assert.throws(() => resultScreen.countPoints(FailedDataResult), /RemainingNotes should be of type number/);
  });
});
