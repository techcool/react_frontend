import { ACTIVITY_PRACTICE } from "common/src/constants";
import { fetchMyPerformanceOnPractice } from "common/src/old-api/reportsAction";
import { fetchMyTimer } from "common/src/old-api/timer";
import React from "react";
import { connect } from "react-redux";
import PerformanceOnPracticePage from "../components/students/report/performanceOnPractice";

class Report extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Practice Activities Performance",
      averageScores: [],
      completedCounter: [],
      inProgressCounter: [],
      completedVideosCounter: [],
      averageScoresByActivites: [{}, {}, {}, {}],
      maxScoresByActivites:[{},{},{},{}],
      latestScoresByActivites:[{},{},{},{}],
      practiceTime: [{}, {}, {}, {}]
    };
  }
  async componentDidMount() {
    const { accessToken, role } = this.props;
    const report = await fetchMyPerformanceOnPractice({
      accessToken,
      role
    });
    const {
      averageScores,
      completedCounter,
      inProgressCounter,
      completedVideosCounter,
      averageScoresByActivites,
      maxScoresByActivites,
      latestScoresByActivites
    } = report;
    this.setState({
      averageScores,
      completedCounter,
      inProgressCounter,
      completedVideosCounter,
      averageScoresByActivites,
      maxScoresByActivites,
      latestScoresByActivites
    });
    this.fetchTimer();
  }

  async fetchTimer() {
    const { accessToken, role } = this.props;
    const practiceTime = await fetchMyTimer({ accessToken, role, activityType: ACTIVITY_PRACTICE });
    this.setState({ practiceTime });
  }

  render() {
    const {
      title,
      averageScores,
      completedCounter,
      inProgressCounter,
      completedVideosCounter,
      averageScoresByActivites,
      maxScoresByActivites,
      latestScoresByActivites,
      practiceTime
    } = this.state;

    return (
      <PerformanceOnPracticePage
        { ...{
          title,
          averageScores,
          completedVideosCounter,
          completedCounter,
          inProgressCounter,
          averageScoresByActivites,
          maxScoresByActivites,
          latestScoresByActivites,
          practiceTime
        } }
      />
    );
  }
}

const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(Report);
