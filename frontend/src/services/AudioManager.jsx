import typeSfx from "../assets/audio/Type.ogg";
import deleteSfx from "../assets/audio/Delete.ogg";
import hoverSfx from "../assets/audio/Hover.wav";
import clickSfx from "../assets/audio/Click.wav";
import errorSfx from "../assets/audio/Error.wav";
import eatSfx from "../assets/audio/Eat.wav";
import timerSfx from "../assets/audio/Timer.wav";
import goSfx from "../assets/audio/Go.wav";
import collisionSfx from "../assets/audio/Collision.wav";
import timeOutSfx from "../assets/audio/TimeOut.wav";
import swapSfx from "../assets/audio/Swap.wav";
import freezeSfx from "../assets/audio/Freeze.wav";
import cutTailSfx from "../assets/audio/CutTail.wav";
import music from "../assets/audio/MusicEdited.ogg";

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
    audio.play().catch(() => {});
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
      this.music.play().catch(() => {});
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
