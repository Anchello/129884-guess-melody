import {GAME_INITIAL, GameOptions} from './initial-options';
import questions from './questions';

class GameModel {
  constructor() {
    this._state = null;
  }

  get state() {
    return this._state;
  }

  init() {
    this._state = GAME_INITIAL;
  }

  getCurrentQuestion() {
    return questions[this._state.level - 1];
  }

  isGameOver() {
    return this._state.level > GameOptions.MAX_LEVELS || this._state.notes === GameOptions.MAX_NOTES || this._state.remainingTimes <= 0;
  }

  getCurrentAnswers() {
    return this.getCurrentQuestion().answers;
  }

  /**
   * Обновление результатов и параметров игры
   * @param {Array} answers - все предлагаемые ответы
   * @param {Array} userAnswers - ответ от игрока
   */
  getUpdatedGame(answers, userAnswers) {
    const TIME_ANSWER = 29;
    const isCorrectAnswers = this._compareArrays(this._getRightAnswers(answers), userAnswers);
    const updatedLevel = this._state.level + 1;
    const updatedTimes = this._state.remainingTimes - TIME_ANSWER;
    const updatedDataResult = this._state.dataResult.concat({
      answer: isCorrectAnswers,
      time: TIME_ANSWER
    });
    const updatedNotes = isCorrectAnswers ? this._state.notes : this._state.notes + 1;
    this._state = Object.assign({}, this._state, {
      level: updatedLevel,
      notes: updatedNotes,
      remainingTimes: updatedTimes,
      dataResult: updatedDataResult
    });
  }
  /**
   * Сравнение массивов
   * @param {array} array1 - первый массив
   * @param {array} array2 - второй массив
   * @return {boolean}
   */
  _compareArrays(array1, array2) {
    return array1.length === array2.length && array1.every((it) => array2.includes(it));
  }
  /**
   * Получение правильных ответов из массива данных
   * @param {array} answers - все предлагаемые ответы
   * @return {array}
   */
  _getRightAnswers(answers) {
    return answers
        .filter((answer) => answer.isCorrect)
        .map((it) => it.artist);
  }
}

export default GameModel;
