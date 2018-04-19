import {getElementFromTemplate, getUpdatedDataGame} from '../utils';
import {switchScreen} from '../game-common/switch-screen';
import {headerLogo} from '../header/header-logo';

export default (dataGame) => {
  const DATA_START = {
    title: `Правила игры`,
    text: `Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br> Ошибиться можно 3 раза.<br> Удачи!`,
    button: `Начать игру`
  };
  const screenStart = getElementFromTemplate(`
    <section class="main main--welcome">
      ${headerLogo}
      <button class="main-play">${DATA_START.button}</button>
      <h2 class="title main-title">${DATA_START.title}</h2>
      <p class="text main-text">${DATA_START.text}</p>
    </section>
  `);
  const buttonPlay = screenStart.querySelector(`.main-play`);
  const updatedDataGame = getUpdatedDataGame(dataGame, dataGame.notes);
  buttonPlay.addEventListener(`click`, () => switchScreen(updatedDataGame));
  return screenStart;
};
