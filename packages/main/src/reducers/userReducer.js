import {
  FREE_TRIAL_SUBCOMPONENT,
  RESET_STORE,
  SET_LOG_IN,
  SET_STUDENT_SIGNUP_WITH_CLASS,
  SIGN_UP_TYPE
} from "common/src/old-api/types";

const initialState = {
  accessToken: "",
  role: "",
  id: "",
  packId: "",
  favorites: [],
  loggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
  isVerified: true,
  subcomponent: "signupas",
  freeTrialData: {
    Confirm: "",
    Country: "",
    Email: "",
    FirstName: "",
    Grade: "",
    LastName: "",
    Library: "",
    Password: "",
    Phone: "",
    Reference: "",
    SIGN_UP_TYPE: "",
    School: "",
    SchoolCheck: false,
    SchoolRole: "",
    State: "",
    UserName: "",
    howCanWeHelp: "",
    provider: ""
  },
  studentSignupWithClassData: {
    Code: "",
    haveAccount: false,
    FirstName: "",
    LastName: "",
    Grade: "",
    UserName: "",
    Password: "",
    ConfirmPassword: ""
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_LOG_IN: {
    let {
      info
    } = action;
    if (!info.packId) {
      info.packId = state.packId;
    }
    return Object.assign({}, state, info);
  }
  case SIGN_UP_TYPE: {
    let {
      freeTrialData
    } = action;
    let temp = {
      SIGN_UP_TYPE: freeTrialData.SIGN_UP_TYPE || state.freeTrialData.SIGN_UP_TYPE,
      Library: freeTrialData.Library ?
        freeTrialData.Library : state.freeTrialData.Library,
      Email: freeTrialData.Email ?
        freeTrialData.Email : state.freeTrialData.Email,
      provider: freeTrialData?.provider === undefined ?
        state.freeTrialData.provider : freeTrialData?.provider,
      FirstName: freeTrialData.FirstName ?
        freeTrialData.FirstName : state.freeTrialData.FirstName,
      LastName: freeTrialData.LastName ?
        freeTrialData.LastName : state.freeTrialData.LastName,
      UserName: freeTrialData.UserName ?
        freeTrialData.UserName : state.freeTrialData.UserName,
      Password: freeTrialData.Password ?
        freeTrialData.Password : state.freeTrialData.Password,
      Grade: freeTrialData.Grade ?
        freeTrialData.Grade : state.freeTrialData.Grade,
      Reference: freeTrialData.Reference ?
        freeTrialData.Reference : state.freeTrialData.Reference,
      Country: freeTrialData.Country ?
        freeTrialData.Country : state.freeTrialData.Country,
      State: freeTrialData.State ?
        freeTrialData.State : state.freeTrialData.State,
      School: freeTrialData.School ?
        freeTrialData.School : state.freeTrialData.School,
      Phone: freeTrialData.Phone ?
        freeTrialData.Phone : state.freeTrialData.Phone,
      Confirm: freeTrialData.Confirm ?
        freeTrialData.Confirm : state.freeTrialData.Confirm,
      SchoolRole: freeTrialData.SchoolRole ?
        freeTrialData.SchoolRole : state.freeTrialData.SchoolRole,
      SchoolCheck: freeTrialData.SchoolCheck ?
        freeTrialData.SchoolCheck : state.freeTrialData.SchoolCheck,
      howCanWeHelp: freeTrialData.howCanWeHelp ?
        freeTrialData.howCanWeHelp : state.freeTrialData.howCanWeHelp
    };
    return Object.assign({}, state, {
      freeTrialData: temp
    });
  }
  case RESET_STORE:
    return initialState;
  case FREE_TRIAL_SUBCOMPONENT: {
    let {
      freeTrialSubcomponent
    } = action;
    return Object.assign({}, state, freeTrialSubcomponent);
  }
  case SET_STUDENT_SIGNUP_WITH_CLASS: {
    let {
      studentSignupWithClassData
    } = action;
    let ClassDataTemp = {
      Code: studentSignupWithClassData.Code ||
          state.studentSignupWithClassData.Code,
      haveAccount: studentSignupWithClassData.haveAccount ?
        studentSignupWithClassData.haveAccount : state.studentSignupWithClassData.haveAccount,
      FirstName: studentSignupWithClassData.FirstName ||
          state.studentSignupWithClassData.FirstName,
      LastName: studentSignupWithClassData.LastName ||
          state.studentSignupWithClassData.LastName,
      Grade: studentSignupWithClassData.Grade ||
          state.studentSignupWithClassData.Grade,
      UserName: studentSignupWithClassData.UserName ||
          state.studentSignupWithClassData.UserName,
      Password: studentSignupWithClassData.Password ||
          state.studentSignupWithClassData.Password,
      ConfirmPassword: studentSignupWithClassData.ConfirmPassword ||
          state.studentSignupWithClassData.ConfirmPassword
    };
    return Object.assign({}, state, {
      studentSignupWithClassData: ClassDataTemp
    });
  }
  default:
    return state;
  }
};

export default userReducer;
