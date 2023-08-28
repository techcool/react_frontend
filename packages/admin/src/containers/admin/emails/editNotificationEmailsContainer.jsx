import { Submit } from "common/src/components/Forms/submit";
import Form from "common/src/components/shared/form";
import {
  fetchConfigurations,
  updateConfigurations
} from "common/src/old-api/configurations";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import EditNotificationsEmail from "./editNotificationEmail";

class EditNotificationEmailsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "sendingReminders",
      enabled: false
    };
  }
  async componentDidMount() {
    const { role, accessToken } = this.props;
    const { type } = this.state;
    const response = await fetchConfigurations({ role, accessToken, query: { type } });
    if (response) {
      const { value: { enabled } } = response;
      this.setState({ enabled });
    }
  }

  handleChanges() {
    this.setState({ enabled: !this.state.enabled });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { accessToken, role } = this.props;
    const { type, enabled } = this.state;
    await updateConfigurations({
      accessToken,
      role,
      query: {
        type,
        value: {
          enabled
        }
      }
    });

  }

  render() {
    const { enabled } = this.state;
    return (
      <Fragment>
        <Form
          style={ { maxWidth: "800px" } }
          title="Reminders status"
          onSubmit={ (e) => this.handleSubmit(e) }
        >
          <div className="form-check">
            <input
              type="checkbox"
              id="enabled"
              checked={ enabled }
              className="form-check-input"
              onChange={ () => this.handleChanges() }
            />
            <label htmlFor="enabled">
              Enabled
            </label>
          </div>
          <div className="py-3" />
          <Submit
            text="Save"
          />
        </Form>
        <EditNotificationsEmail
          formTitle="Update teachers reminder email"
          type="teacherReminder"
        />
        <EditNotificationsEmail
          formTitle="Update students reminder email"
          type="studentReminder"
        />
      </Fragment>
    );
  }
}

export default connect(state => {
  const { user: { accessToken, role } } = state;
  return ({ accessToken, role });
})(EditNotificationEmailsContainer);
