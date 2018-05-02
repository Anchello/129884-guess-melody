import ArtistView from './artist-view';
import GenreView from './genre-view';
import GameView from './game-view';
import TimerView from '../timer/timer-view';
import NotesView from './notes-view';
import Application from '../application';
import {QuestionType} from '../data/initial-options';

class GameScreen {
  constructor(model) {
    this.model = model;
    this.gameScreen = new GameView();
    this._gameContent = null;
    this._remainingTimes = [];
  }
  get element() {
    this.timerView = new TimerView(this.model.state);
    this.notesView = new NotesView(this.model.state);
    this.gameContent = this.getGameContent();
    this.gameScreen.element.appendChild(this.timerView.element);
    this.gameScreen.element.appendChild(this.notesView.element);
    this.gameScreen.element.appendChild(this.gameContent.element);
    return this.gameScreen.element;
  }

  init() {
    this.model.init();
    this._remainingTimes.push(this.model.state.remainingTime);
    this.startTimerGame();
  }

  startTimerGame() {
    this._interval = setInterval(() => {
      const tick = this.model.tick();
      this.updateTimer();
      if (!tick) {
        this.stopTimerGame();
        Application.showResult(this.model);
      }
    }, 1000);
  }


  stopTimerGame() {
    clearInterval(this._interval);
  }

  getGameContent() {
    const currentQuestion = this.model.getCurrentQuestion();
    switch (currentQuestion.type) {
      case QuestionType.ARTIST:
        this._gameContent = new ArtistView(currentQuestion);
        break;
      case QuestionType.GENRE:
        this._gameContent = new GenreView(currentQuestion);
        break;
      default:
        throw new Error(`Unknown result: ${currentQuestion.type}`);
    }
    this._gameContent.onAnswer = this._answerHandler.bind(this);
    return this._gameContent;
  }

  _answerHandler(userAnswers) {
    this.stopTimerGame();
    this.gameContent.reset();
    const isCorrectAnswers = this._compareArrays(this.model.getCurrentRightAnswers(), userAnswers);
    this.model.updateLevel();
    const answerTime = this._getTimeAnswer(this.model.state.remainingTime);
    this._remainingTimes.push(this.model.state.remainingTime);
    this.model.updateDataResult(isCorrectAnswers, answerTime);
    if (!isCorrectAnswers) {
      this.model.updateNotes();
      this.updateNotes();
    }
    if (this.model.isGameOver()) {
      Application.showResult(this.model);
      return;
    }
    this.updateContentView(this.getGameContent());
    this.startTimerGame();
  }


  updateTimer() {
    const updatedTimer = new TimerView(this.model.state);
    this.gameScreen.element.replaceChild(updatedTimer.element, this.timerView.element);
    this.timerView = updatedTimer;
  }


  updateNotes() {
    const updatedNotes = new NotesView(this.model.state);
    this.gameScreen.element.replaceChild(updatedNotes.element, this.notesView.element);
    this.notesView = updatedNotes;
  }

  updateContentView(updatedContent) {
    this.gameScreen.element.replaceChild(updatedContent.element, this.gameContent.element);
    this.gameContent = updatedContent;
  }

  /**
   * @param {number} remainingTime
   * @return {number}
   */
  _getTimeAnswer(remainingTime) {
    return this._remainingTimes[this._remainingTimes.length - 1] - remainingTime;
  }
  /**
   * @param {array} array1
   * @param {array} array2
   * @return {boolean}
   */
  _compareArrays(array1, array2) {
    return array1.length === array2.length && array1.every((it) => array2.includes(it));
  }
}

export default GameScreen;
