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
 * Получение DOM-элемента из строки разметки
 * @param {Element} screenElement
 */
const showScreenElement = (screenElement) => {
  const mainSection = document.querySelector(`section.main`);
  while (mainSection.firstChild) {
    mainSection.removeChild(mainSection.firstChild);
  }
  mainSection.appendChild(screenElement);
};

export {getElementFromTemplate, showScreenElement};
