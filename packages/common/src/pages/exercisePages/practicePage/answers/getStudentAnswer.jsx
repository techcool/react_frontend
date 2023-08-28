function getStudentAnswer({ exercise_id, question_id }) {
  const { studentAnswers } = this.state
  const currentExerciseID = (exercise_id !== undefined) ? exercise_id : this.getCurrentExerciseID();

  if (studentAnswers[currentExerciseID] === undefined)
    return

  const currentQuestionID = (question_id !== undefined) ? question_id : this.getCurrentQuestionID();

  if (studentAnswers[currentExerciseID][currentQuestionID] === undefined)
    return

  return studentAnswers[currentExerciseID][currentQuestionID];
}

export default getStudentAnswer;