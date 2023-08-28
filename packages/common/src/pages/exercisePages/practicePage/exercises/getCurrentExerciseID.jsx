function getCurrentExerciseID() {
  const currentExercise = this.getCurrentExercise()
  if (currentExercise === undefined) {
    return -1;
  }
  const { id } = currentExercise
  return id;
}

export default getCurrentExerciseID;