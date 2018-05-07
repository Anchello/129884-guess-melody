import GameView from './game-view';

export default class GenreView extends GameView {
  /**
   * @param {Object} question
   */
  constructor(question) {
    super();
    this._question = question;
    this._pauseClass = `player-control--pause`;
    this._playClass = `player-control--play`;
    this._currentForm = null;
    this._buttonsAnswerActive = null;
    this._buttonSubmitAnswer = null;
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
              <button class="player-control player-control--play" type="button" data-id="audio-${index}"></button>
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
    this._buttonSubmitAnswer = this.element.querySelector(`.genre-answer-send`);
    this._buttonsAnswerWrapper = this.element.querySelector(`.genre`);
    this._buttonsAnswerWrapper.addEventListener(`click`, this._onButtonsAnswerWrapperClick.bind(this));
    this._buttonSubmitAnswer.disabled = true;
    this._buttonSubmitAnswer.addEventListener(`click`, this._onButtonSubmitClick.bind(this));
  }

  reset() {
    this._currentForm = this.element.querySelector(`form`);
    this._currentForm.reset();
  }

  _onButtonsAnswerWrapperClick(evt) {
    const target = evt.target;
    if (target.name === `answer`) {
      this._onButtonAnswerClick();
    } else if (target.classList.contains(`player-control`)) {
      evt.preventDefault();
      this._onPlayerClick(target);
    }
  }

  _onButtonAnswerClick() {
    this._buttonsAnswerActive = this._buttonsAnswerWrapper.querySelectorAll(`[name="answer"]:checked`);
    this._buttonSubmitAnswer.disabled = !this._buttonsAnswerActive.length;
  }

  /**
   * @param {Object} target
   */
  _onPlayerClick(target) {
    const currentAudio = this._buttonsAnswerWrapper.querySelector(`#${target.dataset.id}`);
    const activeControls = Array.from(this._buttonsAnswerWrapper.querySelectorAll(`.${this._pauseClass}`));
    this._pausePlayingAudio(activeControls, target);
    this._onPlayerControlClick(target, currentAudio, this._pauseClass, this._playClass);
  }

  _onButtonSubmitClick(evt) {
    evt.preventDefault();
    const userAnswers = Array.from(this._buttonsAnswerActive).map((it) => Number(it.value));
    this.onAnswer(userAnswers);
  }

  /**
   * @param {Array} activeControls
   * @param {Object} target
   */
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
