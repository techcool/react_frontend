import { fetchRegistrationsReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import RegistrationsReportPage from "../../../components/admin/reports/registrations";

class Registrations extends React.Component {
  constructor() {
    super();
    this.state = {
      role: "",
      schoolType: "",
      schoolDistrict: "",
      startDate: "",
      endDate: "",
      registrations:[],
      total:0
    };
  }

  handleChanges(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      role: Role,
      schoolType,
      schoolDistrict,
      startDate,
      endDate
    } = this.state;
    const query = {
      ...(!!Role && { role: Role }),
      ...(!!schoolType && { schoolType }),
      ...(schoolType == "public" && !!schoolDistrict && { schoolDistrict }),
      ...(!!startDate && { startDate }),
      ...(!!endDate && { endDate })
    };
    const { accessToken, role } = this.props;
    const data=await fetchRegistrationsReport({ accessToken, role, query });
    if(data){
      const { registrations,total }=data;
      this.setState({ registrations,total });
    }
  }
  render() {
    return (
      <RegistrationsReportPage
        { ...this.state }
        handleChanges={ e => this.handleChanges(e) }
        handleSubmit={ e => this.handleSubmit(e) }
      />
    );
  }
}


export default connect(
  state => {
    const { user: { accessToken, role } } = state;
    return { accessToken, role };
  },
  null
)(Registrations);
