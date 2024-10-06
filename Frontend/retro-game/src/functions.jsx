import audioManager from "./services/AudioManager";

export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  // Pad with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const handleInputChange = (e, setInput, prevValueRef) => {
  const currentValue = e.target.value;

  if (currentValue.length > prevValueRef.current.length) {
    audioManager.playTypeSound();
  } else if (currentValue.length < prevValueRef.current.length) {
    audioManager.playDeleteSound();
  }

  prevValueRef.current = currentValue;
  setInput(currentValue);
};

export const handleMouseEnter = () => {
  audioManager.playHoverSound();
};

export const handleMouseClick = () => {
  audioManager.playClickSound();
};

export const handleError = (setError, message) => {
  setError(message);
  audioManager.playErrorSound();
};
