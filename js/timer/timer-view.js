import AbstractView from '../abstract-view';

const getTimerValue = (remainingTime) => {
  const SECS_IN_ONE_MIN = 60;
  const addZero = (num) => (num < 10) ? `0${num}` : num;
  return {
    valueMins: addZero(Math.trunc(remainingTime / SECS_IN_ONE_MIN)),
    valueSecs: addZero(remainingTime % SECS_IN_ONE_MIN)
  };
};

export default class TimerView extends AbstractView {
  constructor(dataGame) {
    super();
    this.dataGame = dataGame;
  }

  get template() {
    return `
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getTimerValue(this.dataGame.remainingTime).valueMins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getTimerValue(this.dataGame.remainingTime).valueSecs}</span>
      </div>
    </div>
  `;
  }
}
