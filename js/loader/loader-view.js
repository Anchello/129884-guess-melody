import AbstractView from '../abstract-view';
import LogoView from '../view-common/logo-view';

export default class LoaderView extends AbstractView {
  constructor() {
    super();
    this._logoTemplate = new LogoView().template;
  }

  get template() {
    return `
    <section class="main">
      ${this._logoTemplate}
      <div class="preloader">
          <svg class="preloader-spinner" viewBox="0 0 60 60">
              <path d="M30,5c13.8,0,25,11.2,25,25S43.8,55,30,55S5,43.8,5,30" transform="matrix(-0.8763,0.4818,-0.4818,-0.8763,70.7418,41.8366)"></path>
          </svg>
      </div>
    </section>
  `;
  }
}
