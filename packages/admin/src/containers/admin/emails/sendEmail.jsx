import { sendEmail as sendEmailAction } from "common/src/old-api/email";
import React from "react";
import { connect } from "react-redux";
import { SendEmailPage } from "../../../components/admin/emails/sendEmail";

class sendEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      target: "teacher",
      processing: false,
      title: "",
      content: ""
    };
  }

  handleChanges(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ processing: true });
    const { accessToken, role } = this.props;
    const { title, content, target } = this.state;
    await sendEmailAction({ accessToken, role, title, content, target });
    this.setState({ processing: false });
  }

  render() {
    return (
      <SendEmailPage
        { ...this.state }
        handleChanges={ (e) => this.handleChanges(e) }
        handleSubmit={ (e) => this.handleSubmit(e) }
      />
    );
  }
}

export default connect(state => {
  const { user: { accessToken, role } } = state;
  return ({ accessToken, role });
})(sendEmail);
