import { joinClass } from "common/src/old-api/classesActions";
import React from "react";
import { connect } from "react-redux";
import JoinClassForm from "../components/students/classes/joinClassForm";

class StudentsHome extends React.Component {
  constructor() {
    super();
    this.state = {
      code: ""
    };
  }
  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { accessToken, role } = this.props;
    const { code } = this.state;
    const class_id = await joinClass({ accessToken, role, code });
    if (class_id) {
      this.props.history.push("/student/classes");
    }
  }
  render() {
    const { code } = this.state;
    return (
      <JoinClassForm
        code={ code }
        handleChanges={ (e) => this.handleChanges(e) }
        handleSubmit={ (e) => this.handleSubmit(e) }
      />
    );
  }
}


const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(StudentsHome);
