function getExercisesIDs() {
  const { exercises } = this.state
  return exercises.map((exercise) => exercise.id)
}
export default getExercisesIDs;