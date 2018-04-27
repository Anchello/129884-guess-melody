import StartView from './start-view';
import Application from '../application';

class StartScreen {
  constructor(model) {
    this._startScreen = new StartView();
    this._startScreen.onButtonClick = () => {
      model.restart();
      Application.showGameScreen();
    };
  }

  get element() {
    return this._startScreen.element;
  }
}
export default StartScreen;
