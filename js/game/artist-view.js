import GameView from './game-view';

export default class ArtistView extends GameView {
  /**
   * @param {object} questions
   */
  constructor(questions) {
    super();
    this._question = questions;
    this._pauseClass = `player-control--pause`;
    this._playClass = `player-control--play`;
    this._currentForm = null;
  }

  get template() {
    return `
    <div class="main-wrap">
      <h2 class="title main-title">${this._question.title}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${this._question.audio}" id="audio-0"></audio>
          <button class="player-control player-control--pause" data-id="audio-0"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        ${this._question.answers.map((it, index) =>`
          <div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}"/>
            <label class="main-answer" for="answer-${index}">
              <img class="main-answer-preview" src="${it.preview.src}"
                   alt="${it.artist}" width="${it.preview.width}" height="${it.preview.height}">
              ${it.artist}
            </label>
          </div>`).join(` `)}
      </form>
    </div>
  `;
  }

  bind() {
    const playerWrapper = this.element.querySelector(`.player-wrapper`);
    this._currentForm = this.element.querySelector(`form`);
    this._currentForm.addEventListener(`change`, (evt) => {
      const userAnswer = evt.target;
      if (userAnswer.classList.contains(`main-answer-r`)) {
        this.onAnswer([Number(userAnswer.value)]);
      }
    });
    playerWrapper.addEventListener(`click`, (evt) => {
      const target = evt.target;
      if (target.classList.contains(`player-control`)) {
        evt.preventDefault();
        const currentAudio = playerWrapper.querySelector(`#${target.dataset.id}`);
        this._onPlayerControlClick(target, currentAudio, this._pauseClass, this._playClass);
      }
    });
  }

  reset() {
    this._currentForm.reset();
  }

  onAnswer() {
  }
}
