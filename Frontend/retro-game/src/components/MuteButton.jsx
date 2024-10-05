import React, { useState, useEffect } from "react";
import audioManager from "../services/AudioManager";
import soundOnIcon from "../assets/images/MuteIcon-On.png";
import soundOffIcon from "../assets/images/MuteIcon-Off.png";

export default function MuteButton() {
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);

  const toggleMute = () => {
    audioManager.toggleMute();
    setIsMuted(audioManager.isMuted); // Update the button state
  };

  return (
    <button
      onClick={toggleMute}
      className="pixel-art"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      <img
        src={isMuted ? soundOffIcon : soundOnIcon} // Switch images based on the mute state
        alt={isMuted ? "Sound off" : "Sound on"}
        style={{ width: "50px", height: "50px" }} // Adjust the size of the button as needed
      />
    </button>
  );
}
