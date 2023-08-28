import newlogo from "common/src/images/new-logo.svg";
import {
  resetRedux,
  setFreeTrailSubComponent
} from "common/src/old-api/usersActions";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
class DefaultItems extends React.Component {
  constructor() {
    super();
    this.state = {
      componentLoad: ""
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.FREE_TRIAL_SUBCOMPONENT) {
      return {
        componentLoad: props.FREE_TRIAL_SUBCOMPONENT || state.componentLoad
      };
    }
    return null;
  }
  setFreeTrail() {
    this.props.setFreeTrailSubComponent({ subcomponent: "signupas" });
  }
  render() {
    const { resetRedux } = this.props;
    return (
      <Navbar
        expand="lg"
        className="justify-content-center custom-nav pl-0 pr-0 "
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/" title="logo">
            <img alt="logo" src={newlogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" title="Home">
                Home
              </Nav.Link>
              <Nav.Link href="#link" title="About">
                About
              </Nav.Link>
              <Nav.Link href="https://www.learnlit.online/packages" title="Pricing" target="_blank">
                Pricing
              </Nav.Link>
              <Nav.Link href="https://www.learnlit.online/how-it-works" title="How it work" target="_blank">
                How it work
              </Nav.Link>
              <Nav.Link href="#link" title="Share Feedback">
                Share Feedback
              </Nav.Link>
              <Nav.Link
                href="/student/join-a-class"
                title="Join A Class"
                onClick={() => {
                  resetRedux();
                }}
              >
                Join A Class
              </Nav.Link>
              <Nav.Link
                className="transparent-btn"
                href="/login"
                onClick={() => {
                  resetRedux();
                }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                className="filled-btn"
                href="#"
                onClick={() => {
                  resetRedux();
                  this.setFreeTrail();
                }}
              >
                Free Trial
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FREE_TRIAL_SUBCOMPONENT: state.user.FREE_TRIAL_SUBCOMPONENT
  };
};

export default connect(mapStateToProps, {
  setFreeTrailSubComponent,
  resetRedux
})(DefaultItems);
