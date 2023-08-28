import { WELCOMING_EMAIL_STUDENTS, WELCOMING_EMAIL_TEACHERS } from "common/src/constants";
import { fetchEmail, postEmail } from "common/src/old-api/email";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import EditEmailPage from "../../../components/admin/emails/editWelcomeEmail";

class EditEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      teacher: {
        title: "",
        content: ""
      },
      student: {
        title: "",
        content: ""
      }
    };
  }

  async componentDidMount() {
    const { accessToken, role } = this.props;
    const teacherData = await fetchEmail({ accessToken, role, query: { type: WELCOMING_EMAIL_TEACHERS } });
    if (teacherData) {
      const { title, content } = teacherData;
      this.setState({
        teacher: {
          title,
          content
        }
      });
    }
    const studentData = await fetchEmail({ accessToken, role, query: { type: WELCOMING_EMAIL_STUDENTS } });
    if (studentData) {
      const { title, content } = studentData;
      this.setState({
        student: {
          title,
          content
        }
      });
    }
    this.setState({ loading: false });
  }

  handleChanges(e, prefix) {
    const email = { ...this.state[prefix] };
    this.setState({
      [prefix]: {
        ...email,
        [e.target.id]: e.target.value
      }
    });
  }

  async handleSubmit(e,prefix) {
    e.preventDefault();
    const { accessToken, role } = this.props;
    const type= {
      "teacher": WELCOMING_EMAIL_TEACHERS,
      "student": WELCOMING_EMAIL_STUDENTS
    };
    const { title, content } = this.state[prefix];
    const query = { 
      title,
      content,
      type: type[prefix]
    };
    await postEmail({ accessToken, role, query });
  }
  render() {
    const { loading, teacher, student } = this.state;
    if (loading)
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );

    return (
      <Fragment>
        <h1>Teachers</h1>
        <EditEmailPage
          { ...teacher }
          handleChanges={ (e) => this.handleChanges(e, "teacher") }
          handleSubmit={ (e) => this.handleSubmit(e,"teacher") }
        />
        <h1>Students</h1>
        <EditEmailPage
          { ...student }
          handleChanges={ (e) => this.handleChanges(e, "student") }
          handleSubmit={ (e) => this.handleSubmit(e,"student") }
        />
      </Fragment>
    );
  }
}

export default connect(state => {
  const { user: { accessToken, role } } = state;
  return ({ accessToken, role });
})(EditEmail);
