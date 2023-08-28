import { fetchCreatedClassesReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";
import CreatedClassesPage from "../../../components/admin/reports/createdClasses";

class CreateClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      endDate: "",
      grade: "",
      total:0,
      createdClasses: [],
      createdClassesDetails:[],
      teachersDailyStatistics: [],
      teachersTotalStatistics: []
    };
  }

  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      grade,
      startDate,
      endDate
    } = this.state;
    const query = {
      ...(!!grade && { grade }),
      ...(!!startDate && { startDate }),
      ...(!!endDate && { endDate })
    };
    const { accessToken, role } = this.props;
    const data = await fetchCreatedClassesReport({ accessToken, role, query });
    if (data) {
      const { 
        createdClasses, 
        createdClassesDetails,
        teachersDailyStatistics,
        teachersTotalStatistics,
        total
      } = data;
      this.setState({ 
        createdClasses,
        createdClassesDetails, 
        teachersDailyStatistics,
        teachersTotalStatistics,
        total
      });
    }
  }
  render() {
    return (
      <CreatedClassesPage
        { ...this.state }
        handleChanges={ e => this.handleChanges(e) }
        handleSubmit={ e => this.handleSubmit(e) }
      />
    );
  }
}

export default connect(state=>{
  const { user:{ accessToken,role } }=state;
  return({ accessToken,role });
}

)(CreateClasses);
