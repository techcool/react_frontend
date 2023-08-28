import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import ResetPasswordRequestForm from "../../components/guests/resetPasswordRequestForm";
import { resetPasswordRequest } from "common/src/old-api/usersActions";

class ResetPasswordRequest extends React.Component {
  constructor(props) {
    super(props);
  }
  async handleSubmit(e, data) {
    e.preventDefault();
    const { email, type, contact } = data;
    if (type === "phone") {
      const res = await resetPasswordRequest({ type, contact });
      if (res.token) {
        this.props.history.push({
          pathname: "/otp-verification",
          state: { token: res.token },
        });
      }
    } else {
      await resetPasswordRequest({ email });
    }
  }
  render() {
    return (
      <ResetPasswordRequestForm
        {...this.state}
        handleSubmit={(e, ...arg) => this.handleSubmit(e, ...arg)}
      />
    );
  }
}

export default ResetPasswordRequest;
