import {
  fetchUserDetails,
  updateUserDetails
} from "common/src/old-api/usersActions";
import React from "react";
import { connect } from "react-redux";
import ShowUser from "../../../components/admin/userShow";

class Show extends React.Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      school: "",
      schoolType:"",
      schoolDistrict:"",
      creationDate: "",
      grade: "",
      role: "",
      isTutor:false,
      freeStudentAccountsLimit: "",
      enabled: true
    };
  }

  async componentDidMount() {
    this.fetchUserDetails();
  }

  async fetchUserDetails() {
    const { accessToken, role: userRole } = this.props;
    const { user_id: account_id } = this.props.match.params;
    const userDetails = await fetchUserDetails({ accessToken, role: userRole, account_id });
    const {
      _id,
      firstName,
      lastName,
      email,
      school,
      schoolType,
      schoolDistrict,
      creationDate,
      grade,
      role,
      isTutor,
      freeStudentAccountsLimit,
      enabled
    } = userDetails;
    this.setState({
      _id,
      firstName,
      lastName,
      email,
      school,
      schoolType,
      schoolDistrict,
      creationDate,
      grade,
      role,
      isTutor,
      freeStudentAccountsLimit,
      enabled
    });
  }

  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { accessToken, role: userRole } = this.props;
    const { user_id } = this.props.match.params;
    const {
      firstName,
      lastName,
      email,
      school,
      schoolType,
      schoolDistrict,
      grade,
      freeStudentAccountsLimit,
      enabled
    } = this.state;

    const details = {
      firstName,
      lastName,
      email,
      school,
      schoolType,
      schoolDistrict,
      grade,
      freeStudentAccountsLimit,
      enabled
    };
    const isUpdated = await updateUserDetails({
      accessToken,
      role: userRole,
      user_id,
      details
    });
    if (isUpdated) {
      this.fetchUserDetails();
    }
  }

  render() {
    return <ShowUser
      { ...this.state }
      handleChanges={ e => this.handleChanges(e) }
      handleSubmit={ (e) => this.handleSubmit(e) }
      reset={ () => this.fetchUserDetails() }
    />;
  }
}

const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(Show); 
