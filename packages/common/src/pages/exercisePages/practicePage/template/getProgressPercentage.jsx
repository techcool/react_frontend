function getProgressPercentage() {
  const { exercises,studentAnswers } = this.state
  if (!exercises.length)
    return 0;
  let counter = 0;
  for (let ids in studentAnswers) {
    if (studentAnswers[ids]['completed'] === true)
      counter++
  }
  return counter * 100 / exercises.length
}

export default getProgressPercentage;