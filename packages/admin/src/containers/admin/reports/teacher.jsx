import { fetchClassesCreatedByUser } from "common/src/old-api/classesActions";
import {
  fetchUserPerformanceOnPractice,
  fetchUserTimeReport
} from "common/src/old-api/reportsAction";
import { fetchUserDetails } from "common/src/old-api/usersActions";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import TeacherActivityPage from "../../../components/admin/reports/teacherActivity";

class UserReport extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userDetails: {},
      practiceTime: [{}, {}, {}, {}],
      classes: [],
      practiceStatistics: {
        averageScores: [],
        completedCounter: [],
        inProgressCounter: [],
        completedVideosCounter: [],
        averageScoresByActivites: [{}, {}, {}, {}]
      }
    };
  }

  async componentDidMount() {
    const { accessToken, role } = this.props;
    const { account_id } = this.props.match.params;

    const userDetails = await fetchUserDetails({ accessToken, role, account_id });
    this.setState({
      userDetails
    });

    const classes = await fetchClassesCreatedByUser({ accessToken, role, account_id });

    this.setState({ classes });

    const result = await fetchUserTimeReport({
      accessToken,
      role,
      account_id
    });

    const { practiceTime } = result;
    this.setState({
      loading: false,
      practiceTime
    });
    this.fetchUserPerformanceOnPractice();
  }
  async fetchUserPerformanceOnPractice() {
    const { accessToken, role } = this.props;
    const { account_id } = this.props.match.params;
    const report = await fetchUserPerformanceOnPractice({
      accessToken,
      role,
      account_id
    });
    let {
      averageScores,
      completedCounter,
      inProgressCounter,
      completedVideosCounter,
      averageScoresByActivites
    } = report;

    this.setState({
      practiceStatistics: {
        averageScores,
        completedCounter,
        inProgressCounter,
        completedVideosCounter,
        averageScoresByActivites
      }
    });


  }
  render() {
    const {
      loading,
      userDetails,
      practiceStatistics,
      classes
    } = this.state;
    const {
      firstName,
      lastName,
      email
    } = userDetails;
    const {
      completedCounter,
      completedVideosCounter,
      averageScores,
      inProgressCounter,
      averageScoresByActivites
    } = practiceStatistics;

    if (loading)
      return (
        <div className="spinner-grow text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );

    return (
      <Fragment>
        <TeacherActivityPage
          { ...{
            averageScores,
            completedCounter,
            inProgressCounter,
            completedVideosCounter,
            averageScoresByActivites,
            firstName,
            lastName,
            email,
            classes
          } }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(UserReport);
