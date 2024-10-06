import typeSfx from "../assets/audio/Type.ogg";
import deleteSfx from "../assets/audio/Delete.ogg";
import hoverSfx from "../assets/audio/Hover.wav";
import clickSfx from "../assets/audio/Click.wav";
import errorSfx from "../assets/audio/Error.wav";
import eatSfx from "../assets/audio/Eat.wav";

class AudioManager {
  constructor() {
    this.typeVolume = 0.15;
    this.deleteVolume = 0.15;
    this.hoverVolume = 0.1;
    this.clickVolume = 1;
    this.errorVolume = 0.15;
    this.eatVolume = 0.15;
    this.isMuted = false;
    // this.music = new Audio("/path-to-background-music.mp3");
    this.music = null;
    this.sfx = {
      //eat: new Audio("/path-to-eat-sfx.mp3"),
      //collision: new Audio("/path-to-collision-sfx.mp3"),
      // Add other SFX here
    };

    //this.music.loop = true; // Ensure the background music loops
    this.loadMuteState(); // Check localStorage for mute state
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
    if (this.isMuted) {
      //this.music.pause();
      Object.values(this.sfx).forEach((sound) => sound.pause());
    } else {
      //this.music.play(); // Resume music if unmuted
    }
  }

  playSound(soundFile, volume) {
    const audio = new Audio(soundFile);
    audio.volume = this.isMuted ? 0 : volume;
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
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
    this.playSound(eatSfxSfx, this.eatVolume);
  }

  playMusic() {
    if (!this.isMuted) {
      //this.music.play();
    }
  }

  // playSFX = (audioFile) => {
  //   const audio = new Audio(audioFile); // Create a new Audio instance
  //   audio.volume =
  //     localStorage.getItem("mute") === "true"
  //       ? 0
  //       : localStorage.getItem("volume") || 1; // Check mute state
  //   audio.currentTime = 0; // Reset to start
  //   audio.play().catch((error) => {
  //     console.error("Audio playback failed:", error); // Handle playback errors
  //   });
  // };

  stopMusic() {
    //this.music.pause();
    //this.music.currentTime = 0; // Reset the music track
  }
}

const audioManager = new AudioManager();
export default audioManager;
