import axios from "common/src/api/axios";
// const api = "/api";

const fetchStudentPerformanceOnPracticeReport = async ({
  student_id
}) => {
  let url = `reports/practice/students/${student_id}`;

  try {
    let response = await axios.get(url, {
    });
    return response.data;
  } catch (err) {
    return { students: [] };
  }
};

const fetchStudentPerformanceOnAssignment = async ({
  class_id,
  student_id,
  params
}) => {
  let url = `reports/${class_id}/assignments/${student_id}`;

  try {
    let response = await axios.get(url, {
      params: params
    });
    return response.data;
  } catch (err) {
    return { students: [] };
  }
};
//api/teacher/students/:student_id/class_stats/:class_id
const fetchStudentPerformanceOnClass = async ({
  class_id,
  student_id,
  params
}) => {
  let url = `students/${student_id}/class_stats/${class_id}`;

  try {
    let response = await axios.get(url, {
      params: params
    });
    return response.data;
  } catch (err) {
    return { students: [] };
  }
};
/**
 * Assignment Status for progress chart on teacher section
 */
const fetchStudentPerformanceOnClassReport = async ({
  class_id,
  student_id
}) => {
  let url = `reports/classes/${class_id}/students/${student_id}`;

  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    return { students: [] };
  }
};

const fetchMyPerformanceOnPractice = async ({ }) => {
  let url = "reports/practice";
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {}
};

const fetchMyPerformanceOnClass = async ({  class_id }) => {
  let url = `reports/classes/${class_id}`;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {}
};

const fetchOverallPerformanceOnClass = async ({
  class_id
}) => {
  let url = `reports/classes/${class_id}`;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {}
};

const fetchUserTimeReport = async ({ account_id }) => {
  let url = `reports/accounts/${account_id}/timer`;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {}
};
const fetchUserPerformanceOnPractice = async ({
  account_id
}) => {
  let url = `reports/accounts/${account_id}/practice`;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    return { students: [] };
  }
};

const fetchUsersStatistics = async ({  }) => {
  let url = "reports/accounts/statistics";
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchRegistrationsReport = async ({ query }) => {
  let url = "reports/registrations";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchTimeReport = async ({  query }) => {
  let url = "reports/time";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchAssignmentsCreationReport = async ({ query }) => {
  let url = "reports/assignments_creation";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchAssignmentsCompletionReport = async ({
  query
}) => {
  let url = "reports/assignments_completion";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchPracticeReport = async ({  query }) => {
  let url = "reports/practice";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchLoginsReport = async ({ query }) => {
  let url = "reports/logins";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchWhoWasConnectedReport = async ({ query }) => {
  let url = "reports/who_was_disconnected";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchPerformancePerActivity = async ({ query }) => {
  let url = "reports/per_activity";
  try {
    const response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchCreatedClassesReport = async ({ query }) => {
  let url = "reports/created_classes";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchActivitiesReport = async ({ query }) => {
  const url = "reports/activities_report";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchVideosAssignmentsReport = async ({ query }) => {
  const url = "reports/videos_assignments_report";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchPaidSubscribersReport = async ({ query }) => {
  const url = "reports/paid_subscribers";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchHowDidTheyHearAboutUsReport = async ({
  query
}) => {
  const url = "reports/how_they_heard_about_us";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: query
    });
    return response.data;
  } catch (err) {
    return false;
  }
};
const fetchCount = async () => {
  const url = "accounts/dashboard";
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

export {
  fetchStudentPerformanceOnPracticeReport,
  fetchStudentPerformanceOnClassReport,
  fetchMyPerformanceOnPractice,
  fetchMyPerformanceOnClass,
  fetchOverallPerformanceOnClass,
  fetchUserTimeReport,
  fetchUserPerformanceOnPractice,
  fetchUsersStatistics,
  fetchRegistrationsReport,
  fetchTimeReport,
  fetchAssignmentsCreationReport,
  fetchAssignmentsCompletionReport,
  fetchLoginsReport,
  fetchPerformancePerActivity,
  fetchCreatedClassesReport,
  fetchPracticeReport,
  fetchWhoWasConnectedReport,
  fetchActivitiesReport,
  fetchVideosAssignmentsReport,
  fetchPaidSubscribersReport,
  fetchHowDidTheyHearAboutUsReport,
  fetchStudentPerformanceOnAssignment,
  fetchStudentPerformanceOnClass,
  fetchCount
};
