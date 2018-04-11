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

export {getElementFromTemplate, showScreenElement, getDataResult};
