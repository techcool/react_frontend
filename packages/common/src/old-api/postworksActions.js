import axios from "common/src/api/axios";
import { API as api } from "./config";


const createPostwork = async ({ postwork }) => {
  const url = "postworks";
  try {
    await axios({
      method: "POST",
      url,
      data: { ...postwork }
    });
    return true;
  } catch (err) {
    return false;
  }
};

const updatePostwork = async ({  postwork }) => {
  const url = "postworks";
  try {
    await axios({
      method: "PATCH",
      url,
      data: postwork
    });
    return true;
  } catch (err) {
    return false;
  }
};

const fetchPostworks = async ({  filter }) => {
  const url = "postworks";
  try {
    let response = await axios.get(url, {
      params: filter
    });
    return response.data;
  } catch (err) {
    //TODO add notification
    return [];
  }
};

const fetchPostworksV1 = async ({ role, filter }) => {
  const url = `${api}/v1/${role}/postworks`;
  try {
    let response = await axios.get(url, {
      params: filter
    });
    return response.data;
  } catch (err) {
    //TODO add notification
    return [];
  }
};
const fetchPostwork = async ({ postwork_id }) => {
  const url = `postworks/${postwork_id}`;
  try {
    let response = await axios.get(url, {});
    return response.data;
  } catch (err) {
    return [];
  }
};

const fetchStudentPostworkAssignmentForAllClass = async ({
  params
}) => {
  const url = "students/postworks";
  try {
    let response = await axios.get(url, {
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const fetchStudentPracticeAssignmentForAllClass = async ({
  params
}) => {
  const url = "students/practice";
  try {
    let response = await axios.get(url, {
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const fetchAssigneeProgress = async ({
  postwork_id,
  params
}) => {
  const url = `postworks/${postwork_id}/students`;

  try {
    let response = await axios.get(url, {
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const removePostwork = async ({  postwork_id ,class_id }) => {
  const url = "postworks/removePostworkFromClass";
  try {
    await axios({
      method: "DELETE",
      url,
      data: { postwork_id ,class_id }
    });
    return true;
  } catch (err) {
    return false;
  }
};

export {
  createPostwork,
  updatePostwork,
  fetchPostworks,
  fetchPostwork,
  fetchPostworksV1,
  fetchAssigneeProgress,
  removePostwork,
  fetchStudentPostworkAssignmentForAllClass,
  fetchStudentPracticeAssignmentForAllClass
};
