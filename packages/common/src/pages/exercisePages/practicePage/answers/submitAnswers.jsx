import { submitProgress } from "common/src/old-api/progressActions"

const submitAnswers = async function () {
  const { accessToken, role } = this.props
  const { id: activityID, activityType } = this.state
  await submitProgress({ accessToken, role, activityID, activityType })
  await this.fetchProgress()
}

export default submitAnswers;
