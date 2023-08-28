import {
  EXERCISE_LISTEN,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_TRUE_FALSE,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_READ,
  EXERCISE_CLOZE,
  EXERCISE_WRITE_STORY,
  EXERCISE_CHUNK_STORY,
  EXERCISE_RECORD_RETELL_STORY,
  MODE_REVIEW_QUESTION,
  MODE_VIEW_ANSWERS,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
} from 'common/src/constants';

function moveBackward() {
  const { exerciseIndex, questionIndex, mode } = this.state
  const currentExerciseID = this.getCurrentExerciseID()
  if (exerciseIndex === 0 && questionIndex === 0)
    return;

  // if (mode === MODE_REVIEW_QUESTION || mode === MODE_VIEW_ANSWERS)
  // if (mode === MODE_REVIEW_QUESTION)
  //   this.setState({ exerciseIndex: exerciseIndex - 1, questionIndex: 0 })

  switch (currentExerciseID) {
    case EXERCISE_LISTEN:
    case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
    case EXERCISE_READ:
    case EXERCISE_CLOZE:
    case EXERCISE_WRITE_STORY:
    case EXERCISE_CHUNK_STORY:
    case EXERCISE_RECORD_RETELL_STORY:
      this.setState({ exerciseIndex: exerciseIndex - 1, questionIndex: 0 })
      break;
    case EXERCISE_FILL_THE_BLANK:
    case EXERCISE_FILL_THE_GAPS:
    case EXERCISE_MATCH_AUDIO_DESCRIPTION:
    case EXERCISE_MATCH_VISUAL_DESCRIPTION:
    case EXERCISE_TRUE_FALSE:
    case EXERCISE_SHORT_ANSWER:
    case EXERCISE_LONG_ANSWER:
      if (questionIndex - 1 >= 0)
        this.setState({ questionIndex: questionIndex - 1 })
      else
        this.setState({ exerciseIndex: exerciseIndex - 1, questionIndex: 0 })
      break;
    default:
      if (exerciseIndex > 0)
        this.setState({ exerciseIndex: exerciseIndex - 1, questionIndex: 0 })
      break;
  }
}

export default moveBackward;