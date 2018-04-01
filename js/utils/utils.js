const getElementFromTemplate = (wrapperString) => {
  const wrapper = document.createElement(`template`);
  wrapper.innerHTML = wrapperString;
  return wrapper.content;
};

const showScreen = (screenElement) => {
  const mainSection = document.querySelector(`section.main`);
  mainSection.innerHTML = ``;
  mainSection.appendChild(screenElement);
};

export {getElementFromTemplate, showScreen};
