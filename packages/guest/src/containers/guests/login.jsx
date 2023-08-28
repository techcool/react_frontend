/* eslint-disable eqeqeq */
import {
  login,
  loginWithClass,
  resendVerificationEmail,
  verifyEmail
} from "common/src/old-api/usersActions";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
import LoginForm from "../../components/guests/loginForm";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props && this.props.code ? this.props.code : "",
      successMessage: "",
      errorMessage: ""
    };
  }

  async resendVerificationEmail() {
    const { email } = this.state;
    await resendVerificationEmail({ email });
  }

  async componentDidMount() {
    const { token } =
      this.props && this.props.location && this.props.location.search
        ? queryString.parse(this.props.location.search)
        : "";
    if (token) {
      const result = await verifyEmail({ token });
      if (result) {
        const { successMessage, errorMessage } = result;
        this.setState({
          successMessage,
          errorMessage
        });
      }
    }
  }

  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e, data) {
    e.preventDefault();
    const { email, password } = data;
    let res;
    if (this.props && this.props.code) {
      let code = this.props.code;
      res = await this.props.loginWithClass({ email, password, code });
    } else {
      res = await this.props.login({ email, password });
    }
    if (res == "student") {
      this.setState({ errorMessage: res });
      this?.props?.history ? this.props.history.push("/student/assignments") 
        : window.location.href = "/student/assignments";
    }
  }

  render() {
    return (
      <div id="#login-1">
        <LoginForm
          handleChanges={ (e) => this.handleChanges(e) }
          handleSubmit={ (e, ...arg) => this.handleSubmit(e, ...arg) }
          resendVerificationEmail={ () => this.resendVerificationEmail() }
          { ...this.state }
          { ...this.props }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: ({ email, password }) => dispatch(login({ email, password })),
    loginWithClass: ({ email, password, code }) =>
      dispatch(loginWithClass({ email, password, code }))
  };
};

export default connect(null, mapDispatchToProps)(Login);
