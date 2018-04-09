import {assert} from 'chai';
import {createTimer} from './game-timer';

describe(`Check to create the timer for the game`, () => {
  it(`should get the object`, () => {
    assert.isObject(createTimer(300));
  });
  it(`should get the timer`, () => {
    assert.equal(300, createTimer(300).currentTime);
    assert.equal(299, createTimer(300).tick());
    assert.equal(0, createTimer(1).tick());
  });
  it(`should be time over`, () => {
    assert.equal(-1, createTimer(0).tick());
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => createTimer(-100), /InitialTime should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => createTimer({}), /InitialTime should be of type number/);
    assert.throws(() => createTimer([]), /InitialTime should be of type number/);
    assert.throws(() => createTimer(null), /InitialTime should be of type number/);
    assert.throws(() => createTimer(`InitialTime`), /InitialTime should be of type number/);
    assert.throws(() => createTimer(false), /InitialTime should be of type number/);
    assert.throws(() => createTimer(), /InitialTime should be of type number/);
  });
});
