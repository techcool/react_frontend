import React, { Component } from "react";
import UserInformationStepper from "../../../components/freeTrial/userInfo";
import { withRouter } from "react-router";

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <UserInformationStepper {...this.props} />
      </React.Fragment>
    );
  }
}
export default withRouter(Index);
