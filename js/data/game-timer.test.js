import {assert} from 'chai';
import {createTimer} from './game-timer';

describe(`Create the timer for the game`, () => {
  it(`should get the object`, () => {
    assert.isObject(createTimer(300));
    assert.isObject(createTimer(100).tick());
  });
  it(`should get the timer`, () => {
    assert.equal(300, createTimer(300).time);
    assert.equal(298, createTimer(300).tick().tick().time);
    assert.equal(99, createTimer(100).tick().time);
  });
  it(`should be time is over`, () => {
    assert.equal(`Time is over`, createTimer(1).tick());
    assert.equal(`Time is over`, createTimer(0));
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
