import {assert} from 'chai';
import Timer from './timer';

describe(`Create the timer for the game`, () => {
  it(`should get the object`, () => {
    assert.isObject(new Timer(300));
  });
  it(`should get the timer`, () => {
    const timer = new Timer(300);
    assert.equal(300, timer.time);
    timer.tick();
    timer.tick();
    assert.equal(298, timer.time);
    const timerNew = new Timer(100);
    timerNew.tick();
    assert.equal(99, timerNew.time);
  });
  it(`should be time is over`, () => {
    const timer = new Timer(1);
    assert.isFalse(timer.tick());
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => new Timer(-100), /InitialTime should not be negative value/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => new Timer({}), /InitialTime should be of type number/);
    assert.throws(() => new Timer([]), /InitialTime should be of type number/);
    assert.throws(() => new Timer(null), /InitialTime should be of type number/);
    assert.throws(() => new Timer(`InitialTime`), /InitialTime should be of type number/);
    assert.throws(() => new Timer(false), /InitialTime should be of type number/);
    assert.throws(() => new Timer(), /InitialTime should be of type number/);
  });
});
