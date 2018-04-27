import ArtistView from './../artist/artist-view';
import GenreView from './../genre/genre-view';
import Application from '../application';

class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
  }

  get element() {
    console.log(this.model.state);
    const currentQuestion = this.model.getCurrentQuestion();
    switch (currentQuestion.type) {
      case `artist`:
        this._levelScreen = new ArtistView(this.model.state, currentQuestion);
        break;
      case `genre`:
        this._levelScreen = new GenreView(this.model.state, currentQuestion);
        break;
    }
    return this._levelScreen.element;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  init() {
    this._changeLevel();

    this._interval = setInterval(() => {
      // this.model.tick();
    }, 1000);
  }

  restart(continueGame) {
    if (!continueGame) {
      this.model.restart();
    }
    this.startGame();
  }

  exit() {
    Application.showResult(this.model);
  }

  _changeLevel() {
    this._levelScreen.onAnswer = this._answerHandler.bind(this);
  }

  _answerHandler(userAnswers) {
    this.stopGame();
    this.model.updateLevel();
    // this.model.getUpdatedGame(this.model.getCurrentAnswers(), userAnswers);
    this._levelScreen.reset();
    Application.showGameScreen();
  }

  // endGame(win, canContinue) {
  //   gameOver.onExit = this.exit.bind(this);
  //
  //   this.changeContentView(gameOver);
  //   this.updateHeader();
  // }
}


export default GameScreen;
