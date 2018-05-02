import AbstractView from '../abstract-view';

export default class GenreView extends AbstractView {
  constructor(questions) {
    super();
    this._question = questions;
    this._pauseClass = `player-control--pause`;
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
              <audio src="${it.audio}"></audio>
              <button class="player-control player-control--pause" type="button"></button>
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

  reset() {
    this._currentForm.reset();
  }

  onAnswer() {
  }

  bind() {
    const buttonsAnswerWrapper = this.element.querySelector(`.genre`);
    const buttonSubmitAnswer = this.element.querySelector(`.genre-answer-send`);
    this._currentForm = this.element.querySelector(`form`);
    this._players = Array.from(this.element.querySelectorAll(`.player`));
    let buttonsAnswerActive;
    buttonSubmitAnswer.disabled = true;
    buttonsAnswerWrapper.addEventListener(`click`, (evt) => {
      const target = evt.target;
      if (target.name === `answer`) {
        buttonsAnswerActive = buttonsAnswerWrapper.querySelectorAll(`[name="answer"]:checked`);
        buttonSubmitAnswer.disabled = !buttonsAnswerActive.length;
      } else if (target.classList.contains(`player-control`)) {
        evt.preventDefault();
        this._onPlayerClick(target);
      }
    });

    buttonSubmitAnswer.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const userAnswers = Array.from(buttonsAnswerActive).map((it) => Number(it.value));
      this.onAnswer(userAnswers);
    });
  }
  _onPlayerClick(target) {
    const currentControl = target;
    const currentPlayer = currentControl.closest(`.player`);
    const currentAudio = currentPlayer.querySelector(`audio`);
    if (currentControl.classList.contains(this._pauseClass)) {
      this._players.forEach((it) => {
        const control = it.querySelector(`.player-control`);
        const audio = it.querySelector(`audio`);
        if (control === currentControl) {
          this._playAudio(control, audio);
        } else if (!control.classList.contains(this._pauseClass)) {
          this._pauseAudio(control, audio);
        }
      });
    } else {
      this._pauseAudio(currentControl, currentAudio);
    }
  }
  _playAudio(control, audio) {
    control.classList.remove(this._pauseClass);
    audio.play();
  }
  _pauseAudio(control, audio) {
    control.classList.add(this._pauseClass);
    audio.pause();
  }
}
