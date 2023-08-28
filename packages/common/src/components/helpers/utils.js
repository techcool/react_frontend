export const durationTime = (time) => {
  if (!time) return null;
  let min = time / 60;
  let sec = time % 60;
  return `${parseInt(min)}:${sec.toFixed(0)} Minutes`;
};
