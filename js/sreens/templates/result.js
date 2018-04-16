import {outputGameResult} from '../../game/output-result';
import {INITIAL_GAME, GAME_OPTIONS, countPoints} from '../../game/count-points';

export default (statistics, dataResult, remainingNotes, remainingTimes) => {
  const gameResult = {
    points: countPoints(dataResult, remainingNotes),
    remainingNotes,
    remainingTimes
  };
  const resultText = outputGameResult(statistics, gameResult);
  let resultTemplate;
  switch (true) {
    case (gameResult.remainingNotes === 0 || gameResult.points < 0):
      resultTemplate = {
        title: `Какая жалость!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
      break;
    case gameResult.remainingTimes === 0:
      resultTemplate = {
        title: `Увы и ах!`,
        state: resultText,
        button: `Попробовать ещё раз`
      };
      break;
    case gameResult.points > 0:
      const timeSeconds = INITIAL_GAME.remainingTimes - gameResult.remainingTimes;
      const SECS_IN_ONE_MIN = 60;
      const timeREsult = {
        mins: Math.trunc(timeSeconds / SECS_IN_ONE_MIN),
        secs: timeSeconds % SECS_IN_ONE_MIN
      };
      resultTemplate = {
        title: `Вы настоящий меломан!`,
        state: `За ${timeREsult.mins} минуты и ${timeREsult.secs} секунд
          <br>вы набрали ${gameResult.points} баллов (8 быстрых)
          <br>совершив ${GAME_OPTIONS.maxNotes - gameResult.remainingNotes} ошибки`,
        comparison: resultText,
        button: `Сыграть ещё раз`
      };
      break;
  }
  return resultTemplate;
};


