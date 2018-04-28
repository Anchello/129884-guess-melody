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
   * @return {{points: number, remainingNotes: number, remainingTimes: number}}
   */
  getGameResult() {
    const remainingNotes = GameOptions.MAX_NOTES - this._state.notes;
    const dataResult = this._state.dataResult;
    return {
      points: countPoints(dataResult, remainingNotes),
      remainingNotes,
      remainingTimes: this._state.remainingTimes
    };
  }
  /**
   * Получение результата времени отдельно в минутах и секундах
   * @return {{mins: number, secs: number}}
   */
  getTimeResult() {
    const timeSeconds = GAME_INITIAL.remainingTimes - this._gameResult.remainingTimes;
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
    } else if (this._gameResult.remainingTimes === 0) {
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


