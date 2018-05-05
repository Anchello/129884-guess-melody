import AbstractView from '../abstract-view';

export default class ErrorView extends AbstractView {

  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <section class="main main--error">
        <h2 class="title main-title">Произошла ошибка: ${this.error.message}</h2>
      </section>`;
  }

}
