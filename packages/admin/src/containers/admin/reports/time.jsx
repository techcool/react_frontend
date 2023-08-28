import { fetchTimeReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import TimeReportPage from "../../../components/admin/reports/time";

class Time extends React.Component {
  constructor() {
    super();
    this.state = {
      activityType:"",
      grade: "",
      startDate: "",
      endDate: "",
      totalTime:[]
    };
  }

  handleChanges(e) {
    this.setState({
      [e.target.id]:e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      activityType,
      grade,
      startDate,
      endDate
    }=this.state;
    const query={
      ...(!!activityType&&{ activityType }),
      ...(!!activityType &&!!grade && { grade }),
      ...(!!startDate&& { startDate }),
      ...(!!endDate&& { endDate })
    };
    const { accessToken,role }=this.props;
    const data =await fetchTimeReport({ accessToken,role,query });
    if(data){
      const { totalTime }=data;
      this.setState({ totalTime });
    }
  }

  render() {
    return (
      <TimeReportPage
        { ...this.state }
        handleChanges={ e => this.handleChanges(e) }
        handleSubmit={ e => this.handleSubmit(e) }
      />
    );
  }
}

export default connect(
  state => {
    const { user: { accessToken, role } } = state;
    return { accessToken, role };
  },
  null
)
(Time);
