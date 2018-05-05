import {QuestionType} from './data-options';

/**
 * @param {Object} level
 * @param {string} title
 * @return {Object}
 */
const preprocessGenreLevel = (level, title) => {
  const answers = level.answers.map((it) => ({
    audio: it.src,
    isCorrect: it.genre === level.genre
  }));
  return {
    type: level.type,
    title,
    answers
  };
};

/**
 * @param {Object} level
 * @param {string} title
 * @return {Object}
 */
const preprocessArtistLevel = (level, title) => {
  const audio = level.src;
  const answers = level.answers.map((it) => ({
    preview: {
      src: it.image.url,
      width: it.image.width,
      height: it.image.height
    },
    artist: it.title,
    isCorrect: it.isCorrect
  }));
  return {
    type: level.type,
    title,
    audio,
    answers
  };
};

/**
 * @param {Array} data
 * @return {Array}
 */
export const adaptServerData = (data) => {
  return data.map((level) => {
    const title = level.question;
    let adaptLevel;
    switch (level.type) {
      case QuestionType.ARTIST:
        adaptLevel = preprocessArtistLevel(level, title);
        break;
      case QuestionType.GENRE:
        adaptLevel = preprocessGenreLevel(level, title);
        break;
      default:
        throw new Error(`Unknown result: ${level.type}`);
    }
    return adaptLevel;
  });
};
