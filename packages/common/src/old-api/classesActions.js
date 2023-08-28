import axios,{ axiosWithoutInterceptors } from "common/src/api/axios";

const createClass = async ({ name, grade }) => {
  const url = "classes";
  const query = {
    name:name.toLowerCase(),
    grade
  };
  try {
    const response = await axios({
      method: "POST",
      url,
      data: query
    });
    const { class_id } = response.data;
    return class_id;
  } catch (err) {
    return false;
  }
};

const checkForClassCode = async ({ code }) => {
  const url = `${api}/join_class/${code}`;
  try {
    const response = await axiosWithoutInterceptors({
      method: "GET",
      url
    });
    if (response) {
      return {
        isCodePass: true
      };
    }
  } catch (err) {
    return {
      isCodePass: false,
      message: err.response.data.messages ? err.response.data.messages[0] : ""
    };
  }
};

const fetchClassDetails = async ({ class_id }) => {
  const url = `classes/${class_id}`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return { students: [] };
  }
};

const fetchClasses = async ({ params }) => {
  const url = "classes";
  try {
    let response = await axios({
      method: "GET",
      url,
      params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const joinClass = async ({  code }) => {
  const url = "classes";
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { code }
    });
    const { class_id } = response.data;
    return class_id;
  } catch (err) {
    return false;
  }
};
const removeClass = async ({ class_id }) => {
  const url = "classes";
  try {
    const response = await axios({
      method: "DELETE",
      url,
      data: { class_id }
    });
    return true;
  } catch (err) {
    return false;
  }
};

const sendInvitationEmail = async ({ class_id, emails }) => {
  const url = `classes/${class_id}/invite`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { emails }
    });
    return true;
  } catch (err) {
    return false;
  }
};

const fetchClassName = async ({ class_id }) => {
  const url = `classes/${class_id}/name`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return { name: "" };
  }
};

const fetchClass = async ({ class_id }) => {
  const url = `classes/${class_id}`;
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
const updateClass = async ({ class_id, data }) => {
  const url = `classes/${class_id}`;
  try {
    let response = await axios({
      method: "PUT",
      url,
      data: data
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchClassesCreatedByUser = async ({  account_id }) => {
  const url = `reports/accounts/${account_id}/classes`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const fetchClassesCreatedOrJoinedByUser = async ({
  account_id
}) => {
  const url = `users/${account_id}/classes`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const studentList = async ({  params }) => {
  const url = "students";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const studentDetails = async ({  id }) => {
  const url = `students/${id}`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const assignmentList = async ({ params }) => {
  const url = "postworks";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });

    return response.data;
  } catch (err) {
    return [];
  }
};
const canTeacherChangePassword = async () => {
  const url = "students/canTeacherResetPassword";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const createStudentNewPassword = async ({  data, id }) => {
  const url = `students/${id}/reset_password`;
  try {
    let response = await axios({
      method: "POST",
      url,
      data: data
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const unrollStudentFromClass = async ({  classId,studentId }) => (
  await axios({
    url:`classes/${classId}/students/${studentId}`,
    method:"DELETE"
  })
);

const fetchStudentPractices = async ({  params }) => {
  const url = "students/practice";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const fetchStudentAssignments = async ({  params }) => {
  const url = "students/postworks";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const fetchClassesFromGoogle = async ({ accessToken }) => {
  let response = await axiosWithoutInterceptors.get(
    "https://classroom.googleapis.com/v1/courses",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      }
    }
  );

  return response.data;
};

const fetchStudentsFromGoogle = async ({ accessToken, courseId }) => {
  let response = await axiosWithoutInterceptors.get(
    "https://classroom.googleapis.com/v1/courses/" + courseId + "/students/",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      }
    }
  );

  return response.data;
};

const importClasses = async ({ data }) => {
  const url = "classes/google_classroom";
  try {
    let response = await axios({
      method: "POST",
      url,
      data: data
    });
    return { response: response.data, type: "success" };
  } catch (err) {
    const { messages } = err.response.data;
    return { response: messages, type: "error" };
  }
};

export {
  createClass,
  fetchClassDetails,
  unrollStudentFromClass,
  joinClass,
  fetchClasses,
  removeClass,
  sendInvitationEmail,
  fetchClass,
  fetchClassName,
  fetchClassesCreatedByUser,
  fetchClassesCreatedOrJoinedByUser,
  checkForClassCode,
  studentList,
  updateClass,
  assignmentList,
  studentDetails,
  canTeacherChangePassword,
  createStudentNewPassword,
  fetchStudentPractices,
  fetchStudentAssignments,
  fetchClassesFromGoogle,
  importClasses,
  fetchStudentsFromGoogle
};
