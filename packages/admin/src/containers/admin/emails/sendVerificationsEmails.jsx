import { sendVerificationsEmail } from "common/src/old-api/email";
import React from "react";
import { connect } from "react-redux";
import { SendVerificationsEmailsPage } from "../../../components/admin/emails/sendVerificationsEmails";

class SendVerificationsEmails extends React.Component {
  constructor() {
    super();
    this.state = {
      target: "teacher",
      processing: false
    };
  }
  handleChanges(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ processing: true });
    const { accessToken,role }= this.props;
    const { target }= this.state;
    await sendVerificationsEmail({ accessToken,role,target });
    this.setState({ processing: false });
  }
  render() {
    return (
      <SendVerificationsEmailsPage
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
}
)(SendVerificationsEmails);
