import StartScreen from './start/start-screen';
import GameScreen from './game/game-screen';
import ResultScreen from './result/result-screen';
import GameModel from './data/game-model';
import LoaderView from './loader/loader-view';
import Loader from './loader/loader';
import ErrorView from './error/error-view';

/**
 * @param {Element} screenElement
 */
const showScreenElement = (screenElement) => {
  const mainSection = document.querySelector(`section.main`);
  while (mainSection.firstChild) {
    mainSection.removeChild(mainSection.firstChild);
  }
  mainSection.appendChild(screenElement);
};

let questions;

export default class Application {
  static start() {
    const preloader = new LoaderView();
    showScreenElement(preloader.element);
    Loader.loadData().
        then(Application.showStartScreen).
        catch(Application.showError);
  }
  static showStartScreen(data) {
    questions = data;
    const start = new StartScreen();
    showScreenElement(start.element);
  }

  static showGameScreen() {
    const gameScreen = new GameScreen(new GameModel(questions));
    gameScreen.init();
    showScreenElement(gameScreen.element);
  }

  static showResult(model) {
    const resultScreen = new ResultScreen(model);
    showScreenElement(resultScreen.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    showScreenElement(errorView.element);
  }
}
