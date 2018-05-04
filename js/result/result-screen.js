import {GAME_INITIAL, GameOptions} from '../data/initial-options';
import ResultView from './result-view';
import Application from '../application';

class ResultScreen {
  /**
   * @param {object} model
   */
  constructor(model, statistics) {
    this.model = model;
    this._state = this.model.state;
    this._resultScreen = null;
    this._statistics = statistics;
  }

  get element() {
    const result = this._getResult();
    this._resultScreen = new ResultView(result);
    this._resultScreen.onButtonClick = () => Application.showGameScreen();
    return this._resultScreen.element;
  }

  /**
   * @param {Array} dataResult
   * @param {Number} remainingNotes
   * @return {Number}
   */
  countPoints(dataResult, remainingNotes) {
    if (!Array.isArray(dataResult)) {
      throw new Error(`DataResult should be of array`);
    }
    if (typeof remainingNotes !== `number`) {
      throw new TypeError(`RemainingNotes should be of type number`);
    }
    if (remainingNotes < 0) {
      throw new Error(`RemainingNotes should not be negative value`);
    }
    if (dataResult.length < GameOptions.MAX_LEVELS || remainingNotes === 0) {
      return -1;
    }

    let points = 0;
    this._correctFastAnswers = 0;
    dataResult.forEach((result) => {
      const {answer, time} = result;
      if (answer) {
        points += GameOptions.CORRECT_POINT;
        if (time < GameOptions.TIME_LIMIT) {
          points += GameOptions.FAST_POINT;
          this._correctFastAnswers++;
        }
      } else {
        points += GameOptions.INCORRECT_POINT;
      }
    });
    return points;
  }

  _getGameResult() {
    const remainingNotes = GameOptions.MAX_NOTES - this._state.notes;
    return {
      points: this.countPoints(this._state.dataResult, remainingNotes),
      remainingNotes,
      remainingTime: this._state.remainingTime
    };
  }

  _getTimeResult() {
    const timeSeconds = GAME_INITIAL.remainingTime - this._gameResult.remainingTime;
    const SECS_IN_ONE_MIN = 60;
    return {
      mins: Math.trunc(timeSeconds / SECS_IN_ONE_MIN),
      secs: timeSeconds % SECS_IN_ONE_MIN
    };
  }

  _getResult() {
    this._gameResult = this._getGameResult(this._state);
    const resultText = ResultScreen.outputGameResult(this._statistics, this._gameResult);
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
      const timeResult = this._getTimeResult();
      result = {
        title: `Вы настоящий меломан!`,
        state: `За ${timeResult.mins} минуты и ${timeResult.secs} секунд
        <br>вы набрали ${this._gameResult.points} баллов (${this._correctFastAnswers} быстрых)
        <br>совершив ${GameOptions.MAX_NOTES - this._gameResult.remainingNotes} ошибки`,
        comparison: resultText,
        button: `Сыграть ещё раз`
      };
    } else {
      throw new Error(`Unknown result: ${this._gameResult}`);
    }
    return result;
  }

  /**
   * @param {array} statistics
   * @param {object} gameResult
   * @return {string}
   */
  static outputGameResult(statistics, gameResult) {
    if (!Array.isArray(statistics)) {
      throw new Error(`Statistics should be of array`);
    }
    if (typeof gameResult !== `object` || gameResult === null) {
      throw new Error(`GameResult should be of type object and not null`);
    }
    if (!(gameResult.hasOwnProperty(`points`)
      && gameResult.hasOwnProperty(`remainingNotes`)
      && gameResult.hasOwnProperty(`remainingTime`))) {
      throw new Error(`GameResult should has properties 'points', 'remainingNotes' and 'remainingTime'`);
    }
    if (gameResult.remainingTime === 0) {
      return `Время вышло! <br> Вы не успели отгадать все мелодии`;
    }
    if (gameResult.remainingNotes === 0) {
      return `У вас закончились все попытки. <br> Ничего, повезёт в следующий раз!`;
    }

    const currentPoints = gameResult.points;
    const newStatistics = [...statistics, currentPoints];
    newStatistics.sort((a, b) => b - a);

    const place = newStatistics.indexOf(currentPoints) + 1;
    const countPlayers = newStatistics.length;
    const percentagePlayersBelow = Math.round((countPlayers - place) / countPlayers * 100);
    return `Вы заняли ${place} место из ${countPlayers} игроков. Это лучше, чем у ${percentagePlayersBelow}% игроков`;
  }
}

export default ResultScreen;


