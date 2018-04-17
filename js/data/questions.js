import dataAudio from './audio';

const getRandomAudio = () => dataAudio[Math.floor(Math.random() * dataAudio.length)];

const audioLevelArtist = getRandomAudio();
const audioLevelGenre = getRandomAudio();
const randomAudio = getRandomAudio();
const randomAudio2 = getRandomAudio();
const randomAudio3 = getRandomAudio();

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
        preview: randomAudio.image,
        artist: randomAudio.artist,
        isCorrect: false
      },
      {
        preview: randomAudio2.image,
        artist: randomAudio2.artist,
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
        audio: randomAudio.src,
        artist: randomAudio.artist,
        isCorrect: true
      },
      {
        audio: randomAudio2.src,
        artist: randomAudio2.artist,
        isCorrect: false
      },
      {
        audio: randomAudio3.src,
        artist: randomAudio3.artist,
        isCorrect: false
      }
    ]
  }
};

export default questions;
