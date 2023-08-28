import { fetchPracticeReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import PracticeReportPage from "../../../components/admin/reports/practice";

class PracticeReport extends React.Component {
  constructor() {
    super();
    this.state = {
      status:"inprogress",
      startDate: "",
      endDate: "",
      data: [],
      total: 0
    };
  }

  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { accessToken,role }=this.props;
    const {
      status,
      startDate,
      endDate
    } = this.state;
    const query = {
      ...(status && { status }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    };

    const response = await fetchPracticeReport({ accessToken,role,query });  
    if( response){
      const { data, total }=response;
      this.setState({
        data,total
      });
    }
  }

  render() {
    return (
      <PracticeReportPage
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
  }
  ,
  null
)(PracticeReport);
