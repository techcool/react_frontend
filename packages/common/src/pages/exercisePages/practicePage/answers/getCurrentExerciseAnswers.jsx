import {
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_TRUE_FALSE,
  EXERCISE_CLOZE,
  EXERCISE_CHUNK_STORY,
} from "common/src/constants"

const getCurrentExerciseAnswers = function () {
  const exerciseID = this.getCurrentExerciseID()
  const exercise = this.getCurrentExercise();

  switch (exerciseID) {
    case EXERCISE_FILL_THE_BLANK:
    case EXERCISE_FILL_THE_GAPS:
    case EXERCISE_MATCH_AUDIO_DESCRIPTION:
    case EXERCISE_MATCH_VISUAL_DESCRIPTION:
    case EXERCISE_TRUE_FALSE:
      return exercise.questions.map((question) => question.rightAnswer)
    case EXERCISE_CLOZE:
    case EXERCISE_CHUNK_STORY:
      return exercise.rightOrder;
    default:
      return;
  }
}

export default getCurrentExerciseAnswers;