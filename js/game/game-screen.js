import ArtistView from './artist-view';
import GenreView from './genre-view';
import GameView from './game-view';
import HeaderView from './header-view';
import Application from '../application';

class GameScreen {
  constructor(model) {
    this.model = model;
    this._gameContent = null;
    this.gameScreen = new GameView();
  }

  get element() {
    this.headerView = new HeaderView(this.model.state);
    this.gameContent = this.getGameContent();
    this.gameScreen.element.appendChild(this.headerView.element);
    this.gameScreen.element.appendChild(this.gameContent.element);
    return this.gameScreen.element;
  }

  init() {
    this.model.init();
  }

  getGameContent() {
    const currentQuestion = this.model.getCurrentQuestion();
    switch (currentQuestion.type) {
      case `artist`:
        this._gameContent = new ArtistView(currentQuestion);
        break;
      case `genre`:
        this._gameContent = new GenreView(currentQuestion);
        break;
      default:
        throw new Error(`Unknown result: ${currentQuestion.type}`);
    }
    this._gameContent.onAnswer = this._answerHandler.bind(this);
    return this._gameContent;
  }

  updateHeader() {
    const updatedHeader = new HeaderView(this.model.state);
    this.gameScreen.element.replaceChild(updatedHeader.element, this.headerView.element);
    this.headerView = updatedHeader;
  }

  _answerHandler(userAnswers) {
    this.gameContent.reset();
    this.model.getUpdatedGame(this.model.getCurrentAnswers(), userAnswers);
    if (this.model.isGameOver()) {
      Application.showResult(this.model);
      return;
    }
    this.updateHeader();
    this.updateContentView(this.getGameContent());
  }

  updateContentView(updatedContent) {
    this.gameScreen.element.replaceChild(updatedContent.element, this.gameContent.element);
    this.gameContent = updatedContent;
  }
}

export default GameScreen;
