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
  constructor(dataGame) {
    super();
    this.dataGame = dataGame;
  }

  get template() {
    return `
      <div class="main-mistakes">${drawNote(this.dataGame.notes)}</div>
  `;
  }
}
