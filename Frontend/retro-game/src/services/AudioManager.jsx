const typeSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Type.ogg`);
const deleteSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Delete.ogg`);
const hoverSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Hover.wav`);
const clickSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Click.wav`);
const errorSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Error.wav`);
const eatSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Eat.wav`);
const timerSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Timer.wav`);
const goSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Go.wav`);
const collisionSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Collision.wav`);
const timeOutSfx = new Audio(`${process.env.PUBLIC_URL}/audio/TimeOut.wav`);
const swapSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Swap.wav`);
const freezeSfx = new Audio(`${process.env.PUBLIC_URL}/audio/Freeze.wav`);
const cutTailSfx = new Audio(`${process.env.PUBLIC_URL}/audio/CutTail.wav`);
const music = new Audio(`${process.env.PUBLIC_URL}/audio/MusicEdited.ogg`);

class AudioManager {
  constructor() {
    this.typeVolume = 0.16;
    this.deleteVolume = 0.16;
    this.hoverVolume = 0.11;
    this.clickVolume = 1;
    this.errorVolume = 0.16;
    this.eatVolume = 0.15;
    this.timerVolume = 0.22;
    this.goVolume = 0.35;
    this.collisionVolume = 0.35;
    this.timeOutVolume = 0.35;
    this.swapVolume = 0.35;
    this.freezeVolume = 1;
    this.cutTailVolume = 0.5;

    this.isMuted = false;
    this.isGameMusicPlaying = false;

    this.musicVolume = 0.35;
    this.music = new Audio(music);
    this.music.loop = true;
    this.music.volume = this.musicVolume;

    this.loadMuteState();
  }

  loadMuteState() {
    const savedMuteState = localStorage.getItem("isMuted");
    this.isMuted = savedMuteState ? JSON.parse(savedMuteState) : false;
    this.updateMuteState();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("isMuted", JSON.stringify(this.isMuted));
    this.updateMuteState();
  }

  updateMuteState() {
    this.music.volume = this.isMuted ? 0 : this.musicVolume;
  }

  playSound(soundFile, volume) {
    const audio = new Audio(soundFile);
    audio.volume = this.isMuted ? 0 : volume;
    audio.currentTime = 0;
    audio.play();
  }

  playTypeSound() {
    this.playSound(typeSfx, this.typeVolume);
  }

  playDeleteSound() {
    this.playSound(deleteSfx, this.deleteVolume);
  }

  playHoverSound() {
    this.playSound(hoverSfx, this.hoverVolume);
  }

  playClickSound() {
    this.playSound(clickSfx, this.clickVolume);
  }

  playErrorSound() {
    this.playSound(errorSfx, this.errorVolume);
  }

  playEatSound() {
    this.playSound(eatSfx, this.eatVolume);
  }

  playTimerSound() {
    this.playSound(timerSfx, this.timerVolume);
  }

  playGoSound() {
    this.playSound(goSfx, this.goVolume);
  }

  playCollisionSound() {
    this.playSound(collisionSfx, this.collisionVolume);
  }

  playTimeOutSound() {
    this.playSound(timeOutSfx, this.timeOutVolume);
  }

  playSwapSound() {
    this.playSound(swapSfx, this.swapVolume);
  }

  playFreezeSound() {
    this.playSound(freezeSfx, this.freezeVolume);
  }

  playCutTailSound() {
    this.playSound(cutTailSfx, this.cutTailVolume);
  }

  playMusic() {
    if (!this.isGameMusicPlaying) {
      this.music.currentTime = 0;
      this.music.play();
      this.isGameMusicPlaying = true;
    }
  }

  stopMusic() {
    this.music.pause();
    this.isGameMusicPlaying = false;
  }
}

const audioManager = new AudioManager();
export default audioManager;
