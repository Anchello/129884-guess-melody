const template = document.querySelector(`#templates`);
const templateContent = `content` in template ? template.content : template;
const templateList = templateContent.cloneNode(true).querySelectorAll(`.main`);
const templatesArr = Array.from(templateList);
const mainSection = document.querySelector(`section.main`);
const KeyCode = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};
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
  if (evt.altKey && evt.keyCode === KeyCode.ARROW_RIGHT && indexScreen < templatesArr.length - 1) {
    indexScreen++;

  } else if (evt.altKey && evt.keyCode === KeyCode.ARROW_LEFT && indexScreen > 0) {
    indexScreen--;
  } else {
    return;
  }

  evt.preventDefault();
  showScreen(indexScreen);
}

document.addEventListener(`keydown`, onKeyDown);

showScreen(indexScreen);
