import {GAME_INITIAL} from './initial-options';
// import {createTimer} from './timer';
import questions from './../data/questions';

class GameModel {
  constructor() {
    this.restart();
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = GAME_INITIAL;
  }

  getCurrentQuestion() {
    return questions[this._state.level];
  }

  isDead() {
  //   return this._state.lives <= 0;
  }

  getCurrentAnswers() {
    return this.getCurrentQuestion().answers;
  }

  updateLevel() {
    const level = this._state.level + 1;
    this._state = Object.assign({}, this._state, {
      level
    });
  }

  // tick() {
  //   this._state = createTimer.tick(this._state);
  // }
  /**
   * Обновление результатов и параметров игры
   * @param {Array} answers - все предлагаемые ответы
   * @param {Array} userAnswers - ответ от игрока
   */
  getUpdatedGame(answers, userAnswers) {
    const TIME_ANSWER = 29;
    const isCorrectAnswers = this._compareArrays(this._getRightAnswers(answers), userAnswers);
    const updatedLevel = this._state.level + 1;
    console.log(updatedLevel);
    const updatedTimes = this._state.remainingTimes - TIME_ANSWER;
    const updatedDataResult = this._state.dataResult.concat({
      answer: isCorrectAnswers,
      time: TIME_ANSWER
    });
    const updatedNotes = isCorrectAnswers ? this._state.notes : this._state.notes + 1;
    console.log(this._state);
    this._state = Object.assign({}, this._state, {
      level: updatedLevel,
      notes: updatedNotes,
      remainingTimes: updatedTimes,
      dataResult: updatedDataResult
    });
    console.log(this._state);
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
