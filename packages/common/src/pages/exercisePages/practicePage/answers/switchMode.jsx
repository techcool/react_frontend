import { fetchPracticeExercises } from 'common/src/old-api/videosActions';
import {
  MODE_NORMAL,
  MODE_REVIEW_QUESTION,
  MODE_VIEW_ANSWERS,
} from 'common/src/constants'

async function switchMode(nextMode) {
  const { mode: current_mode } = this.state

  if (current_mode === MODE_VIEW_ANSWERS && nextMode === MODE_REVIEW_QUESTION)
    return

  switch (nextMode) {
    case MODE_NORMAL:
      await this.resetProgress();
      break;
    case MODE_REVIEW_QUESTION:
      await this.evaluateAnswers();
      break;
    case MODE_VIEW_ANSWERS:
      await this.submitAnswers();
      break;
    default:
      break;
  }

  const { accessToken, role } = this.props
  const { video_id } = this.props.match.params
  const exercises = await fetchPracticeExercises({ accessToken, role, video_id })
  this.setState({ exercises })

  this.setState(
    {
      exerciseIndex: 0,
      questionIndex: 0,
    }
  )

}
export default switchMode;