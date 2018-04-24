import {getUpdatedGame} from '../utils';
import ArtistView from './artist-view';
import {switchScreen} from '../game-common/switch-screen';
import questions from '../data/questions';

export default (dataGame) => {
  const artistScreen = new ArtistView(dataGame);
  artistScreen.onAnswer = (userAnswer) => {
    const updatedDataGame = getUpdatedGame(dataGame, questions.levelArtist.answers, [userAnswer.value]);
    switchScreen(updatedDataGame);
    artistScreen.reset();
  };
  return artistScreen;
};
