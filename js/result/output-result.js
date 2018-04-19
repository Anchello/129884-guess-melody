/**
 * Вывод результата игрока
 * @param {array} statistics - результат игр других игроков по кол-ву баллов
 * @param {object} gameResult - содержит кол-во набранных баллов, кол-во оставшихся нот и кол-во оставшегося времени
 * @return {string}
 */
export const outputGameResult = (statistics, gameResult) => {
  if (!Array.isArray(statistics)) {
    throw new Error(`Statistics should be of array`);
  }
  if (typeof gameResult !== `object` || gameResult === null) {
    throw new Error(`GameResult should be of type object and not null`);
  }
  if (!(gameResult.hasOwnProperty(`points`)
      && gameResult.hasOwnProperty(`remainingNotes`)
      && gameResult.hasOwnProperty(`remainingTimes`))) {
    throw new Error(`GameResult should has properties 'points', 'remainingNotes' and 'remainingTimes'`);
  }
  if (gameResult.remainingNotes === 0 || gameResult.points < 0) {
    return `У вас закончились все попытки. <br> Ничего, повезёт в следующий раз!`;
  }
  if (gameResult.remainingTimes === 0) {
    return `Время вышло! <br> Вы не успели отгадать все мелодии`;
  }

  const currentPoints = gameResult.points;
  const newStatistics = [...statistics, currentPoints];
  newStatistics.sort((a, b) => b - a);

  const place = newStatistics.indexOf(currentPoints) + 1;
  const countPlayers = newStatistics.length;
  const percentagePlayersBelow = Math.round((countPlayers - place) / countPlayers * 100);
  return `Вы заняли ${place} место из ${countPlayers} игроков. Это лучше, чем у ${percentagePlayersBelow}% игроков`;
};
