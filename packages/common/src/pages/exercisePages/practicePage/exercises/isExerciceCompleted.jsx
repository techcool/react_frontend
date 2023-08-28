function isExerciceCompleted(exerciceID) {
  // if(exerciceID===0)
  // return true
  const { studentAnswers } = this.state;
  if ((studentAnswers[exerciceID]) && studentAnswers[exerciceID]['completed'] === true)
    return true
  return false
}

export default isExerciceCompleted;