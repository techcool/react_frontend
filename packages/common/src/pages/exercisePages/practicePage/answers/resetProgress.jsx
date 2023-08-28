import { resetProgress } from "common/src/old-api/progressActions"

const ResetProgress =async function () {
  const { accessToken, role } = this.props
  const { id: activityID,activityType } = this.state
  await resetProgress({ accessToken, role, activityID, activityType })
  await this.fetchProgress()
}

export default ResetProgress;