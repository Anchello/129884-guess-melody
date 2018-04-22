import {getElementFromTemplate, getInitialDataGame} from '../utils';
import {switchScreen} from '../game-common/switch-screen';
import resultTemplate from './template';
import {headerLogo} from '../header/header-logo';

export default (dataGame) => {
  let statistics = [];
  const results = resultTemplate(statistics, dataGame);
  const screenResult = getElementFromTemplate(`
  <section class="main main--result">
    ${headerLogo}
    <h2 class="title">${results.title}</h2>
    <div class="main-stat">${results.state}</div>
    ${results.comparison ? `<span class="main-comparison">${results.comparison}</span>` : ``}
    <span role="button" tabindex="0" class="main-replay">${results.button}</span>
  </section>
`);
  const buttonReplay = screenResult.querySelector(`.main-replay`);
  buttonReplay.addEventListener(`click`, () => switchScreen(getInitialDataGame()));

  return screenResult;
};
