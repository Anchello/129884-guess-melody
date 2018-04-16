import {getElementFromTemplate, showScreenElement} from '../utils';
import screenStart from './start';
import resultTemplate from './templates/result';
import {GAME_OPTIONS} from '../game/count-points';

export default (gameOptions, dataResult, statistics = []) => {
  const remainingNotes = GAME_OPTIONS.maxNotes - gameOptions.notes;
  const results = resultTemplate(statistics, dataResult, remainingNotes, gameOptions.remainingTimes);
  const screenResult = getElementFromTemplate(`
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${results.title}</h2>
    <div class="main-stat">${results.state}</div>
    ${results.comparison ? `<span class="main-comparison">${results.comparison}</span>` : ``}
    <span role="button" tabindex="0" class="main-replay">${results.button}</span>
  </section>
`);
  const buttonReplay = screenResult.querySelector(`.main-replay`);
  buttonReplay.addEventListener(`click`, () => {
    showScreenElement(screenStart());
  });

  return screenResult;
};
