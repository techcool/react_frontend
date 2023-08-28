import DialogPopup from "common/src/components/shared/commingSoonDialog";
import {
  setFreeTrailSubComponent,
  setFreeTrialData
} from "common/src/old-api/usersActions";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

class SignupAs extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
      dialog: false
    };
  }

  setSignUpType = (arg) => {
    if (arg !== this.props.signUpType) {
      this.props.setFreeTrialData({ type: arg });
      this.props.setFreeTrailSubComponent({ subcomponent: "library" });
    }
  };

  handleClose = () => {
    this.setState({ show: false });
    this.props.setFreeTrailSubComponent({ subcomponent: "" });
  };

  render() {
    return (
      <>
        <Modal
          className="custom-modal"
          show={ this.state.show }
          centered
          onHide={ this.handleClose }
        >
          <div className="box">
            <Modal.Header closeButton>
              <Modal.Title>I&apos;m Interested in Lit for</Modal.Title>
            </Modal.Header>
            <div className="btn-wrapper">
              <Button
                className="primary-btn"
                variant="primary"
                onClick={ () => this.setSignUpType("teacher") }
              >
                Start As a Teacher
              </Button>
              <Button
                className="orange-btn primary-btn"
                variant="primary"
                onClick={ () => this.setSignUpType("student") }
              >
                Start As a Student
              </Button>
              <span className="divider"></span>
              <Button
                className="dark-btn primary-btn"
                variant="primary"
                // onClick={() => this.setSignUpType("school")}
                onClick={ () => this.setState({ dialog: true }) }
              >
                Start As a School
              </Button>
              <Button
                className="light-blue-btn primary-btn"
                variant="primary"
                onClick={ () => this.setSignUpType("tutor") }
              >
                Start As Tutor
              </Button>
            </div>
          </div>
        </Modal>
        <DialogPopup
          show={ this.state.dialog }
          interest="SCHOOL"
          handleClose={ () => {
            this.setState({ dialog: false });
          } }
        />
      </>
    );
  }
}

SignupAs.propTypes = {
  signUpType: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    signUpType: state.user.SIGN_UP_TYPE
  };
};

export default connect(mapStateToProps, {
  setFreeTrialData,
  setFreeTrailSubComponent
})(SignupAs);
