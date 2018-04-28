import StartScreen from './start/start-screen';
import GameScreen from './game/game-screen';
import ResultScreen from './result/result-screen';
import GameModel from './data/game-model';

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
    const start = new StartScreen();
    showScreenElement(start.element);
  }

  static showGameScreen() {
    const gameScreen = new GameScreen(new GameModel());
    gameScreen.init();
    showScreenElement(gameScreen.element);
  }

  static showResult(model) {
    const resultScreen = new ResultScreen(model);
    showScreenElement(resultScreen.element);
  }
}
