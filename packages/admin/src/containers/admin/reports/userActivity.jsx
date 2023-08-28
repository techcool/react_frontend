import { fetchClassDetails, fetchClassesCreatedOrJoinedByUser } from "common/src/old-api/classesActions";
import { fetchPostworks } from "common/src/old-api/postworksActions";
import { fetchOverallPerformanceOnClass, fetchStudentPerformanceOnClassReport } from "common/src/old-api/reportsAction";
import { fetchUserDetails } from "common/src/old-api/usersActions";
import React from "react";
import { connect } from "react-redux";
import StudentPerformanceOnPractice from "./student";
import UserActivityPage from "../../../components/admin/reports/userActivity";
import ClassDetailsStudentView from "../../../components/students/classes/showClassDetails";
import StudentPerformanceOnClassPage from "../../../components/students/report/performanceOnClass";
import ClassDetailsTeacherView from "../../../components/teachers/classShow";
import OverallPerformanceOnClassPage from "../../../components/teachers/report/overAllPerformanceOnClass";

const initialState = {
  selectedClass: null,
  loadingClassData: true,
  loading: true,
  account_id: "",
  firstName: "",
  lastName: "",
  email: "",
  isTutor: "",
  role: "",
  classes: [],
  postworks: [],
  progressPageData: {},
  classDetails: {}
};
class UserActivities extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  async componentDidUpdate(prevProps) {
    const { account_id } = this.props.match.params;
    if (prevProps.match.params.account_id !== account_id) {
      const { accessToken, role } = this.props;
      const userDetails = await fetchUserDetails({ accessToken, role, account_id });
      const classes = await fetchClassesCreatedOrJoinedByUser({ accessToken, role, account_id });
      this.setState({
        ...initialState,
        account_id,
        ...userDetails,
        ...classes,
        loading: false
      });
  
    }
  }
  async componentDidMount() {
    const { accessToken, role } = this.props;
    const { account_id } = this.props.match.params;
    const userDetails = await fetchUserDetails({ accessToken, role, account_id });
    const classes = await fetchClassesCreatedOrJoinedByUser({ accessToken, role, account_id });
    this.setState({
      account_id,
      ...userDetails,
      ...classes,
      loading: false
    });
  }

  async selectClass(class_id) {
    this.setState({
      loadingClassData: true,
      selectedClass: class_id
    });
    const { account_id, role: userRole } = this.state;
    if (userRole === "student") {
      const postworks = await fetchPostworks({  filter: { class_id, account_id, role: "student" } });
      const progressPageData = await fetchStudentPerformanceOnClassReport({ 
        class_id, student_id: account_id });
      this.setState({
        loadingClassData: false,
        postworks,
        progressPageData
      });
    } else if (userRole === "teacher") {
      const classDetails = await fetchClassDetails({  class_id });
      const postworks = await fetchPostworks({
        filter: {
          class_id,
          role: "teacher"
        }
      });
      const progressPageData = await fetchOverallPerformanceOnClass({
        class_id
      });
      this.setState({
        classDetails,
        postworks,
        progressPageData,
        loadingClassData: false
      });
    }
  }

  render() {
    const {
      loading,
      selectedClass,
      loadingClassData,
      classes,
      postworks,
      progressPageData,
      role,
      classDetails
    } = this.state;

    if (loading) return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

    const {
      _id: class_id,
      teacherFirstName,
      teacherLastName,
      teacherEmail,
      joinDate,
      name
    } = (selectedClass) ?
      classes.filter(c => c._id === selectedClass)[0] :
      {};

    return (
      <>
        <UserActivityPage
          { ...this.state }
          selectClass={ (class_id) => this.selectClass(class_id) }
        />
        {
          role === "student" &&
          !selectedClass &&
            <StudentPerformanceOnPractice
              { ...this.props }
            />

        }
        {
          selectedClass && loadingClassData &&
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
        }
        {
          selectedClass &&
          !loadingClassData &&
          (
            (
              role === "student" &&
                <ClassDetailsStudentView
                  teacherFirstName={ teacherFirstName }
                  teacherLastName={ teacherLastName }
                  teacherEmail={ teacherEmail }
                  name={ name }
                  joinDate={ joinDate }
                  class_id={ class_id }
                  postworks={ postworks }
                  PerformanceOnClass={ () =>
                    <StudentPerformanceOnClassPage { ...progressPageData } />
                  }
                />
            )
            ||
            (
              role === "teacher" &&
                <ClassDetailsTeacherView
                  classDetails={ classDetails }
                  postworks={ postworks }
                  OverallPerformanceOnClass={ () =>
                    <OverallPerformanceOnClassPage { ...progressPageData } />
                  }
                />
            )
          )
        }
      </>
    );
  }
}

export default connect(
  state => {
    const { user: { accessToken, role } } = state;
    return ({ accessToken, role });
  }
)(UserActivities);
