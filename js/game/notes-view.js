import AbstractView from '../abstract-view';

const drawNote = (countNotes) => {
  const arr = [];
  const note = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
  for (let i = 0; i < countNotes; i++) {
    arr.push(note);
  }
  return arr.join(` `);
};

export default class NotesView extends AbstractView {
  /**
   * @param {Object} state
   */
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <div class="main-mistakes">${drawNote(this.state.notes)}</div>
  `;
  }
}
