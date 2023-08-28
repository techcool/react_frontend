import { fetchLoginsReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import LoginsReportPage from "../../../components/admin/reports/logins";

class LoginsReport extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolType: "",
      role: "",
      startDate: "",
      endDate: "",
      logins: [],
      loginDetails:[],
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
      role: roleForm,
      startDate,
      endDate
    } = this.state;
    const query = {
      ...(schoolType && { schoolType }),
      ...(roleForm && { role: roleForm }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    };
    const { accessToken, role } = this.props;
    const data = await fetchLoginsReport({ accessToken, role, query });
    if (data) {
      const { logins, total,loginDetails } = data;
      this.setState({ logins,loginDetails, total });
    }
  }

  render() {
    return (
      <LoginsReportPage
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
)(LoginsReport);
