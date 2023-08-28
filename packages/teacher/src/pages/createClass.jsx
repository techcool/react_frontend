import { createClass } from "common/src/old-api/classesActions";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NewClassForm from "../components/teachers/classNew/newClassForm";
class TeachersClassesNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      grade: "",
      emails: [],
      isRedirect: false,
      class_id:""
    };
  }
  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { name, grade } = this.state;
    const class_id = await createClass({ name, grade });
    if (class_id) {
      this.setState({ isRedirect:true,class_id:class_id });
    }
  }

  render() {
    if(this.state.isRedirect && this.state.class_id){
      return <Redirect to={ `/teacher/classes/${this.state.class_id}/show` } />;
    }
    return this.props.dialog ? (
      <NewClassForm
        { ...this.state }
        handleChanges={ (e) => this.handleChanges(e) }
        handleSubmit={ (e) => this.handleSubmit(e) }
      />
    ) : (
      <div className="row mx-auto lit-section top-zero">
        <NewClassForm
          { ...this.state }
          handleChanges={ (e) => this.handleChanges(e) }
          handleSubmit={ (e) => this.handleSubmit(e) }
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const {
    user: { accessToken, role }
  } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(TeachersClassesNew);
