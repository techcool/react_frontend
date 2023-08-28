import { fetchPaidSubscribersReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import PaidSubscriberPage from "../../../components/admin/reports/paidSubscribers";

class PaidSubscribers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packId: null,
      payments: []
    };
  }
  async handleSubmit(e) {
    e.preventDefault();
    const {
      packId
    } = this.state;
    const query = {
      ...(packId && { packId })
    };
    const { accessToken, role } = this.props;
    const data = await fetchPaidSubscribersReport({ accessToken, role, query });
    if (data) {
      const { payments } = data;
      this.setState({ payments });
    }
  }
  handleChanges(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  render() {
    const { payments } = this.state;
    return (
      <PaidSubscriberPage
        { ...{
          data: payments,
          handleChanges:(e)=>this.handleChanges(e),
          handleSubmit:(e)=>this.handleSubmit(e)
        } }
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
)(PaidSubscribers);
