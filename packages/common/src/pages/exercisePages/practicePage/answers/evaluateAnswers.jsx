import { evaluateProgress } from "common/src/old-api/progressActions";

const evaluateAnswers = async function () {
  const { accessToken, role } = this.props;
  const { id: activityID, activityType } = this.state;
  await evaluateProgress({ accessToken, role, activityID, activityType });
  await this.fetchProgress();
};

export default evaluateAnswers;
