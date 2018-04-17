import dataAudio from './audio';

const audioLevelArtist = dataAudio[0];
const audioLevelArtist2 = dataAudio[1];
const audioLevelArtist3 = dataAudio[2];
const audioLevelGenre = dataAudio[3];
const audioLevelGenre2 = dataAudio[4];

const questions = {
  levelArtist: {
    title: `Кто исполняет эту песню?`,
    audio: audioLevelArtist.src,
    answers: [
      {
        preview: audioLevelArtist.image,
        artist: audioLevelArtist.artist,
        isCorrect: true
      },
      {
        preview: audioLevelArtist2.image,
        artist: audioLevelArtist2.artist,
        isCorrect: false
      },
      {
        preview: audioLevelArtist3.image,
        artist: audioLevelArtist3.artist,
        isCorrect: false
      }
    ]
  },
  levelGenre: {
    title: `Выберите r&b треки`,
    answers: [
      {
        audio: audioLevelGenre.src,
        artist: audioLevelGenre.artist,
        isCorrect: true
      },
      {
        audio: audioLevelGenre2.src,
        artist: audioLevelGenre2.artist,
        isCorrect: true
      },
      {
        audio: audioLevelArtist.src,
        artist: audioLevelArtist.artist,
        isCorrect: false
      },
      {
        audio: audioLevelArtist2.src,
        artist: audioLevelArtist2.artist,
        isCorrect: false
      }
    ]
  }
};

export default questions;
