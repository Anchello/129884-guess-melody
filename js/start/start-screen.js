import StartView from './start-view';
import Application from '../application';

class StartScreen {
  constructor() {
    this._startScreen = new StartView();
    this._startScreen.onButtonClick = () => {
      Application.showGameScreen();
    };
  }

  get element() {
    return this._startScreen.element;
  }
}
export default StartScreen;
