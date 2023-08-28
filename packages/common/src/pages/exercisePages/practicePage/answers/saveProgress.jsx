import { saveProgress } from "common/src/old-api/progressActions";
import { EXERCISE_RECORD_RETELL_STORY } from "common/src/constants";

const SaveProgress = async function () {
  const { accessToken, role } = this.props;
  const { studentAnswers, id: activityID, activityType } = this.state;
  const currentExerciseID = this.getCurrentExerciseID();
  if (currentExerciseID === EXERCISE_RECORD_RETELL_STORY) {
    const payload = {};
    if (studentAnswers[currentExerciseID]["completed"] !== undefined)
      Object.assign(payload, {
        completed: studentAnswers[currentExerciseID]["completed"],
      });
    if (
      studentAnswers[currentExerciseID][0] !== undefined &&
      typeof studentAnswers[currentExerciseID][0] !== "string"
    ) {
      const arrayBuffer = await studentAnswers[
        currentExerciseID
      ][0].arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      Object.assign(payload, { 0: buffer });
    }

    await saveProgress({
      accessToken,
      role,
      activityID,
      activityType,
      studentAnswers: {
        [currentExerciseID]: payload,
      },
    });
  } else
    await saveProgress({
      accessToken,
      role,
      activityID,
      activityType,
      studentAnswers: {
        [currentExerciseID]: studentAnswers[currentExerciseID],
      },
    });
};

export default SaveProgress;
