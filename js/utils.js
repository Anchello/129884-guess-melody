import {GAME_INITIAL} from './game-common/initial-options';

/**
 * Получение DOM-элемента из строки разметки
 * @param {String} templateString
 * @return {Element} - DOM-элемент
 */
const getElementFromTemplate = (templateString) => {
  const template = document.createElement(`template`);
  template.innerHTML = templateString.trim();
  return template.content.firstChild;
};

/**
 * Показывание нового экрана
 * @param {Element} screenElement
 */
const showScreenElement = (screenElement) => {
  const mainSection = document.querySelector(`section.main`);
  while (mainSection.firstChild) {
    mainSection.removeChild(mainSection.firstChild);
  }
  mainSection.appendChild(screenElement);
};

/**
 * Обновление данных результата
 * @param {Array} dataResult - массив данных с резальтатом прошлых ответов
 * @param {boolean} isCorrectAnswer - ответ правильный или нет
 * @param {number} timeAnswer - время которое пошло на ответ
 * @return {Array}
 */
const getUpdatedDataResult = (dataResult, isCorrectAnswer, timeAnswer) => {
  return dataResult.concat({
    answer: isCorrectAnswer,
    time: timeAnswer
  });
};

/**
 * Обновление параметров игры (уровень и кол-во нот)
 * @param {object} dataGame - данные игры
 * @param {number} notes - кол-во нот
 * @param {number} timeAnswer - время которое пошло на ответ
 * @param {array} dataResult -  новый массив данных с резальтатом прошлых ответов
 * @return {object}
 */
const getUpdatedDataGame = (dataGame, notes, timeAnswer = 0, dataResult = []) => {
  const updatedLevel = dataGame.level + 1;
  const newTimes = dataGame.remainingTimes - timeAnswer;
  return Object.assign({}, dataGame, {
    level: updatedLevel,
    notes,
    remainingTimes: newTimes,
    dataResult,
  });
};
/**
 * Сравнение массивов
 * @param {array} array1 - первый массив
 * @param {array} array2 - второй массив
 * @return {boolean}
 */
const compareArrays = (array1, array2) => {
  return array1.length === array2.length && array1.every((it) => array2.includes(it));
};
/**
 * Получение правильных ответов из массива данных
 * @param {array} answers - все предлагаемые ответы
 * @return {array}
 */
const getRightAnswers = (answers) => {
  return answers
      .filter((answer) => answer.isCorrect)
      .map((it) => it.artist);
};
/**
 * Обновление результатов и параметров игры
 * @param {object} dataGame - данные игры
 * @param {Array} answers - все предлагаемые ответы
 * @param {Array} userAnswers - ответ от игрока
 * @return {object}
 */
const getUpdatedGame = (dataGame, answers, userAnswers) => {
  const TIME_ANSWER = 29;
  const isCorrectAnswers = compareArrays(getRightAnswers(answers), userAnswers);
  const updatedNotes = isCorrectAnswers ? dataGame.notes : dataGame.notes + 1;
  const updatedDataResult = getUpdatedDataResult(dataGame.dataResult, isCorrectAnswers, TIME_ANSWER);
  return getUpdatedDataGame(dataGame, updatedNotes, TIME_ANSWER, updatedDataResult);
};

/**
 * Получение начальных параметров игры
 * @return {object}
 */
const getInitialDataGame = () => {
  return Object.assign({}, GAME_INITIAL);
};

export {
  getElementFromTemplate,
  showScreenElement,
  getUpdatedDataGame,
  getUpdatedGame,
  getInitialDataGame
};
