import {
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_TRUE_FALSE,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
} from 'common/src/constants';

function getCurrentQuestions() {
  let currentExercise = this.getCurrentExercise()
  let currentExerciseID = this.getCurrentExerciseID()
  switch (currentExerciseID) {
    case EXERCISE_FILL_THE_BLANK:
    case EXERCISE_FILL_THE_GAPS:
    case EXERCISE_MATCH_AUDIO_DESCRIPTION:
    case EXERCISE_MATCH_VISUAL_DESCRIPTION:
    case EXERCISE_TRUE_FALSE:
    case EXERCISE_SHORT_ANSWER:
    case EXERCISE_LONG_ANSWER:
      return currentExercise.questions;
    default:
      return;
  }
}

export default getCurrentQuestions