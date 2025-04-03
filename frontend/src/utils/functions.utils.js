export function convertSecondsIntoMinutesAndSeconds(originalSeconds) {
  const minutes = originalSeconds >= 0 ? Math.floor(originalSeconds / 60) : Math.abs(Math.ceil(originalSeconds / 60));
  const seconds = Math.abs(originalSeconds % 60);

  console.log(originalSeconds, minutes, seconds);
  return { minutes, seconds };
}

export function convertMinutesAndSecondsIntoSeconds(originalMinutes, originalSeconds) {
  const seconds = originalMinutes * 60 + originalSeconds;

  return seconds;
}
