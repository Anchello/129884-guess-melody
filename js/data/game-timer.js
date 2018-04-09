export const createTimer = (initialTime) => {
  if (typeof initialTime !== `number`) {
    throw new Error(`InitialTime should be of type number`);
  }
  if (initialTime < 0) {
    throw new Error(`InitialTime should not be negative value`);
  }
  let timer = {
    currentTime: initialTime,
    tick() {
      if (this.currentTime <= 0) {
        return -1;
      }
      this.currentTime--;
      return this.currentTime;
    }
  };
  return timer;
};
