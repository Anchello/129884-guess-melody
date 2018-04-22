import startScreen from './start/start-screen';
import {showScreenElement, getInitialDataGame} from './utils';

const dataGame = getInitialDataGame();
showScreenElement(startScreen(dataGame).element);
