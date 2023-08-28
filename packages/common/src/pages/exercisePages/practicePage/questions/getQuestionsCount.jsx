function getQuestionsCount() {
  const exercise = this.getCurrentExercise();
  return exercise.questions.length;
}

export default getQuestionsCount;