import {getElementFromTemplate, showScreenElement} from '../utils';
import getHeader from '../data-screens/header';
import screenResultWin from './win';
import screenResultTimeOver from './time-over';
import screenResultFail from './fail';

const screenGenre = getElementFromTemplate(`
  <section class="main main--level main--level-genre">
    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>
`);
const buttonsAnswerWrapper = screenGenre.querySelector(`.genre`);
const buttonSubmitAnswer = screenGenre.querySelector(`.genre-answer-send`);
const results = [screenResultWin, screenResultTimeOver, screenResultFail];
const getRandomResult = () => results[Math.floor(Math.random() * results.length)];
const currentForm = screenGenre.querySelector(`form`);

buttonSubmitAnswer.disabled = true;

buttonsAnswerWrapper.addEventListener(`click`, (evt) => {
  if (evt.target.name === `answer`) {
    const buttonsAnswerActive = buttonsAnswerWrapper.querySelectorAll(`[name="answer"]:checked`);
    buttonSubmitAnswer.disabled = !buttonsAnswerActive.length;
  }
});

buttonSubmitAnswer.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  currentForm.reset();
  buttonSubmitAnswer.disabled = true;
  showScreenElement(getRandomResult());
});

export default screenGenre;
