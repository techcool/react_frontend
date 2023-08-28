import axios from "axios";
import { showErrorMessages } from "common/src/components/helpers/notifications";
// const api = "/api";
import {API as api} from './config'
const sendTimeReport = async ({ timer }) => {
  const url = `timer`;
  try {
    await axios({
      method: "POST",
      url,
      data: timer,
    });
    return true;
  } catch (err) {
    return false;
  }
};
const fetchMyTimer = async ({ activityType, class_id }) => {
  const url = `timer`;
  try {
    const response = await axios({
      method: "GET",
      url,
      params: { activityType, class_id },
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

const fetchTimer = async ({
  accountID,
  activityType,
  class_id,
}) => {
  const url = `timer`;
  try {
    const response = await axios({
      method: "GET",
      url,
      params: { accountID, activityType, class_id },
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

export { sendTimeReport, fetchMyTimer, fetchTimer };
