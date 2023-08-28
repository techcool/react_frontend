import React from "react";
import queryString from "query-string";
import ResetPasswordForm from "../../components/guests/resetPasswordForm";
import { resetPassword } from "common/src/old-api/usersActions";

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      token: "",
      password: "",
      passwordConfirmation: "",
    };
  }

  handleChanges(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  componentDidMount() {
    const { token } = queryString.parse(this.props.location.search);
    this.setState({ token });
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.token
    ) {
      this.setState({ token: this.props.location.state.token });
    }
  }
  async handleSubmit(e, data) {
    e.preventDefault();
    const { password, passwordConfirmation } = data;
    const token = this.state.token;
    const isReset = await resetPassword({
      token,
      password,
      passwordConfirmation,
    });
    if (isReset) {
      this.props.history.push("/login");
    }
  }

  render() {

    return (
      <ResetPasswordForm
        handleSubmit={(e, ...arg) => this.handleSubmit(e, ...arg)}
      />
    );
  }
}

export default ResetPassword;
