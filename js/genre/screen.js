import {getElementFromTemplate, getUpdatedGame} from '../utils';
import genreTemplate from './template';
import {switchScreen} from '../game-common/switch-screen';
import questions from '../data/questions';

export default (dataGame) => {
  const screenGenre = getElementFromTemplate(genreTemplate(dataGame));
  const buttonsAnswerWrapper = screenGenre.querySelector(`.genre`);
  const buttonSubmitAnswer = screenGenre.querySelector(`.genre-answer-send`);
  const currentForm = screenGenre.querySelector(`form`);
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
    const updatedDataGame = getUpdatedGame(dataGame, questions.levelGenre.answers, currentAnswers);
    switchScreen(updatedDataGame);
    currentForm.reset();
    buttonSubmitAnswer.disabled = true;
  });

  return screenGenre;
};
