import {
  fetchOverallPerformanceOnClass
} from "common/src/old-api/reportsAction";
import React from "react";
import OverallPerformanceOnClassPage
from "../components/teachers/report/overAllPerformanceOnClass";

class OverallPerformanceOnClass extends React.Component {
  constructor() {
    super();
    this.state = {
      className: "",
      averageScores: [],
      completedCounter: [],
      completedVideosCounter: [],
      students: []
    };
  }

  async componentDidMount() {
    const { class_id } = this.props.match.params;
    let report = await fetchOverallPerformanceOnClass({
      class_id
    });
    let {
      className,
      averageScores,
      completedCounter,
      completedVideosCounter,
      students
    } = report;
    this.setState({
      className,
      averageScores,
      completedCounter,
      completedVideosCounter,
      students
    });
  }

  render() {
    const {
      className,
      averageScores,
      completedCounter,
      completedVideosCounter,
      students
    } = this.state;
    const { class_id } = this.props.match.params;

    const title = `Class Performance: ${className}`;

    return (
      <OverallPerformanceOnClassPage
        { ...{
          title,
          averageScores,
          students,
          class_id,
          completedCounter,
          completedVideosCounter
        } }
      />
    );
  }
}


export default OverallPerformanceOnClass;
