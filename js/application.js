import StartScreen from './start/start-screen';
import GameScreen from './game-common/game-screen';
// import ResultScreen from './result/result-screen';
import GameModel from './game-common/game-model';

const mainSection = document.querySelector(`section.main`);
/**
 * Показывание нового экрана
 * @param {Element} screenElement
 */
const showScreenElement = (screenElement) => {
  while (mainSection.firstChild) {
    mainSection.removeChild(mainSection.firstChild);
  }
  mainSection.appendChild(screenElement);
};

export default class Application {
  static showStartScreen() {
    const start = new StartScreen(new GameModel());
    showScreenElement(start.element);
  }

  static showGameScreen() {
    const gameScreen = new GameScreen(new GameModel());
    showScreenElement(gameScreen.element);
    gameScreen.init();
  }

  // static showResult(model) {
  //   const resultScreen = new ResultScreen(model);
  //   showScreenElement(resultScreen.element);
  // }
}
