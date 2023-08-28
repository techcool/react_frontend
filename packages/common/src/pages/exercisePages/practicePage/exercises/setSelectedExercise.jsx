function setSelectedExercise({ exerciseIndex }) {
  this.setState({
    exerciseIndex,
    questionIndex: 0,
  })
}
export default setSelectedExercise;