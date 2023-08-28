import { fetchAssignmentsCreationReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import AssignmentCreationReportPage from "../../../components/admin/reports/assignmentsCreation";

class AssignmentsCreationReport extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolType: "",
      grade: "",
      startDate: "",
      endDate: "",
      createdAssignments: [],
      createdAssignmentsDetails: [],
      teachersDailyStatistics: [],
      teachersTotalStatistics: [],
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
      grade,
      startDate,
      endDate
    } = this.state;
    const query = {
      ...(!!schoolType && { schoolType }),
      ...(!!grade && { grade }),
      ...(!!startDate && { startDate }),
      ...(!!endDate && { endDate })
    };
    const { accessToken, role } = this.props;
    const data = await fetchAssignmentsCreationReport({ accessToken, role, query });
    if (data) {
      const {
        createdAssignments,
        createdAssignmentsDetails,
        teachersDailyStatistics,
        teachersTotalStatistics,
        total
      } = data;
      this.setState({ 
        createdAssignments, 
        createdAssignmentsDetails, 
        teachersDailyStatistics,
        teachersTotalStatistics,
        total 
      });
    }
  }

  render() {
    return (
      <AssignmentCreationReportPage
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
)(AssignmentsCreationReport);
