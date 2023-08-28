import {
  EXERCISE_LISTEN,
  EXERCISE_READ,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_WRITE_STORY,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_TRUE_FALSE,
  EXERCISE_CLOZE,
  EXERCISE_CHUNK_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
} from 'common/src/constants';

function updateCompletion() {
  const currentExerciseID = this.getCurrentExerciseID();
  let currentExercise = this.getCurrentExercise();
  let answeredQuestions;
  const { studentAnswers } = { ... this.state };

  if (studentAnswers[currentExerciseID] === undefined)
    return
  switch (currentExerciseID) {
    case EXERCISE_LISTEN:
    case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
    case EXERCISE_READ:
    case EXERCISE_CLOZE:
    case EXERCISE_CHUNK_STORY:
    case EXERCISE_WRITE_STORY:
    case EXERCISE_RECORD_RETELL_STORY:
      studentAnswers[currentExerciseID]['completed'] = !!!studentAnswers[currentExerciseID]['completed'];
      break;
    case EXERCISE_FILL_THE_BLANK:
    case EXERCISE_FILL_THE_GAPS:
    case EXERCISE_MATCH_AUDIO_DESCRIPTION:
    case EXERCISE_MATCH_VISUAL_DESCRIPTION:
    case EXERCISE_TRUE_FALSE:
    case EXERCISE_SHORT_ANSWER:
    case EXERCISE_LONG_ANSWER:
      answeredQuestions = Object.keys(studentAnswers[currentExerciseID]);
      if (
        currentExercise.questions.
          some(question => !answeredQuestions.includes(String(question.id)))
      )
        return
      studentAnswers[currentExerciseID]['completed'] = true;
      break;
    default:
      break;
  }
  this.setState({ studentAnswers })

}

export default updateCompletion