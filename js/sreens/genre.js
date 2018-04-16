import {getElementFromTemplate, showScreenElement, updateGameLevel} from '../utils';
import genreTemplate from './templates/genre';
import screenArtist from './artist';
import screenResult from './result';
import {isGameOver} from '../game/count-points';

export default (gameOptions, dataResult) => {
  const screenGenre = getElementFromTemplate(genreTemplate(gameOptions));
  const buttonsAnswerWrapper = screenGenre.querySelector(`.genre`);
  const buttonSubmitAnswer = screenGenre.querySelector(`.genre-answer-send`);
  const currentForm = screenGenre.querySelector(`form`);
  const correctAnswers = [`answer-2`, `answer-3`]; // для примера
  let buttonsAnswerActive;
  buttonSubmitAnswer.disabled = true;
  buttonsAnswerWrapper.addEventListener(`click`, (evt) => {
    if (evt.target.name === `answer`) {
      buttonsAnswerActive = buttonsAnswerWrapper.querySelectorAll(`[name="answer"]:checked`);
      buttonSubmitAnswer.disabled = !buttonsAnswerActive.length;
    }
  });

  buttonSubmitAnswer.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const currentAnswers = Array.from(buttonsAnswerActive).map((it) => it.value);
    updateGameLevel(gameOptions, dataResult, correctAnswers, currentAnswers);
    const screen = isGameOver(gameOptions) ? screenResult : screenArtist;
    showScreenElement(screen(gameOptions, dataResult));
    currentForm.reset();
    buttonSubmitAnswer.disabled = true;
  });

  return screenGenre;
};
