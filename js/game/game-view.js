import AbstractView from '../abstract-view';

export default class GameView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="main main--level main--level-artist"></section>
  `;
  }
}
