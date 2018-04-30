import {outputGameResult} from './output-result';
import {countPoints} from './count-points';
import {GAME_INITIAL, GameOptions} from '../data/initial-options';
import ResultView from './result-view';
import Application from '../application';

class ResultScreen {
  constructor(model) {
    this.model = model;
    this._state = this.model.state;
    this._resultScreen = null;
  }

  get element() {
    const result = this.getResult();
    this._resultScreen = new ResultView(result);
    this._resultScreen.onButtonClick = () => Application.showGameScreen();
    return this._resultScreen.element;
  }

  /**
   * Получение результата игры в виде объекта содержащего кол-во очков, оставшихся нот и оставшегося времени
   * @return {{points: number, remainingNotes: number, remainingTime: number}}
   */
  getGameResult() {
    const remainingNotes = GameOptions.MAX_NOTES - this._state.notes;
    return {
      points: countPoints(this._state.dataResult, remainingNotes),
      remainingNotes,
      remainingTime: this._state.remainingTime
    };
  }
  /**
   * Получение результата времени отдельно в минутах и секундах
   * @return {{mins: number, secs: number}}
   */
  getTimeResult() {
    const timeSeconds = GAME_INITIAL.remainingTime - this._gameResult.remainingTime;
    const SECS_IN_ONE_MIN = 60;
    return {
      mins: Math.trunc(timeSeconds / SECS_IN_ONE_MIN),
      secs: timeSeconds % SECS_IN_ONE_MIN
    };
  }
  /**
   * Получение результата в виде объекта, который содержит данные для вывода на экран
   * @return {object}
   */
  getResult() {
    let statistics = [];
    this._gameResult = this.getGameResult(this._state);
    const resultText = outputGameResult(statistics, this._gameResult);
    let result;
    if (this._gameResult.remainingNotes === 0 || this._gameResult.points < 0) {
      result = {
        title: `Какая жалость!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
    } else if (this._gameResult.remainingTime === 0) {
      result = {
        title: `Увы и ах!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
    } else if (this._gameResult.points > 0) {
      const timeResult = this.getTimeResult();
      result = {
        title: `Вы настоящий меломан!`,
        state: `За ${timeResult.mins} минуты и ${timeResult.secs} секунд
        <br>вы набрали ${this._gameResult.points} баллов (8 быстрых)
        <br>совершив ${GameOptions.MAX_NOTES - this._gameResult.remainingNotes} ошибки`,
        comparison: resultText,
        button: `Сыграть ещё раз`
      };
    } else {
      throw new Error(`Unknown result: ${this._gameResult}`);
    }
    return result;
  }
}

export default ResultScreen;


