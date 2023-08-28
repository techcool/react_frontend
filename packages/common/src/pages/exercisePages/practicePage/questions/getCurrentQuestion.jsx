import {
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
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
  EXERCISE_RECORD_RETELL_STORY,
} from 'common/src/constants';

function getCurrentQuestion() {
  const { questionIndex } = this.state
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
      return currentExercise.questions[questionIndex]
    case EXERCISE_READ:
      return currentExercise.text
    case EXERCISE_CLOZE:
      return currentExercise;
    case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
    case EXERCISE_WRITE_STORY:
    case EXERCISE_RECORD_RETELL_STORY:
      return {
        notes: currentExercise.notes,
        selected: currentExercise.selected,
        note: currentExercise.note
      }
    case EXERCISE_CHUNK_STORY:
      return currentExercise.phrases
  }
}

export default getCurrentQuestion;