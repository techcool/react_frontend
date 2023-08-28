import { fetchActivitiesReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import ActivitiesReportPage from "../../../components/admin/reports/activitiesReport";

class ActivitiesReport extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
      practice: {
        teachers:{},
        students:{}
      },
      assignments: {}
    };
  }
  handleChanges(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { accessToken, role } = this.props;
    const { date } = this.state;
    const data = await fetchActivitiesReport({
      accessToken,
      role,
      query: { ...(date && { date }) }
    });
    if (data) {
      const { practice, assignments } = data;
      this.setState({
        practice,
        assignments
      });
    }
  }

  render() {
    const { practice, assignments, date } = this.state;
    return (
      <div>
        <ActivitiesReportPage
          { ...{
            practice,
            assignments,
            date
          } }
          handleChanges={ e => this.handleChanges(e) }
          handleSubmit={ e => this.handleSubmit(e) }
        />
      </div>
    );
  }
}

export default connect(
  state => {
    const { user: { accessToken, role } } = state;
    return { accessToken, role };
  }
)(
  ActivitiesReport
);
