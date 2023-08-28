import { fetchUsersStatistics } from "common/src/old-api/reportsAction";
import {
  deleteUser,
  fetchUsersList,
  updateUserDetails
} from "common/src/old-api/usersActions";
import React from "react";
import { connect } from "react-redux";
import UsersIndex from "../../../components/admin/usersIndex";

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      limit: 10,
      skip: 0,
      users: [],
      firstName: "",
      lastName: "",
      email: "",
      school: "",
      schoolType: "",
      schoolDistrict: "",
      grade: "",
      role: null,
      enabled: null,
      isVerified: null,
      didCreateAssignment: null,
      didCreateClass: null,
      hearAboutUs:null,
      statistics: {
        admins: {
          enabled: 0,
          disabled: 0
        },
        teachers: {
          enabled: 0,
          disabled: 0
        },
        tutors: {
          enabled: 0,
          disabled: 0
        },
        students: {
          enabled: 0,
          disabled: 0
        }
      }
    };
  }
  setSkip(value) {
    this.setState({ skip: value });
  }
  setLimit(value) {
    this.setState({ limit: value });
  }
  async componentDidMount() {
    this.fetchUsersStatistics();
    this.fetchUsersList();
  }

  async fetchUsersStatistics() {
    const { accessToken, role } = this.props;
    const statistics = await fetchUsersStatistics({ accessToken, role });
    if (statistics)
      this.setState({ statistics });
  }

  async fetchUsersList() {
    const { accessToken, role } = this.props;
    const users = await fetchUsersList({ accessToken, role });
    this.setState({ users });

  }

  changesHandler(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { accessToken, role: userRole } = this.props;
    const {
      firstName,
      lastName,
      email,
      school,
      schoolType,
      schoolDistrict,
      grade,
      role,
      enabled,
      isVerified,
      didCreateClass,
      didCreateAssignment,
      hearAboutUs
    } = this.state;
    const users = await fetchUsersList({
      accessToken,
      role: userRole,
      filter: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(school && { school }),
        ...(schoolType && { schoolType }),
        ...(schoolDistrict && { schoolDistrict }),
        ...(grade && { grade }),
        ...(role && { role }),
        ...(enabled && { enabled }),
        ...(isVerified && { isVerified }),
        ...(didCreateClass !== null && { didCreateClass }),
        ...(didCreateAssignment !== null && { didCreateAssignment }),
        ...(hearAboutUs !== null && { hearAboutUs })
      }
    });
    this.setSkip(0);
    this.setState({ users });
    this.fetchUsersStatistics();
  }

  async deleteUser({ user_id }) {
    const { accessToken, role } = this.props;
    const deleted = await deleteUser({ accessToken, role, user_id });
    if (deleted) {
      this.fetchUsersList();
      this.fetchUsersStatistics();
    }
  }

  async updateAccountStatus({ user_id, status }) {
    const { accessToken, role } = this.props;
    const updated = await updateUserDetails({
      accessToken,
      role,
      user_id,
      details: { enabled: status }
    });
    if (updated) {
      this.fetchUsersList();
      this.fetchUsersStatistics();
    }
  }

  async markEmailAsVerified({ user_id }) {
    const { accessToken, role: userRole } = this.props;
    const details = { isVerified: true };
    const isUpdated = await updateUserDetails({
      accessToken,
      role: userRole,
      user_id,
      details
    });
    if (isUpdated) {
      this.fetchUsersList();
      this.fetchUsersStatistics();
    }
  }

  render() {
    return (
      <UsersIndex
        { ...this.state }
        setSkip={ value => this.setSkip(value) }
        setLimit={ value => this.setLimit(value) }
        changesHandler={ e => this.changesHandler(e) }
        handleSubmit={ e => this.handleSubmit(e) }
        deleteUser={ ({ user_id }) => this.deleteUser({ user_id }) }
        updateAccountStatus={ ({ user_id, status }) => this.updateAccountStatus({ user_id, status }) }
        markEmailAsVerified={ ({ user_id }) => this.markEmailAsVerified({ user_id }) }
      />
    );
  }
}

const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(
  mapStateToProps,
  null
)(Index);
