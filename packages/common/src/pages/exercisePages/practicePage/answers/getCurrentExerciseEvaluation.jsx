function getCurrentExerciseEvaluation() {
  const { evaluation } = this.state;
  let currentExerciseID = this.getCurrentExerciseID();
  return evaluation[currentExerciseID];
}
export default getCurrentExerciseEvaluation;