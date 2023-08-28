import { fetchMyAccountDetails } from "common/src/old-api/usersActions";
import React from "react";
import { connect } from "react-redux";
import {
  StudentAccountPage,
  TeacherAccountPage
} from "./components";

const Account = ({ initialState, Page, updateState }) =>
  connect((state) => {
    const {
      user: { accessToken, role }
    } = state;
    return { accessToken, role };
  }, null)(
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
      render() {
        return <Page { ...this.state } />;
      }
    }
  );

export const StudentAccount = Account({
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    school: "",
    schoolType: "",
    schoolDistrict: "",
    grade: "",
    role: "",
    creationDate: "",
    username: ""
  },
  Page: StudentAccountPage,
  updateState: function (_this, data) {
    const {
      email,
      firstName,
      lastName,
      school,
      schoolType,
      schoolDistrict,
      grade,
      role,
      username,
      creationDate
    } = data;
    _this.setState({
      email,
      firstName,
      lastName,
      school,
      schoolType,
      schoolDistrict,
      grade,
      role,
      username,
      creationDate
    });
  }
});

export const TeacherAccount = Account({
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    school: "",
    schoolType: "",
    schoolDistrict: "",
    grade: "",
    role: "",
    creationDate: "",
    username: "",
    isTutor: false,
    subscriptiondetails:{}
  },
  Page: TeacherAccountPage,
  updateState: function (_this, data) {
    const {
      email,
      firstName,
      lastName,
      school,
      schoolType,
      schoolDistrict,
      grade,
      role,
      creationDate,
      username,
      isTutor,
      subscriptiondetails
    } = data;
    _this.setState({
      email,
      firstName,
      lastName,
      school,
      schoolType,
      schoolDistrict,
      grade,
      role,
      creationDate,
      isTutor,
      username,
      subscriptiondetails
    });
  }
});
