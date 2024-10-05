class AudioManager {
  constructor() {
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

  playMusic() {
    if (!this.isMuted) {
      //this.music.play();
    }
  }

  playSFX(sfxName) {
    if (!this.isMuted && this.sfx[sfxName]) {
      this.sfx[sfxName].currentTime = 0; // Reset SFX playback
      this.sfx[sfxName].play();
    }
  }

  stopMusic() {
    //this.music.pause();
    //this.music.currentTime = 0; // Reset the music track
  }
}

const audioManager = new AudioManager();
export default audioManager;
