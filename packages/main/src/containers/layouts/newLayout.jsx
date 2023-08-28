import { fetchClasses } from "common/src/old-api/classesActions";
import { logout } from "common/src/old-api/usersActions";
import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import FreeTrial from "../../containers/freeTrial";

class NewLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: []
    };
  }

  async componentDidMount() {
    if (this.props.loggedIn === true) {
      this.updateNavbar();
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.loggedIn === false && this.props.loggedIn === true) {
      this.updateNavbar();
    }
  }

  async updateNavbar() {
    if (this.props.role === "admin")
      return;
    this.fetchClasses();
  }

  async fetchClasses() {
    const { accessToken, role } = this.props;
    const classes = await fetchClasses({ accessToken, role });
    this.setState({ classes });
  }
   
  render() {
      
    const { loggedIn,FREE_TRIAL_SUBCOMPONENT } = this.props;
    const Content = () => (
      <Fragment>
        { /* <ApplicationLayoutContext.Provider value={value}> */ }
        { FREE_TRIAL_SUBCOMPONENT? <FreeTrial /> :<></> }
        { this.props.children }
        { /* </ApplicationLayoutContext.Provider> */ }
      </Fragment>
    );
    if (!loggedIn) return (<Content />);
    else
      return (<Container><Content /></Container>);
  }
}
const mapStateToProps = state => {
  const { user: { accessToken, role, loggedIn, FREE_TRIAL_SUBCOMPONENT } } = state;
  return { accessToken, role, loggedIn, FREE_TRIAL_SUBCOMPONENT };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewLayout);
