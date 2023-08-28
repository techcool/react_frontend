import AccountPage from "common/src/components/Forms/accountUpdate";
import {
  deleteMyProfile,
  fetchMyAccountDetails,
  updateMyAccountDetails
} from "common/src/old-api/usersActions";
import React from "react";
import { connect } from "react-redux";

const Account = ({ initialState, updateState, buildQuery, afterSubmission }) =>
  class extends React.Component {
    constructor() {
      super();
      this.state = initialState;
    }

    async componentDidMount() {
      const { accessToken, role } = this.props;
      const data = await fetchMyAccountDetails({ accessToken, role });
      if (data) {
        updateState(this, data);
      }
    }

    handleChanges(e) {
      if (e.target.id === "contact") {
        this.setState({ contact: e.target.value });
      }
      this.setState({
        [e.target.id]: e.target.value
      });
    }

    async handleSubmit(e) {
      e.preventDefault();
      const { accessToken, role } = this.props;
      const query = buildQuery(this);
      const isUpdated = await updateMyAccountDetails({
        accessToken,
        role,
        query
      });
      if (isUpdated) {
        afterSubmission(this);
        const data = await fetchMyAccountDetails({ accessToken, role });
        if (data) {
          updateState(this, data);
          if(role == "teacher"){
            window.location.href="/teacher/account";
          }else if(role == "student"){
            window.location.href="/student/account";
          }
        }
      }
    }
    RemoveImage = async (id) => {
      const { accessToken, role } = this.props;
      const isDeleted = await deleteMyProfile({ accessToken, role });
      if (isDeleted) {
        const data = await fetchMyAccountDetails({ accessToken, role });
        if (data) {
          updateState(this, data);
        }
      }
    };
    onFileChange = (event) => {
      // Update the state
      this.setState({ profileImage: event.target.files[0] });
    };
    render() {
      return (
        <AccountPage
          { ...this.state }
          handleChanges={ (e) => this.handleChanges(e) }
          handleSubmit={ (e) => this.handleSubmit(e) }
          RemoveImage={ this.RemoveImage }
          onFileChange={ (e) => this.onFileChange(e) }
        />
      );
    }
  };

export const updateStudentAccount = connect((state) => {
  const {
    user: { accessToken, role }
  } = state;
  return { accessToken, role };
}, null)(
  Account({
    initialState: {
      firstName: "",
      lastName: "",
      email: "",
      username:"",
      school: "",
      profileImage: "",
      role: "",
      schoolType: "",
      schoolDistrict: "",
      creationDate: "",
      grade: -1,
      password: "",
      contact: "",
      tempMobile: ""
    },
    updateState: (_this, data) => {
      const {
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        grade,
        profileImage,
        role,
        creationDate,
        contact
      } = data;
      _this.setState({
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        profileImage,
        grade,
        contact,
        tempMobile: contact,
        role,
        creationDate
      });
    },
    buildQuery: (_this) => {
      const {
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        profileImage,
        grade,
        contact,
        password
      } = _this.state;
      return {
        firstName,
        lastName,
        email,
        username,
        contact,
        school,
        profileImage,
        schoolType,
        schoolDistrict,
        grade,
        password
      };
    },
    afterSubmission: function (_this) {
      _this.setState({ password: "" });
    }
  })
);

export const updateTeacherAccount = connect((state) => {
  const {
    user: { accessToken, role }
  } = state;
  return { accessToken, role };
}, null)(
  Account({
    initialState: {
      firstName: "",
      lastName: "",
      email: "",
      username:"",
      school: "",
      role: "",
      isTutor: false,
      schoolType: "",
      schoolDistrict: "",
      creationDate: "",
      grade: -1,
      password: ""
    },
    updateState: (_this, data) => {
      const {
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        grade,
        role,
        isTutor,
        creationDate
      } = data;
      _this.setState({
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        grade,
        role,
        isTutor,
        creationDate
      });
    },
    buildQuery: (_this) => {
      const {
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        grade,
        password
      } = _this.state;
      return {
        firstName,
        lastName,
        email,
        username,
        school,
        schoolType,
        schoolDistrict,
        grade,
        password
      };
    },
    afterSubmission: function (_this) {
      _this.setState({ password: "" });
    }
  })
);
