import React, { Component } from "react";
import PropTypes from "prop-types";
import OtpVerificationForm from "../../components/guests/otpVerificationForm";
import { verifyOtp } from "common/src/old-api/usersActions";
export default class otpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };
  }
  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.token
    ) {
      this.setState({ token: this.props.location.state.token });
    } else {
      this.props.history.push("/login");
    }
  }
  async handleSubmit(e, data) {
    e.preventDefault();
    const { otp } = data;

    const res = await verifyOtp({ otp, tokenid: this.state.token });
    if (res.token) {
      this.props.history.push({
        pathname: "/change-password",
        state: { token: res.token },
      });
    }
  }

  render() {
    return (
      <div>
        <OtpVerificationForm
          {...this.state}
          handleSubmit={(e, ...arg) => this.handleSubmit(e, ...arg)}
        />
      </div>
    );
  }
}
