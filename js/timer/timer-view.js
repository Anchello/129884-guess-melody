import AbstractView from '../abstract-view';

const getTimerValue = (remainingTime) => {
  const SECS_IN_ONE_MIN = 60;
  const addZero = (num) => (num < 10) ? `0${num}` : num;
  return {
    valueMins: addZero(Math.trunc(remainingTime / SECS_IN_ONE_MIN)),
    valueSecs: addZero(remainingTime % SECS_IN_ONE_MIN)
  };
};

const isFinishedClass = (remainingTime) => {
  return remainingTime < 30;
};

export default class TimerView extends AbstractView {
  /**
   * @param {object} state
   */
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" stroke="#fff"></circle>
      </svg>
      <div class="timer-value ${isFinishedClass(this.state.remainingTime) ? `timer-value--finished` : ``}" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${getTimerValue(this.state.remainingTime).valueMins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getTimerValue(this.state.remainingTime).valueSecs}</span>
      </div>
    </div>
  `;
  }
}
