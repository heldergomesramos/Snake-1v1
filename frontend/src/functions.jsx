import audioManager from "./services/AudioManager";

export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

export const handleInputChange = (e, setInput, prevValueRef) => {
  const currentValue = e.target.value;
  const previousValue = String(prevValueRef.current ?? "");

  if (currentValue.length > previousValue.length) {
    audioManager.playTypeSound();
  } else if (currentValue.length < previousValue.length) {
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
