import { fetchVideosAssignmentsReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import VideoAssignmentsReport from "../../../components/admin/reports/videoAssignments";

class VideosAssignments extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      startDate: "",
      endDate: ""
    };
  }

  handleChanges = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { role, accessToken } = this.props;
    const { startDate, endDate } = this.state;
    const query = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    };
    const videos = await fetchVideosAssignmentsReport({ role, accessToken, query });
    if (videos) {
      this.setState({
        videos
      });
    }
  }

  render() {
    const { videos } = this.state;
    return (
      <VideoAssignmentsReport
        videos={ videos }
        handleChanges={ (e)=>this.handleChanges(e) }
        handleSubmit={ (e) => this.handleSubmit(e) }
      />
    );
  }
}

export default connect(
  state => {
    const { user: { accessToken, role } } = state;
    return ({ accessToken, role });
  }
)(VideosAssignments);
