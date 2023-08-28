import { ACTIVITY_ASSIGNMENT } from "common/src/constants";
import { fetchMyPerformanceOnClass } from "common/src/old-api/reportsAction";
import { fetchMyTimer } from "common/src/old-api/timer";
import React from "react";
import { connect } from "react-redux";
import PerformanceOnClassPage from "../components/students/report/performanceOnClass";

class PerformanceOnClass extends React.Component {
  constructor() {
    super();
    this.state = {
      class_id: "",
      className: "",
      averageScores: [],
      completedCounter: [],
      completedVideosCounter: [],
      averageScoresByActivites: [{}, {}, {}, {}],
      maxScoresByActivites: [{}, {}, {}, {}]
    };
  }
  async componentDidMount() {
    const { accessToken, role } = this.props;
    const { class_id } = this.props.match.params;
    this.fetchTimer();
    const report = await fetchMyPerformanceOnClass({
      accessToken,
      role,
      class_id
    });
    const {
      className,
      averageScores,
      completedCounter,
      completedVideosCounter,
      averageScoresByActivites,
      maxScoresByActivites
    } = report;
    this.setState({
      class_id,
      className,
      averageScores,
      completedCounter,
      completedVideosCounter,
      averageScoresByActivites,
      maxScoresByActivites
    });
  }

  async fetchTimer() {
    const { accessToken, role } = this.props;
    const { class_id } = this.props.match.params;
    const practiceTime = await fetchMyTimer({
      accessToken,
      role,
      activityType: ACTIVITY_ASSIGNMENT,
      class_id
    });
    this.setState({ practiceTime });
  }

  render() {
    const {
      class_id,
      className,
      averageScores,
      completedCounter,
      completedVideosCounter,
      averageScoresByActivites,
      maxScoresByActivites,
      practiceTime
    } = this.state;
    return (
      <PerformanceOnClassPage
        { ...{
          class_id,
          className,
          averageScores,
          averageScoresByActivites,
          practiceTime,
          completedCounter,
          completedVideosCounter,
          maxScoresByActivites
        } }
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role } = user;
  return {
    accessToken,
    role
  };
};

export default connect(mapStateToProps, null)(PerformanceOnClass);
