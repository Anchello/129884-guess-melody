/**
 * Получение DOM-элемента из строки разметки
 * @param {String} templateString
 * @return {Element} - DOM-элемент
 */
const getElementFromTemplate = (templateString) => {
  const template = document.createElement(`template`);
  template.innerHTML = templateString.trim();
  const templateContent = template.content;
  return templateContent.querySelector(`.main`).cloneNode(true);
};

/**
 * Получение DOM-элемента из строки разметки
 * @param {Element} screenElement
 */
const showScreenElement = (screenElement) => {
  const mainSection = document.querySelector(`section.main`);
  const screenElementOld = mainSection.querySelector(`.main`);
  if (screenElementOld) {
    mainSection.removeChild(screenElementOld);
  }
  mainSection.appendChild(screenElement);
};

export {getElementFromTemplate, showScreenElement};
