import AbstractView from '../abstract-view';
import LogoView from '../header/logo-view';

const Start = {
  TITLE: `Правила игры`,
  TEXT: `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br> Ошибиться можно 3 раза.<br> Удачи!`,
  BUTTON: `Начать игру`
};

export default class StartView extends AbstractView {
  constructor() {
    super();
    this._logoTemplate = new LogoView().template;
  }

  get template() {
    return `
    <section class="main main--welcome">
      ${this._logoTemplate}
      <button class="main-play">${Start.BUTTON}</button>
      <h2 class="title main-title">${Start.TITLE}</h2>
      <p class="text main-text">${Start.TEXT}</p>
    </section>
  `;
  }

  onButtonClick() {
  }

  bind(element) {
    const buttonPlay = element.querySelector(`.main-play`);
    buttonPlay.addEventListener(`click`, () => this.onButtonClick());
  }
}
