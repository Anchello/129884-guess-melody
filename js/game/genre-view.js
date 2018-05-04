import GameView from './game-view';

export default class GenreView extends GameView {
  /**
   * @param {object} questions
   */
  constructor(questions) {
    super();
    this._question = questions;
    this._pauseClass = `player-control--pause`;
    this._playClass = `player-control--play`;
    this._currentForm = null;
    this._players = null;
  }

  get template() {
    return `
    <div class="main-wrap">
      <h2 class="title">${this._question.title}</h2>
      <form class="genre">
      ${this._question.answers.map((it, index) =>`
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${it.audio}" id="audio-${index}"></audio>
              <button class="player-control player-control--pause" type="button" data-id="audio-${index}"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${index}" id="a-${index}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`).join(` `)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  `;
  }

  bind() {
    const buttonSubmitAnswer = this.element.querySelector(`.genre-answer-send`);
    this._currentForm = this.element.querySelector(`form`);
    this._buttonsAnswerWrapper = this.element.querySelector(`.genre`);
    let buttonsAnswerActive;
    buttonSubmitAnswer.disabled = true;
    this._buttonsAnswerWrapper.addEventListener(`click`, (evt) => {
      const target = evt.target;
      if (target.name === `answer`) {
        buttonsAnswerActive = this._buttonsAnswerWrapper.querySelectorAll(`[name="answer"]:checked`);
        buttonSubmitAnswer.disabled = !buttonsAnswerActive.length;
      } else if (target.classList.contains(`player-control`)) {
        const currentAudio = this._buttonsAnswerWrapper.querySelector(`#${target.dataset.id}`);
        const activeControls = Array.from(this._buttonsAnswerWrapper.querySelectorAll(`.${this._playClass}`));
        evt.preventDefault();
        this._pausePlayingAudio(activeControls, target);
        this._onPlayerControlClick(target, currentAudio, this._pauseClass, this._playClass);
      }
    });

    buttonSubmitAnswer.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const userAnswers = Array.from(buttonsAnswerActive).map((it) => Number(it.value));
      this.onAnswer(userAnswers);
    });
  }

  reset() {
    this._currentForm.reset();
  }

  _pausePlayingAudio(activeControls, target) {
    activeControls.filter((it) => it !== target)
        .forEach((it) => {
          const audio = this._buttonsAnswerWrapper.querySelector(`#${it.dataset.id}`);
          this._pauseAudio(it, audio);
        });
  }

  onAnswer() {
  }
}
