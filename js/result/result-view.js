import LogoView from '../view-common/logo-view';
import AbstractView from '../abstract-view';

export default class ResultView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
    this._logoTemplate = new LogoView().template;
  }

  get template() {
    return `
      <section class="main main--result">
        ${this._logoTemplate}
        <h2 class="title">${this.result.title}</h2>
        <div class="main-stat">${this.result.state}</div>
        ${this.result.comparison ? `<span class="main-comparison">${this.result.comparison}</span>` : ``}
        <span role="button" tabindex="0" class="main-replay">${this.result.button}</span>
      </section>
    `;
  }

  onButtonClick() {
  }

  bind(element) {
    const buttonReplay = element.querySelector(`.main-replay`);
    buttonReplay.addEventListener(`click`, () => this.onButtonClick());
  }
}
