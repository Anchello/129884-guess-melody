import headerElement from './header';
import questions from './../../data/questions';

const question = questions.levelArtist;
export default (gameOptions) => {
  return `
    <section class="main main--level main--level-artist">
      ${headerElement(gameOptions)}
      <div class="main-wrap">
        <h2 class="title main-title">${question.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${question.audio}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${question.answers.map((it, index) =>`
            <div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${it.artist}"/>
              <label class="main-answer" for="answer-${index}">
                <img class="main-answer-preview" src="${it.preview}"
                     alt="${it.artist}" width="134" height="134">
                ${it.artist}
              </label>
            </div>`).join(` `)}
        </form>
      </div>
    </section>
  `;
};
