import {GAME_INITIAL, GameOptions} from './data-options';
import Timer from '../timer/timer';

class GameModel {
  /**
   * @param {Array} questions
   */
  constructor(questions) {
    this.questions = questions;
    this._state = null;
    this._timer = null;
  }

  get state() {
    return this._state;
  }

  init() {
    this._state = GAME_INITIAL;
    this._timer = new Timer(this._state.remainingTime);
  }

  tick() {
    const tick = this._timer.tick();
    this._updateState({remainingTime: this._timer.time});
    return tick;
  }

  getCurrentQuestion() {
    return this.questions[this._state.level - 1];
  }

  getCurrentRightAnswers() {
    const answersIndex = [];
    this.getCurrentQuestion().answers.forEach((answer, index) => {
      if (answer.isCorrect) {
        answersIndex.push(index);
      }
    });
    return answersIndex;
  }

  isGameOver() {
    return this._state.level > GameOptions.MAX_LEVELS || this._state.notes === GameOptions.MAX_NOTES || this._state.remainingTime <= 0;
  }

  updateLevel() {
    const updatedLevel = this._state.level + 1;
    this._updateState({level: updatedLevel});
  }

  updateNotes() {
    const updatedNotes = this._state.notes + 1;
    this._updateState({notes: updatedNotes});
  }

  /**
   * @param {boolean} answer
   * @param {number} time
   */
  updateDataResult(answer, time) {
    const updatedDataResult = this._state.dataResult.concat({answer, time});
    this._updateState({dataResult: updatedDataResult});
  }

  /**
   * @param {number} points
   */
  updatePoints(points) {
    this._updateState({points});
  }

  /**
   * @param {Object} newState
   * @private
   */
  _updateState(newState) {
    this._state = Object.assign({}, this._state, newState);
  }
}

export default GameModel;
