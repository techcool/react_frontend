import { fetchProgress } from "common/src/old-api/progressActions";
const FetchProgress = async function () {
  const { accessToken, role } = this.props;
  const { id: activityID, activityType } = this.state;
  const progress = await fetchProgress({
    accessToken,
    role,
    activityID,
    activityType,
  });
  const { studentAnswers, mode, evaluation, submissionsCount } = progress;
  this.setState({ studentAnswers, mode, evaluation, submissionsCount });
};
export default FetchProgress;
