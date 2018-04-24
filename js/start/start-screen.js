import {getUpdatedDataGame} from '../utils';
import {switchScreen} from '../game-common/switch-screen';
import StartView from './start-view';

export default (dataGame) => {
  const startScreen = new StartView();
  const updatedDataGame = getUpdatedDataGame(dataGame, dataGame.notes);
  startScreen.onButtonClick = () => switchScreen(updatedDataGame);
  return startScreen;
};
