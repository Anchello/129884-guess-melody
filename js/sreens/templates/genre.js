import headerElement from './header';
import questions from "../../data/questions";

const question = questions.levelGenre;
export default (gameOptions) => {
  return `
    <section class="main main--level main--level-genre">
    ${headerElement(gameOptions)}
    <div class="main-wrap">
      <h2 class="title">${question.title}</h2>
      <form class="genre">
      ${question.answers.map((it, index) =>`
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${it.audio}"></audio>
              <button class="player-control player-control--pause" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${it.artist}" id="a-${index}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`).join(` `)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>
  `;
};
