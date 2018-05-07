import {GAME_INITIAL, GameOptions} from '../data/data-options';
import ResultView from './result-view';
import Application from '../application';

const DeclensionNumbers = {
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20
};

const DeclensionWords = {
  MINS: [`минуту`, `минуты`, `минут`],
  SECS: [`секунду`, `секунды`, `секунд`],
  POINTS: [`балл`, `балла`, `баллов`],
  FAST_ANSWERS: [`быстрый`, `быстрых`, `быстрых`],
  ERRORS: [`ошибку`, `ошибки`, `ошибок`],
  PLAYERS: [`игрока`, `игроков`, `игроков`]
};

const NumberWords = {
  ONE: 0,
  FEW: 1,
  MORE: 2
};

/**
 * @param {number} number
 * @param {Array} words
 * @return {string}
 */
const getDeclensionWords = (number, words) => {
  const isNumberMoreTwenty = number > DeclensionNumbers.TWENTY;
  const isNumberRemainderTen = number % DeclensionNumbers.TEN;
  const isFewNumbers = number > DeclensionNumbers.ONE && number < DeclensionNumbers.FIVE ||
    isNumberRemainderTen > DeclensionNumbers.ONE && isNumberRemainderTen < DeclensionNumbers.FIVE && isNumberMoreTwenty;

  if (number === DeclensionNumbers.ONE || isNumberMoreTwenty && isNumberRemainderTen === DeclensionNumbers.ONE) {
    return `${number} ${words[NumberWords.ONE]}`;
  } else if (isFewNumbers) {
    return `${number} ${words[NumberWords.FEW]}`;
  } else {
    return `${number} ${words[NumberWords.MORE]}`;
  }
};

class ResultScreen {
  /**
   * @param {Object} model
   */
  constructor(model) {
    this.model = model;
    this._state = this.model.state;
    this._resultScreen = null;
    this._gameResult = {};
    this.statistics = [];
  }

  get element() {
    const result = this._getResult();
    this._resultScreen = new ResultView(result);
    this._resultScreen.onButtonClick = () => Application.showGameScreen();
    return this._resultScreen.element;
  }

  setStatistics(statistics) {
    this.statistics = statistics.map((it) => it.points);
  }

  /**
   * @param {Array} dataResult
   * @param {number} remainingNotes
   * @return {number}
   */
  countPoints(dataResult, remainingNotes) {
    if (!Array.isArray(dataResult)) {
      throw new Error(`DataResult should be of Array`);
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

  setGameResult() {
    const remainingNotes = GameOptions.MAX_NOTES - this._state.notes;
    this._gameResult = {
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

  updatePoints() {
    this.setGameResult(this._state);
    this.model.updatePoints(this._gameResult.points);
  }

  _getResult() {
    const resultText = ResultScreen.outputGameResult(this.statistics, this._gameResult);
    if (this._gameResult.remainingNotes === 0 || this._gameResult.points < 0) {
      return {
        title: `Какая жалость!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
    } else if (this._gameResult.remainingTime === 0) {
      return {
        title: `Увы и ах!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
    } else if (this._gameResult.points > 0) {
      const timeResult = this._getTimeResult();
      const gameErrors = GameOptions.MAX_NOTES - this._gameResult.remainingNotes;
      return {
        title: `Вы настоящий меломан!`,
        state: `За ${getDeclensionWords(timeResult.mins, DeclensionWords.MINS)} и ${getDeclensionWords(timeResult.secs, DeclensionWords.SECS)}
        <br>вы набрали ${getDeclensionWords(this._gameResult.points, DeclensionWords.POINTS)} (${getDeclensionWords(this._correctFastAnswers, DeclensionWords.FAST_ANSWERS)})
        <br>совершив  ${getDeclensionWords(gameErrors, DeclensionWords.ERRORS)}`,
        comparison: resultText,
        button: `Сыграть ещё раз`
      };
    } else {
      throw new Error(`Unknown result: ${this._gameResult}`);
    }
  }

  /**
   * @param {Array} statistics
   * @param {Object} gameResult
   * @return {string}
   */
  static outputGameResult(statistics, gameResult) {
    if (!Array.isArray(statistics)) {
      throw new Error(`Statistics should be of Array`);
    }
    if (typeof gameResult !== `object` || gameResult === null) {
      throw new Error(`GameResult should be of type Object and not null`);
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
    const sortedStatistics = statistics.sort((a, b) => b - a);
    const place = sortedStatistics.indexOf(currentPoints) + 1;
    const countPlayers = sortedStatistics.length;
    const percentagePlayersBelow = Math.round((countPlayers - place) / countPlayers * 100);
    return `Вы заняли ${place} место из ${getDeclensionWords(countPlayers, DeclensionWords.PLAYERS)}. Это лучше, чем у ${percentagePlayersBelow}% игроков`;
  }
}

export default ResultScreen;


