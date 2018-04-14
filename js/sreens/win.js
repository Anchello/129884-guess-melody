import {getElementFromTemplate, showScreenElement} from '../utils';
import screenStart from './start';
import getResult from '../data-screens/win';

const screenResultWin = getElementFromTemplate(`
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">${getResult(data)}</div>
    <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`);
const buttonReplay = screenResultWin.querySelector(`.main-replay`);

buttonReplay.addEventListener(`click`, () => showScreenElement(screenStart));

export default screenResultWin;
