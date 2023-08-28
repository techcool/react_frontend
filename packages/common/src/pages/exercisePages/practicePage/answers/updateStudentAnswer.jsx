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
  MODE_VIEW_ANSWERS,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
} from 'common/src/constants';
import { showErrorMessages } from 'common/src/components/helpers/notifications';

function updateStudentAnswer({ answer, question_id, completed, save=true }) {
  let { studentAnswers, evaluation } = this.state;

  const { mode } = this.state
  if (mode === MODE_VIEW_ANSWERS)
    return
  if (evaluation && evaluation.reviewed) {
    showErrorMessages(["You answers are already reviewed."], "Activity")
    return
  }
  const currentExerciseID = this.getCurrentExerciseID()
  let currentQuestionID;
  if (studentAnswers[currentExerciseID] === undefined)
    studentAnswers[currentExerciseID] = {}

  switch (currentExerciseID) {
    case EXERCISE_LISTEN:
    case EXERCISE_READ:
      this.updateCompletion()
      break;
    case EXERCISE_FILL_THE_BLANK:
    case EXERCISE_FILL_THE_GAPS:
    case EXERCISE_MATCH_AUDIO_DESCRIPTION:
    case EXERCISE_MATCH_VISUAL_DESCRIPTION:
    case EXERCISE_TRUE_FALSE:
    case EXERCISE_SHORT_ANSWER:
    case EXERCISE_LONG_ANSWER:
      currentQuestionID = (question_id !== undefined) ? question_id : this.getCurrentQuestionID()
      studentAnswers[currentExerciseID][currentQuestionID] = answer
      this.updateCompletion()
      break;
    case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
    case EXERCISE_WRITE_STORY:
    case EXERCISE_CHUNK_STORY:
    case EXERCISE_CLOZE:
      if (answer !== undefined)
        studentAnswers[currentExerciseID][0] = answer
      if (completed !== undefined) {
        this.updateCompletion()
        //TODO move the next instruction to Redaction activities 
        if (studentAnswers[currentExerciseID][0] === undefined)
          studentAnswers[currentExerciseID][0] = ''
      }
      break;
    case EXERCISE_RECORD_RETELL_STORY:
      if (answer !== undefined)
        studentAnswers[currentExerciseID][0] = answer;
      if (completed === true)
        this.setState(
          { studentAnswers },
          () => {
            this.updateCompletion()
            this.saveProgress()
          }
        )
      break;
    default:
      break;
  }

  //TODO Find a way to limit the saveProgress calls in a period of time
  this.setState({ studentAnswers },
    () => {
      if (save && currentExerciseID !== EXERCISE_RECORD_RETELL_STORY)
        this.saveProgress()
    })
}

export default updateStudentAnswer