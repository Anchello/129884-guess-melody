/**
 * Создание таймера
 * @param {number} time
 */

export default class Timer {
  constructor(time) {
    if (typeof time !== `number`) {
      throw new TypeError(`InitialTime should be of type number`);
    }
    if (time < 0) {
      throw new Error(`InitialTime should not be negative value`);
    }
    this._currentTime = time;
  }

  get time() {
    return this._currentTime;
  }

  tick() {
    if (this._currentTime) {
      this._currentTime--;
    }
    return Boolean(this._currentTime);
  }
}
