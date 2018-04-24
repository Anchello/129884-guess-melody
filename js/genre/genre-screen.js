import {getUpdatedGame} from '../utils';
import GenreView from './genre-view';
import {switchScreen} from '../game-common/switch-screen';
import questions from '../data/questions';

export default (dataGame) => {
  const genreScreen = new GenreView(dataGame);
  genreScreen.onAnswer = (userAnswers) => {
    const updatedDataGame = getUpdatedGame(dataGame, questions.levelGenre.answers, userAnswers);
    switchScreen(updatedDataGame);
    genreScreen.reset();
  };

  return genreScreen;
};
