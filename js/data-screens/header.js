const getTimerValue = (timeSeconds) => {
  const SECS_IN_ONE_MIN = 60;
  const addZero = (num) => (num < 10) ? `0${num}` : num;
  return {
    valueMins: Math.trunc(timeSeconds / SECS_IN_ONE_MIN),
    valueSecs: addZero(timeSeconds % SECS_IN_ONE_MIN)
  };
};

const drawNote = (countNotes) => {
  const arr = [];
  const note = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
  for (let i = 0; i < countNotes; i++) {
    arr.push(note);
  }
  return arr.join(` `);
};

export default (data) => {
  return `
    <header>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getTimerValue(data.time).valueMins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getTimerValue(data.time).valueSecs}</span>
      </div>
      <div class="main-mistakes">${drawNote(data.notes)}</div>
    </header>
  `;
};
