import axios from "common/src/api/axios";
import { API as api } from "./config";
// const api = "/api";
const fetchProgress = async ({
  activityID,
  activityType,
  class_id,
}) => {
  const url = `progress`;
  try {
    const response = await axios({
      method: "GET",
      url,
      params: { activityID, activityType, class_id },
    });
    return response.data;
  } catch (err) {
    return {};
  }
};

const saveProgress = async ({
  activityID,
  activityType,
  studentAnswers,
}) => {
  const url = `progress`;
  try {
    await axios({
      method: "POST",
      url,
      data: { activityID, activityType, studentAnswers },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const evaluateProgress = async ({
  activityID,
  activityType,
}) => {
  const url = `progress/evaluate`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { activityID, activityType },
    });
    return true;
  } catch (err) {
    return false;
  }
};
const submitProgress = async ({
  activityID,
  activityType,
}) => {
  const url = `progress/submit`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { activityID, activityType },
    });
    return true;
  } catch (err) {
    return false;
  }
};
const resetProgress = async ({
  activityID,
  activityType,
}) => {
  const url = `progress/reset`;
  try {
    const reponse = await axios({
      method: "POST",
      url,
      data: { activityID, activityType },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const fetchStudentProgress = async ({
  student_id,
  postwork_id,
}) => {
  const url = `progress/${postwork_id}/students/${student_id}/`;
  try {
    const response = await axios({
      method: "GET",
      url,
    });
    if (response.status === 200) return response.data;
    else return null;
  } catch (err) {
    return {};
  }
};

const fetchStudentPracticeProgress = async ({
  student_id,
  video_id,
}) => {
  const url = `students/${student_id}/progress/${video_id}`;
  try {
    const response = await axios({
      method: "GET",
      url,
    });
    if (response.status === 200) return response.data;
    else return null;
  } catch (err) {
    return {};
  }
};

const updateStudentProgressEvaluation = async ({
  postwork_id,
  student_id,
  evaluation,
}) => {
  const url = `progress/${postwork_id}/students/${student_id}/review`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { evaluation },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const updateStudentProgressEvaluationNote = async ({
  postwork_id,
  student_id,
  note,
}) => {
  const url = `progress/${postwork_id}/students/${student_id}/note`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { note },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const getStudentProgressEvaluationNote = async ({
  postwork_id,
  student_id,
}) => {
  const url = `progress/${postwork_id}/students/${student_id}/note`;
  try {
    const response = await axios({
      method: "GET",
      url,
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

export {
  saveProgress,
  fetchProgress,
  evaluateProgress,
  submitProgress,
  resetProgress,
  fetchStudentProgress,
  fetchStudentPracticeProgress,
  updateStudentProgressEvaluation,
  updateStudentProgressEvaluationNote,
  getStudentProgressEvaluationNote,
};
