import verfiy from "common/src/images/verify.svg";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// import ReactSelect, { components } from "react-select";

//Helper

export default class InviteSent extends Component {
  // constructor(props) {
  //     super(props)
  // }
  render() {
    return (
      <Modal
        className="custom-modal join-with"
        show={ true }
        centered
        onHide={ () => this.props.setDialogOpen("") }
      >
        <div className="box">
          <div className="text-center verify-email">
            <img alt="logo" src={ verfiy } />
            <h4 className="fw-600 font-md text-dark my-4">
              Invitations has been sent successfully!
            </h4>
            <Button
              className="primary-btn mt-5"
              variant="primary"
              onClick={ () => this.props.setDialogOpen("") }
              id="confirmMessage"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
