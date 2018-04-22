import screenStart from './start/start';
import {showScreenElement, getInitialDataGame} from './utils';

const dataGame = getInitialDataGame();
showScreenElement(screenStart(dataGame));
