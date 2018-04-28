import AbstractView from '../abstract-view';

export default class LogoView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
  }
}
