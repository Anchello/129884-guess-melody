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
 * Получение массива данных с одинаковыми результатами
 * @param {Object} answers
 * @param {Number} lengthResult
 * @return {Array}
 */
const getDataResult = (answers, lengthResult) => {
  if (typeof lengthResult !== `number`) {
    throw new TypeError(`LengthResult should be of type number`);
  }
  if (typeof answers !== `object`) {
    throw new TypeError(`Answers should be of type object`);
  }
  const dataResult = [];
  for (let i = 0; i < lengthResult; i++) {
    dataResult.push(answers);
  }
  return dataResult;
};
/**
 * Обновление данных результата
 * @param {Array} dataResult - массив данных с резальтатом прошлых ответов
 * @param {boolean} isCorrectAnswer - ответ правильный или нет
 * @param {number} timeAnswer - время которое пошло на ответ
 */
const updateDataResult = (dataResult, isCorrectAnswer, timeAnswer) => {
  dataResult.push({
    answer: isCorrectAnswer,
    time: timeAnswer
  });
};

/**
 * Обновление параметров игры (уровень и кол-во нот)
 * @param {object} gameOptions - данные игры
 * @param {number} level - текущий уровень
 * @param {number} notes - кол-во нот
 * @param {number} timeAnswer - время которое пошло на ответ
 * @return {object}
 */
const updateGameOptions = (gameOptions, level, notes, timeAnswer) => {
  const newTimes = gameOptions.remainingTimes - timeAnswer;
  return Object.assign(gameOptions, {
    level,
    notes,
    remainingTimes: newTimes
  });
};
/**
 * Сравнение массивов
 * @param {array} array1 - первый массив
 * @param {array} array2 - второй массив
 * @return {boolean}
 */
const compareArrays = (array1, array2) => {
  return array1.length === array2.length && array1.every((item, index)=> item === array2[index]);
};
/**
 * Обновление результатов и параметров игры
 * @param {object} gameOptions - данные игры
 * @param {Array} dataResult - массив данных с резальтатом прошлых ответов
 * @param {string} correctAnswers - правильный ответ
 * @param {string} answers - ответ от игрока
 */
const updateGameLevel = (gameOptions, dataResult, correctAnswers, answers) => {
  const TIME_ANSWER = 40;
  const newLevel = gameOptions.level + 1;
  const isCorrectAnswers = compareArrays(correctAnswers, answers);
  const newNotes = isCorrectAnswers ? gameOptions.notes : gameOptions.notes + 1;
  updateDataResult(dataResult, isCorrectAnswers, TIME_ANSWER);
  updateGameOptions(gameOptions, newLevel, newNotes, TIME_ANSWER);
};

export {getElementFromTemplate, showScreenElement, getDataResult, updateDataResult, updateGameOptions, updateGameLevel};
