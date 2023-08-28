import {
  fetchClassDetails,
  fetchClasses,
  sendInvitationEmail
} from "common/src/old-api/classesActions";
import { fetchPostworks, removePostwork } from "common/src/old-api/postworksActions";
import React from "react";
import { connect } from "react-redux";
import ShowClassDetails from "../components/teachers/classShow";

class TeachersClassesShow extends React.Component {
  constructor() {
    super();
    this.state = {
      classDetails: {},
      postworks: [],
      emails: "",
      classes: []
    };
  }
  async componentDidMount() {
    const { class_id } = this.props.match.params;
    this.fetchDetails(class_id);
    const classes = await fetchClasses({ });
    this.setState({ classes });
    this.fetchPostWorkList();
  }
  fetchPostWorkList = async (startDate, dueDate) => {
    const { class_id } = this.props.match.params;
    const postworks = await fetchPostworks({
      filter: { class_id, startDate, dueDate }
    });
    this.setState({ postworks });
  };

  async componentDidUpdate(prevProps) {
    const { class_id } = this.props.match.params;
    if (prevProps.match.params.class_id !== class_id) {
      this.fetchDetails(class_id);
      this.fetchPostwork(class_id);
    }
  }
  fetchDetails = async (class_id) => {
    const classDetails = await fetchClassDetails({
      class_id
    });
    this.setState({ classDetails });
  };
  fetchPostwork = async (class_id) => {
    const postworks = await fetchPostworks({
      filter: { class_id }
    });
    this.setState({ postworks });
  };

  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { class_id } = this.props.match.params;
    const { emails } = this.state;
    sendInvitationEmail({
      class_id,
      emails
    });
    this.setState({
      emails: ""
    });
  }

  async removePostwork(postwork_id, class_id) {
    const isRemoved = await removePostwork({
      postwork_id,
      class_id
    });
    if (isRemoved) {
      const { class_id } = this.props.match.params;
      const postworks = await fetchPostworks({
        filter: { class_id }
      });
      this.setState({ postworks });
    }
  }

  render() {
    const { emails, classDetails, postworks, classes } = this.state;
    return (
      <ShowClassDetails
        fetchDetails = { this.fetchDetails }
        classDetails={ classDetails }
        postworks={ postworks }
        classes={ classes }
        { ...{
          emails,
          classDetails,
          postworks
        } }
        { ...this.props }
        class_id={ this.props.match.params }
        handleChanges={ (e) => this.handleChanges(e) }
        fetchPostWorkList={ this.fetchPostWorkList }
        sendInvitation={ (e) => this.handleSubmit(e) }
        removePostwork={ (postwork_id, class_id) =>
          this.removePostwork(postwork_id, class_id)
        }
      />
    );
  }
}

export default TeachersClassesShow;
