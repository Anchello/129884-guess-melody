{
  const template = document.querySelector(`#templates`);
  const templateContent = `content` in template ? template.content : template;
  const templateList = templateContent.cloneNode(true).querySelectorAll(`.main`);
  const templatesArr = Array.from(templateList);
  let indexScreen = 0;

  /**
   * Показывает экран
   * @param {number} index - номер экрана
   */
  function showScreen(index) {
    const currentTemplate = templatesArr[index];
    const mainSection = document.querySelector(`section.main`);
    mainSection.innerHTML = ``;
    mainSection.appendChild(currentTemplate);
  }

  /**
   * Обработчик нажатия на клавиши
   * @param {KeyboardEvent} evt
   */
  function onKeyDown(evt) {
    if (evt.altKey && evt.keyCode === 39 && indexScreen < templatesArr.length - 1) {
      evt.preventDefault();
      indexScreen++;

    } else if (evt.altKey && evt.keyCode === 37 && indexScreen > 0) {
      evt.preventDefault();
      indexScreen--;
    }

    showScreen(indexScreen);
  }

  document.addEventListener(`keydown`, onKeyDown);

  showScreen(indexScreen);
}
