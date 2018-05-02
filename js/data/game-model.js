import {GAME_INITIAL, GameOptions} from './initial-options';
import questions from './questions';
import Timer from '../timer/timer';

class GameModel {
  constructor() {
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

  getCurrentQuestion() {
    return questions[this._state.level - 1];
  }

  isGameOver() {
    return this._state.level > GameOptions.MAX_LEVELS || this._state.notes === GameOptions.MAX_NOTES || this._state.remainingTime <= 0;
  }

  tick() {
    const tick = this._timer.tick();
    this._updateState({remainingTime: this._timer.time});
    return tick;
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
   * @return {array}
   */
  getCurrentRightAnswers() {
    return this.getCurrentQuestion().answers
        .filter((answer) => answer.isCorrect)
        .map((it) => it.artist);
  }

  /**
   * @param {object} newState
   * @private
   */
  _updateState(newState) {
    this._state = Object.assign({}, this._state, newState);
  }
}

export default GameModel;
