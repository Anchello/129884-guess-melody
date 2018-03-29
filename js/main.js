const template = document.querySelector(`#templates`);
const templateContent = `content` in template ? template.content : template;
const templateList = templateContent.cloneNode(true).querySelectorAll(`.main`);
const templatesArr = Array.from(templateList);
const mainSection = document.querySelector(`section.main`);
let indexScreen = 0;

/**
 * Показывает экран
 * @param {number} index - номер экрана
 */
function showScreen(index) {
  const currentTemplate = templatesArr[index];
  mainSection.innerHTML = ``;
  mainSection.appendChild(currentTemplate);
}

/**
 * Обработчик нажатия на клавиши
 * @param {KeyboardEvent} evt
 */
function onKeyDown(evt) {
  if (evt.altKey && evt.key === `ArrowRight` && indexScreen < templatesArr.length - 1) {
    evt.preventDefault();
    indexScreen++;
  } else if (evt.altKey && evt.key === `ArrowLeft` && indexScreen > 0) {
    evt.preventDefault();
    indexScreen--;
  }

  showScreen(indexScreen);
}

document.addEventListener(`keydown`, onKeyDown);

showScreen(indexScreen);
