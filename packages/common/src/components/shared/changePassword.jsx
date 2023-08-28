import React from "react";
import { connect } from "react-redux";
import ChangePassword from "common/src/components/Forms/changePassword";
import { updateMyPassword } from "common/src/old-api/usersActions";

const ChangeUserPassword = ({ Page }) =>
  connect((state) => {
    const {
      user: { accessToken, role },
    } = state;
    return { accessToken, role };
  }, null)(
    class extends React.Component {
      constructor() {
        super();
        this.state = {
          password: "",
          newPassword: "",
          newPasswordConfirmation: "",
        };
      }

      handleChanges(e) {
        this.setState({
          [e.target.id]: e.target.value,
        });
      }

      async handleSubmit(data) {
        // e.preventDefault();
        const { password, newPassword, newPasswordConfirmation } = this.state;
        const { accessToken, role } = this.props;
        const query = {
          password,
          newPassword: data.password,
          newPasswordConfirmation: data.confirm,
        };
        const isUpdated = await updateMyPassword({ accessToken, role, query });
        if (isUpdated) {
          this.props.history && this.props.history.push("");
        }
      }

      render() {
        return (
          <Page
            {...this.state}
            handleChanges={(e) => this.handleChanges(e)}
            handleSubmit={(e) => this.handleSubmit(e)}
          />
        );
      }
    }
  );

export const ChangeTeacherPassword = ChangeUserPassword({
  Page: ChangePassword,
});

export const ChangeStudentPassword = ChangeUserPassword({
  Page: ChangePassword,
});

export const ChangeAdminPassword = ChangeUserPassword({
  Page: ChangePassword,
});
