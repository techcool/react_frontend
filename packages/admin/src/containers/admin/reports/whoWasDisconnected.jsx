import { fetchWhoWasConnectedReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import WhoWasConnected from "../../../components/admin/reports/whoWasDisconnected";

class WhoWasConnectedReport extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      endDate: "",
      users: []
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
      startDate,
      endDate
    } = this.state;
    const query = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    };
    const { accessToken, role } = this.props;
    const data = await fetchWhoWasConnectedReport({ accessToken, role, query });
    if (data) {
      const { users } = data;
      this.setState({ users });
    }
  }

  render() {
    return (
      <WhoWasConnected
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
)(WhoWasConnectedReport);
