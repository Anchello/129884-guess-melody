import {assert} from 'chai';
import {getDataResult} from './../utils';
import {countPoints} from './game-data';

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
  it(`should be fail game`, () => {
    assert.equal(-1, countPoints(FailedDataResult, 0));
    assert.equal(-1, countPoints(FailedDataResult2, 3));
    assert.equal(-1, countPoints(FailedDataResult3, 0));
  });
  it(`should all answers are correct`, () => {
    assert.equal(10, countPoints(winDataResult, 3));
    assert.equal(4, countPoints(winDataResult2, 1));
    assert.equal(7, countPoints(winDataResult3, 2));
    assert.equal(20, countPoints(fastDataResult, 3));
    assert.equal(16, countPoints(fastDataResult2, 2));
    assert.equal(13, countPoints(fastDataResult3, 3));
    assert.equal(8, countPoints(fastDataResult4, 1));
  });
  it(`should not allow set empty array`, () => {
    assert.throws(() => countPoints([], 0), /DataResult should not be empty/);
  });
  it(`should not allow set non array`, () => {
    assert.throws(() => countPoints(0, 0), /DataResult should be of array/);
    assert.throws(() => countPoints(null, 0), /DataResult should be of array/);
    assert.throws(() => countPoints({}, 0), /DataResult should be of array/);
    assert.throws(() => countPoints(`DataResult`, 0), /DataResult should be of array/);
    assert.throws(() => countPoints(), /DataResult should be of array/);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => countPoints(FailedDataResult, -1), /RemainingNotes should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => countPoints(FailedDataResult, CORRECT_ANSWER), /RemainingNotes should be of type number/);
    assert.throws(() => countPoints(FailedDataResult, FailedDataResult), /RemainingNotes should be of type number/);
    assert.throws(() => countPoints(FailedDataResult, null), /RemainingNotes should be of type number/);
    assert.throws(() => countPoints(FailedDataResult, `RemainingNotes`), /RemainingNotes should be of type number/);
    assert.throws(() => countPoints(FailedDataResult), /RemainingNotes should be of type number/);
  });
});
