/**
 * Создание таймера
 * @param {number} time
 * @return {object}
 */
export const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new TypeError(`InitialTime should be of type number`);
  }
  if (time < 0) {
    throw new Error(`InitialTime should not be negative value`);
  }
  if (time === 0) {
    return `Time is over`;
  }
  return {
    time,
    tick: () => {
      return createTimer(time - 1);
    }
  };
};
