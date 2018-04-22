import {getElementFromTemplate, getUpdatedGame} from '../utils';
import artistTemplate from './template';
import {switchScreen} from '../game-common/switch-screen';
import questions from '../data/questions';

export default (dataGame) => {
  const screenArtist = getElementFromTemplate(artistTemplate(dataGame));
  const currentForm = screenArtist.querySelector(`form`);
  const currentAnswers = [];

  currentForm.addEventListener(`change`, (evt) => {
    const target = evt.target;
    if (target.classList.contains(`main-answer-r`)) {
      currentAnswers.push(target.value);
      const updatedDataGame = getUpdatedGame(dataGame, questions.levelArtist.answers, currentAnswers);
      switchScreen(updatedDataGame);
      currentForm.reset();
    }
  });
  return screenArtist;
};
