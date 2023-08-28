import { fetchAssignmentsCompletionReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import AssignmentCompletionReportPage from "../../../components/admin/reports/assignmentsCompletion";

class AssignmentsCompletion extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolType: "",
      startDate: "",
      endDate: "",
      grade: "",
      completedAssignments: [],
      completedAssignmentsDetails: [],
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
    const {
      schoolType,
      startDate,
      endDate,
      grade
    } = this.state;
    const query = {
      ...(schoolType && { schoolType }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(grade && { grade })
    };
    const { accessToken, role } = this.props;
    const data = await fetchAssignmentsCompletionReport({ accessToken, role, query });
    if (data) {
      const { completedAssignments, completedAssignmentsDetails, total } = data;
      this.setState({ completedAssignments, completedAssignmentsDetails, total });
    }
  }
  render() {
    return (
      <AssignmentCompletionReportPage
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
)(AssignmentsCompletion);
