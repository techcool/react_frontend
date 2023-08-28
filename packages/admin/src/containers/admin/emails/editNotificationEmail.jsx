import { fetchEmail, postEmail } from "common/src/old-api/email";
import React from "react";
import { connect } from "react-redux";
import { EditNotificationsEmailPage } from "../../../components/admin/emails/editNotificationsEmail";

class EditNotificationsEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      title: "",
      content: ""
    };
  }
  async componentDidMount() {
    const { role, accessToken } = this.props;
    this.setState({ loading: true });
    const email = await fetchEmail({
      role, 
      accessToken,
      query:{
        type:this.props.type
      }
    });
    if(email){
      const { title,content }= email;
      this.setState({ title, content });
    }
    this.setState({ loading: false });
  }
  handleChanges(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { role, accessToken } = this.props;
    await postEmail({
      accessToken, role,
      query: {
        type: this.props.type,
        title: this.state.title,
        content: this.state.content
      }
    });
    this.setState({ loading: false });
  }
  render() {
    const { loading } = this.state;
    if (loading)
      return (
        <div>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    return (
      <EditNotificationsEmailPage
        { ...this.props }
        { ...this.state }
        handleChanges={ e => this.handleChanges(e) }
        handleSubmit={ e => this.handleSubmit(e) }
      />
    );
  }
}

export default connect(state => {
  const { user: { accessToken, role } } = state;
  return ({ accessToken, role });
})(EditNotificationsEmail);
