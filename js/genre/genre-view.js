import HeaderView from '../header/header-view';
import AbstractView from '../abstract-view';

export default class GenreView extends AbstractView {
  constructor(dataGame, questions) {
    super();
    this._headerTemplate = new HeaderView(dataGame).template;
    this._question = questions;
  }

  get template() {
    return `
    <section class="main main--level main--level-genre">
      ${this._headerTemplate}
      <div class="main-wrap">
        <h2 class="title">${this._question.title}</h2>
        <form class="genre">
        ${this._question.answers.map((it, index) =>`
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${it.audio}"></audio>
                <button class="player-control player-control--pause" type="button"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="${it.artist}" id="a-${index}">
            <label class="genre-answer-check" for="a-${index}"></label>
          </div>`).join(` `)}
          <button class="genre-answer-send" type="submit">Ответить</button>
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
    const buttonsAnswerWrapper = element.querySelector(`.genre`);
    const buttonSubmitAnswer = element.querySelector(`.genre-answer-send`);
    this._currentForm = element.querySelector(`form`);
    let buttonsAnswerActive;
    buttonSubmitAnswer.disabled = true;
    buttonsAnswerWrapper.addEventListener(`click`, (evt) => {
      if (evt.target.name === `answer`) {
        buttonsAnswerActive = buttonsAnswerWrapper.querySelectorAll(`[name="answer"]:checked`);
        buttonSubmitAnswer.disabled = !buttonsAnswerActive.length;
      }
    });

    buttonSubmitAnswer.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const userAnswers = Array.from(buttonsAnswerActive).map((it) => it.value);
      this.onAnswer(userAnswers);
    });
  }
}
