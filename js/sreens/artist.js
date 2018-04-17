import {getElementFromTemplate, updateGameLevel, showScreenElement} from '../utils';
import {isGameOver} from '../game/count-points';
import artistTemplate from './templates/artist';
import screenGenre from './genre';
import screenResult from './result';
import questions from './../data/questions';

export default (gameOptions, dataResult) => {
  const screenArtist = getElementFromTemplate(artistTemplate(gameOptions));
  const currentForm = screenArtist.querySelector(`form`);
  const currentAnswers = [];

  currentForm.addEventListener(`change`, (evt) => {
    const target = evt.target;
    if (target.classList.contains(`main-answer-r`)) {
      currentAnswers.push(target.value);
      updateGameLevel(gameOptions, dataResult, questions.levelArtist.answers, currentAnswers);
      const screen = isGameOver(gameOptions) ? screenResult : screenGenre;
      showScreenElement(screen(gameOptions, dataResult));
      currentForm.reset();
    }
  });
  return screenArtist;
};
