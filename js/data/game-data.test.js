import {assert} from 'chai';
import {countScore} from './game-data';

describe(`Check to count the score`, () => {
  it(`should be fail game`, () => {
    const arr = [
      {
        answer: true,
        time: 30000
      },
      {
        answer: false,
        time: 1000
      }
    ];
    assert.equal(-1, countScore(arr));
    assert.equal(-1, countScore([]));
  });
  it(`should all answers are correct`, () => {
    const obj = {
      answer: true,
      time: 30000
    };
    const obj2 = {
      answer: false,
      time: 10000
    };
    const obj3 = {
      answer: true,
      time: 10000
    };
    const arr = [obj, obj, obj, obj, obj, obj, obj, obj, obj, obj];
    const arr2 = [obj2, obj2, obj, obj, obj, obj, obj, obj, obj, obj];
    const arr3 = [obj3, obj3, obj, obj, obj, obj, obj, obj, obj, obj];
    assert.equal(10, countScore(arr));
    assert.equal(4, countScore(arr2));
    assert.equal(12, countScore(arr3));
  });
  it(`should not allow set non array`, () => {
    assert.throws(() => countScore(0), /DataResult should be array/);
    assert.throws(() => countScore(undefined), /DataResult should be array/);
    assert.throws(() => countScore(null), /DataResult should be array/);
    assert.throws(() => countScore({}), /DataResult should be array/);
    assert.throws(() => countScore(`DataResult`), /DataResult should be array/);
  });
});
