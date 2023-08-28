import axios,{ axiosWithoutInterceptors } from "common/src/api/axios";
import {
  showErrorMessages,
  showSuccessMessages
} from "common/src/components/helpers/notifications";
// const api = "/api";
import { API as api } from "./config";
import {
  FREE_TRIAL_SUBCOMPONENT,
  RESET_STORE,
  SET_LOG_IN,
  SET_STUDENT_SIGNUP_WITH_CLASS,
  SIGN_UP_TYPE
} from "./types";

const sendInterest = async ({ email, interest }) => {
  const url = `${api}/users/add_interested`;
  try {
    let response = await axiosWithoutInterceptors.post(url, { email: email.toLowerCase(), interest:interest });
    return true;
  } catch (err) {
    return false;
  }
};

const setStudentSignupWithClass = (data) => async (dispatch) => {
  dispatch({
    type: SET_STUDENT_SIGNUP_WITH_CLASS,
    studentSignupWithClassData: {
      Code: data.code,
      haveAccount: data.haveAccount ? data.haveAccount : false,
      FirstName: data.firstname ? data.firstname : "",
      LastName: data.lastname ? data.lastname : "",
      Grade: data.grade ? data.grade : "",
      UserName: data.username ? data.username : "",
      Password: data.password ? data.password : "",
      ConfirmPassword: data.confirmPassword ? data.confirmPassword : ""
    }
  });
};

const setFreeTrialData = (data) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_TYPE,
    freeTrialData: {
      SIGN_UP_TYPE: data.type,
      Library: data.library ? data.library : "",
      Email: data.email ? data.email : "",
      FirstName: data.firstname,
      LastName: data.lastname,
      UserName: data.username,
      Password: data.password,
      Reference: data.hearAboutUs,
      Grade: data.grade,
      Country: data.country,
      State: data.state,
      School: data.school,
      Phone: data.contact,
      provider: data.provider,
      Confirm: data.confirm,
      SchoolRole: data.schoolRole,
      SchoolCheck: data.check,
      howCanWeHelp: data.howCanWeHelp
    }
  });
};
const checkForEmailUniqueness = (data) => async (dispatch) => {
  let url = `${api}/users/email_available `;
  try {
    const response = await axiosWithoutInterceptors.post(url, { email: data.email.toLowerCase() });
    if (response.data) {
      return {
        isEmailPass: true
      };
    }
  } catch (err) {
    return {
      isEmailPass: false,
      message: err?.response?.data?.messages
        ? err?.response?.data?.messages[0]
        : ""
    };
  }
};
const isVerified = (data) => async (dispatch) => {
  let url = `${api}/users/email_verified`;
  try {
    const response = await axiosWithoutInterceptors.post(url, { email: data.email });
    if (response.data) {
      dispatch({
        type: SET_LOG_IN,
        info: {
          isVerified: response.data.status
        }
      });
      return response.data;
    }
  } catch (err) {
    // return {
    //   isVerified: false,
    //   message: err.response.data.messages ? err.response.data.messages[0] : "",
    // };
    return null;
  }
};

const freeTrial = (data, stepper) => async (dispatch) => {
  let url = `${api}/users`;
  try {
    const response = await axiosWithoutInterceptors.post(url, data);
    if (response.data) {
      if (stepper) {
        stepper.next();
      }
      if (data.role === "student" || data.role === "school_admin") {
        dispatch({ type: RESET_STORE });
        window.location.href = "/login";
      }
      showSuccessMessages([response.data.successMessage], "Success");
    }
    return response.data;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 500)
    ) {
      if (err.response.data.errorsMessage) {
        return err.response.data.errorsMessage;
      }
      const { messages } = err.response.data;
      showErrorMessages(messages, "Authentication");
    } else if (err.response && err.response.status === 400) {
      const { messages } = err.response.data;
      showErrorMessages(messages, "Authentication");
    } else {
      showErrorMessages(["error"], "Authentication");
    }

    return false;
  }
};

const setFreeTrailSubComponent = (data) => async (dispatch) => {
  dispatch({
    type: FREE_TRIAL_SUBCOMPONENT,
    freeTrialSubcomponent: {
      FREE_TRIAL_SUBCOMPONENT: data.subcomponent
    }
  });
};
const login =
  ({ email, password }) =>
    async (dispatch) => {
      const url = `${api}/login`;

      try {
        const response = await axiosWithoutInterceptors.post(url, { email, password });

        const {
          accessToken,
          role,
          firstName,
          lastName,
          email: receivedEmail,
          messages,
          isVerified,
          _id,
          packId,
          freeTrialExpired,
          packExpired
        } = response.data;

        dispatch({
          type: SET_LOG_IN,
          info: {
            accessToken,
            role,
            id: _id || "",
            firstName,
            lastName,
            email: receivedEmail,
            isVerified,
            loggedIn: true,
            packId,
            freeTrialExpired,
            packExpired
          }
        });
        if (role === "student") {
          const res = await fetchMyAccountDetails({});
          if (res) {
            dispatch({
              type: SET_LOG_IN,
              info: {
                favorites: res.favouriteVideos
              }
            });
          }
        }
        return role;
      } catch (err) {
        if (
          err.response &&
        (err.response.status === 401 || err.response.status === 500)
        ) {
          const { messages } = err.response.data;
          if (messages && messages[0]) {
            showErrorMessages(messages, "Authentication");
          } else {
            showErrorMessages(["Error"], "Authentication");
          }
        } else showErrorMessages(["Error"], "Authentication");
        return false;
      }
    };

const socialLogin =
  ({ provider, token, uid, email, accessToken }) =>
    async (dispatch) => {
      const url = `${api}/login/social`;

      try {
        const response = await axiosWithoutInterceptors.post(url, { provider, token, uid, email });

        const {
          accessToken,
          role,
          firstName,
          lastName,
          email: receivedEmail,
          _id,
          messages,
          isVerified
        } = response.data;

        dispatch({
          type: SET_LOG_IN,
          info: {
            accessToken,
            role,
            id: _id || "",
            firstName,
            lastName,
            email: receivedEmail,
            isVerified,
            loggedIn: true,
            provider
          }
        });

        // let response1 = await axios.get("https://classroom.googleapis.com/v1/courses", {
        //   headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
        // });

        showSuccessMessages(messages, "Authentication");
        return role;
      } catch (err) {
        if (
          err.response &&
        (err.response.status === 401 || err.response.status === 500)
        ) {
          const { messages } = err.response.data;
          if (messages && messages[0]) {
            showErrorMessages(messages, "Authentication");
          } else {
            showErrorMessages(["Error"], "Authentication");
          }
        } else showErrorMessages(["Error"], "Authentication");
        return false;
      }
    };
const loginWithToken =
  ({ token }) =>
    async (dispatch) => {
      const url = `${api}/users/check_token`;

      try {
        const response = await axiosWithoutInterceptors.post(url, { token });
        const { status } = response.data;
        if (status) {
          dispatch({
            type: SET_LOG_IN,
            info: {
              role: "teacher",
              loggedIn: true,
              accessToken: token
            }
          });
          return true;
        } else {
          return false;
        }
      // showSuccessMessages(messages, 'Authentication')
      } catch (err) {
        if (
          err.response &&
        (err.response.status === 401 || err.response.status === 500)
        ) {
          if (err.response.data.errorsMessage) {
            return err.response.data.errorsMessage;
          }
          const { messages } = err.response.data;

          showErrorMessages(messages, "Authentication");
        } else showErrorMessages(["Error"], "Authentication");

        return false;
      }
    };

const loginWithClass =
  ({ email, password, code }) =>
    async (dispatch) => {
      const url = `${api}/join_class/has_account`;

      try {
        const response = await axiosWithoutInterceptors.post(url, { email, password, code });

        const {
          accessToken,
          role,
          firstName,
          lastName,
          email: receivedEmail,
          class_id: newClassId,
          _id,
          messages
        } = response.data;

        dispatch({
          type: SET_LOG_IN,
          info: {
            accessToken,
            role,
            id: _id || "",
            firstName,
            lastName,
            email: receivedEmail,
            class_id: newClassId,
            loggedIn: true
          }
        });
        showSuccessMessages(messages, "Authentication");
        return role;
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 500) {
          if (err.response.data.errorsMessage) {
            return err.response.data.errorsMessage;
          }
          const { messages } = err.response.data;
          showErrorMessages(messages, "Authentication");
        } else showErrorMessages(["Error"], "Authentication");
        return false;
      }
    };

const logout = () => (dispatch) => {
  dispatch({ type: RESET_STORE });
  showSuccessMessages(["Logged out successfully"], "Authentication");
};

const register =
  ({
    firstName,
    lastName,
    email,
    school,
    schoolType,
    schoolDistrict,
    role,
    password,
    passwordConfirmation,
    grade,
    hearAboutUs
  }) =>
    async (dispatch) => {
      let url = `${api}/users`;
      try {
        const response = await axiosWithoutInterceptors.post(url, {
          firstName,
          lastName,
          email,
          school,
          schoolType,
          schoolDistrict,
          role,
          password,
          passwordConfirmation,
          grade,
          ...(hearAboutUs && { hearAboutUs })
        });
        return response.data;
      } catch (err) {
        if (err.response.status === 400) {
          const { messages } = err.response.data;
          showErrorMessages(messages, "Authentication");
        }
        return false;
      }
    };

const fetchUsersList = async ({ filter }) => {
  const url = "users";
  try {
    let response = await axios.get(url, {
      params: { ...filter }
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const deleteUser = async ({ user_id }) => {
  const url = "users";
  try {
    const response = await axios({
      method: "DELETE",
      url,
      data: { user_id }
    });
    return true;
  } catch (err) {
    return false;
  }
};

const fetchUserDetails = async ({ account_id }) => {
  const url = `users/${account_id}`;
  try {
    let response = await axios.get(url, {
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const updateUserDetails = async ({ user_id, details }) => {
  const url = `users/${user_id}`;
  try {
    const response = await axios({
      method: "PATCH",
      url,
      data: details
    });
    return true;
  } catch (err) {
    return false;
  }
};

const resetPasswordRequest = async ({ email, contact, type }) => {
  const url = `${api}/users/reset_password_request`;

  try {
    const response = await axiosWithoutInterceptors({
      method: "POST",
      url,
      data: { email, contact, type }
    });

    const { messages, token } = response.data;
    showSuccessMessages(messages, "Password reset");
    if (type === "phone") {
      return { token };
    }
    return true;
  } catch (error) {
    const { messages } = (error.response && error.response.data) || [
      "A problem occured while sending the request"
    ];
    showErrorMessages(messages, "Password reset");
    return false;
  }
};
const verifyOtp = async ({ otp, tokenid }) => {
  const url = `${api}/users/confirm_otp`;

  try {
    const response = await axiosWithoutInterceptors({
      method: "POST",
      url,
      data: { otp, token: tokenid }
    });

    const { messages, token } = response.data;
    showSuccessMessages(messages, "Otp Verification");
    return { token };
  } catch (error) {
    const { messages } = (error.response && error.response.data) || [
      "A problem occured while sending the request"
    ];
    showErrorMessages(messages, "Otp Verification");
    return false;
  }
};

const resetPassword = async ({
  email,
  token,
  password,
  passwordConfirmation
}) => {
  const url = `${api}/users/reset_password`;

  try {
    const response = await axiosWithoutInterceptors({
      method: "POST",
      url,
      data: { email, token, password, passwordConfirmation }
    });
    const { messages } = response.data;
    showSuccessMessages(messages, "Password reset");
    return true;
  } catch (error) {
    const { messages } = (error.response && error.response.data) || [
      "A problem occured while sending the request"
    ];
    showErrorMessages(messages, "Password reset");
    return false;
  }
};
const createPassword =
  ({ token, password, passwordConfirmation }) =>
    async (dispatch) => {
      const url = `${api}/users/reset_password_and_login`;

      try {
        const response = await axiosWithoutInterceptors({
          method: "POST",
          url,
          data: { token, password, passwordConfirmation }
        });
        const {
          accessToken,
          role,
          firstName,
          lastName,
          email: receivedEmail,
          messages
        } = response.data;

        showSuccessMessages(messages, "Password created");
        return response.data;
      } catch (error) {
        const { messages } = (error.response && error.response.data) || [
          "A problem occured while sending the request"
        ];
        showErrorMessages(messages, "Password Created");
        return false;
      }
    };

const fetchMyAccountDetails = async () => {
  const url = "accounts/mine";

  try {
    const response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

const updateMyAccountDetails = async ({ query }) => {
  const url = "accounts/mine";
  try {
    await axios({
      method: "POST",
      url,
      data: query
    });
    return true;
  } catch (error) {
    return false;
  }
};
const deleteMyProfile = async ({ query }) => {
  const url = "accounts/removeProfilePicture";

  try {
    const response = await axios({
      method: "DELETE",
      url,
      data: query
    });
    return true;
  } catch (error) {
    return false;
  }
};

const updateMyPassword = async ({ query }) => {
  const url = "accounts/password";
  try {
    const response = await axios({
      method: "POST",
      url,
      data: query
    });
    return true;
  } catch (error) {
    return false;
  }
};

const updateMyEmail = async ({ query }) => {
  const url = "accounts/email";
  try {
    const response = await axios({
      method: "POST",
      url,
      data: query
    });
    return true;
  } catch (error) {
    return false;
  }
};

const verifyEmail = async ({ token }) => {
  const url = `${api}/users/verify_email?token=${token}`;
  try {
    let response = await axios.get(url);
    // return response.data;
    const { messages } = response.data;
    showSuccessMessages(messages, "Account");
  } catch (error) {
    const { messages } = (error.response && error.response.data) || [
      "A problem occured while sending the request"
    ];
    showErrorMessages(messages, "Error");
    return false;
  }
};

const resendVerificationEmail = async ({ email }) => {
  const url = `${api}/users/resend_verification_email`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { email }
    });
    const { messages } = response.data;
    showSuccessMessages(messages, "");
    return true;
  } catch (error) {
    const { messages } = (error.response && error.response.data) || [
      "A problem occured while sending the request"
    ];
    showErrorMessages(messages, "Error");
    return false;
  }
};

const fetchUserName = async ({ user_id }) => {
  const url = `users/get_name/${user_id}`;
  try {
    const response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (error) {
    const { messages } = (error.response && error.response.data) || [
      "A problem occured while sending the request"
    ];
    showErrorMessages(messages, "Error");
    return false;
  }
};

const SignupWithClass = (data) => async (dispatch) => {
  const url = `${api}/join_class/signup_join`;

  try {
    const response = await axios.post(url, data);

    const {
      class_id: newClassId,
      accessToken,
      role,
      firstName,
      lastName,
      _id,
      email: receivedEmail,
      messages
    } = response.data;

    dispatch({
      type: SET_LOG_IN,
      info: {
        accessToken,
        role,
        id: _id || "",
        firstName,
        lastName,
        email: receivedEmail,
        class_id: newClassId,
        loggedIn: true
      }
    });
    showSuccessMessages(messages, "Authentication");
  } catch (err) {
    if (err.response.status === 401 || err.response.status === 500) {
      if (err.response.data.errorsMessage) {
        return err.response.data.errorsMessage;
      }
      const { messages } = err.response.data;
      showErrorMessages(messages, "Authentication");
    } else showErrorMessages(["Error"], "Authentication");
    return false;
  }
};

const resetRedux = () => (dispatch) => {
  dispatch({ type: RESET_STORE });
};

const setRedux = (data) => (dispatch) => {
  dispatch({
    type: SET_LOG_IN,
    info: data
  });
};

export {
  register,
  login,
  logout,
  fetchUsersList,
  deleteUser,
  fetchUserDetails,
  updateUserDetails,
  resetPasswordRequest,
  resetPassword,
  fetchMyAccountDetails,
  updateMyAccountDetails,
  updateMyPassword,
  updateMyEmail,
  verifyEmail,
  resendVerificationEmail,
  fetchUserName,
  setFreeTrialData,
  setFreeTrailSubComponent,
  setStudentSignupWithClass,
  SignupWithClass,
  loginWithClass,
  freeTrial,
  resetRedux,
  loginWithToken,
  createPassword,
  setRedux,
  verifyOtp,
  checkForEmailUniqueness,
  socialLogin,
  isVerified,
  deleteMyProfile,
  sendInterest
};
