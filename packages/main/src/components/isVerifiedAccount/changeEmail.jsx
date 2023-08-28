import Input from "common/src/components/Forms/input";
import Form from "common/src/components/shared/form";
import {
  fetchMyAccountDetails,
  setRedux,
  updateMyEmail
} from "common/src/old-api/usersActions";
import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

class UpdateUserEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { accessToken, role } = this.props;
    const data = await fetchMyAccountDetails({ accessToken, role });
    if (data) {
      const { email } = data;
      this.setState({ email });

    }
  }

  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { accessToken, role ,firstName, lastName } = this.props;
    const query = {
      email,
      password
    };
    const isUpdated = await updateMyEmail({ accessToken, role, query });
    if (isUpdated) {
      this.props.setRedux({ accessToken, role,firstName, lastName,email });
      this.props.close();
    }
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="change-email-outer px-md-4">
        <Form title="Change Email"  onSubmit={ this.handleSubmit }>
          <Input
            id="email"
            label="Email :"
            type="email"
            value={ email }
            onChange={ this.handleChanges }
            autocomplete="off"
          />
          <Input
            id="password"
            type="password"
            label="Current password :"
            value={ password }
            onChange={ this.handleChanges }
            autocomplete="off"
          />
          <div className="d-flex justify-content-between mt-5">
            <Button onClick={ () => this.props.close() }  className="primary-btn-outline">Cancel</Button>
            <Button type="submit" className="primary-btn">Change Email</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect((state) => {
  const {
    user: { accessToken, role ,firstName, lastName }
  } = state;
  return { accessToken, role ,firstName,lastName };
}, { setRedux })(UpdateUserEmail);
