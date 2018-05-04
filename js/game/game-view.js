import AbstractView from '../abstract-view';

export default class GameView extends AbstractView {
  constructor() {
    super();
    this._playPromise = null;
    this._pauseClass = null;
    this._playClass = null;
  }

  /**
   * @param {element} control
   * @param {element} audio
   * @param {string} pauseClass
   * @param {string} playClass
   */
  _onPlayerControlClick(control, audio, pauseClass, playClass) {
    const currentControl = control;
    const currentAudio = audio;
    currentControl.disabled = true;
    this._pauseClass = pauseClass;
    this._playClass = playClass;
    const method = currentControl.classList.contains(this._pauseClass) ? `_playAudio` : `_pauseAudio`;
    this[method](currentControl, currentAudio);
  }

  /**
   * @param {element} control
   * @param {element} audio
   */
  _playAudio(control, audio) {
    this._playPromise = audio.play();
    this._playPromise.then(() => {
      control.disabled = false;
      control.classList.remove(this._pauseClass);
      control.classList.add(this._playClass);
    })
        .catch(() => {
          audio.pause();
        });
  }

  /**
   * @param {element} control
   * @param {element} audio
   */
  _pauseAudio(control, audio) {
    this._playPromise.then(() => {
      audio.pause();
      control.disabled = false;
      control.classList.add(this._pauseClass);
      control.classList.remove(this._playClass);
    })
        .catch(() => {
          audio.pause();
        });
  }
}
