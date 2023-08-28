import ChangeEmail from "common/src/components/Forms/changeEmail";
import { fetchMyAccountDetails, updateMyEmail } from "common/src/old-api/usersActions";
import React from "react";

export default class UpdateUserEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  async componentDidMount() {
    const data = await fetchMyAccountDetails();
    if (data) {
      const { email } = data;
      this.setState({ email });
    }
  }

  handleChanges(e) {
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const query = {
      email,
      password
    };
    const isUpdated = await updateMyEmail({ query });
    if (isUpdated) {
      if(this.props.history)
      {
        this.props.history.push("/");
      }
    }
  }
  render() {
    return (
      <ChangeEmail
        { ...this.state }
        handleChanges={ e => this.handleChanges(e) }
        handleSubmit={ e => this.handleSubmit(e) }
      />
    );
  }
}

