const mainSection = document.querySelector(`section.main`);

const createElement = (child) => {
  mainSection.innerHTML = ``;
  mainSection.appendChild(child);
};

export default createElement;
