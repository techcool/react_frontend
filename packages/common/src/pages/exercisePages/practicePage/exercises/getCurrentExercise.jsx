function getCurrentExercise() {
  const { exercises,exerciseIndex } = this.state;
  return exercises[exerciseIndex];
}
export default getCurrentExercise;