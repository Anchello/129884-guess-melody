import HeaderView from '../header/header-view';
import AbstractView from '../abstract-view';

export default class ArtistView extends AbstractView {
  constructor(dataGame, questions) {
    super();
    this._headerTemplate = new HeaderView(dataGame).template;
    this._question = questions;
  }

  get template() {
    return `
    <section class="main main--level main--level-artist">
      ${this._headerTemplate}
      <div class="main-wrap">
        <h2 class="title main-title">${this._question.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${this._question.audio}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${this._question.answers.map((it, index) =>`
            <div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${it.artist}"/>
              <label class="main-answer" for="answer-${index}">
                <img class="main-answer-preview" src="${it.preview}"
                     alt="${it.artist}" width="134" height="134">
                ${it.artist}
              </label>
            </div>`).join(` `)}
        </form>
      </div>
    </section>
  `;
  }

  reset() {
    this._currentForm.reset();
  }

  onAnswer() {
  }

  bind(element) {
    this._currentForm = element.querySelector(`form`);
    this._currentForm.addEventListener(`change`, (evt) => {
      const userAnswer = evt.target;
      if (userAnswer.classList.contains(`main-answer-r`)) {
        this.onAnswer([userAnswer.value]);
      }
    });
  }
}
