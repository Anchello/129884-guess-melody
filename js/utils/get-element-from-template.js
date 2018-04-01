const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};

export default getElementFromTemplate;
