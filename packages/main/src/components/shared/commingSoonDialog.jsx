import FormFields from "common/src/components/helpers/FormField";
import { sendInterest } from "common/src/old-api/usersActions";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
const DialogPopup = ({ show, headerMessage = "Comming Soon!", handleClose, interest }) => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const send = async () => {
    if (email) {
      const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegx.test(String(email).toLowerCase())) {
        await sendInterest({ email: email, interest:interest });
        setEmail("");
        setError("");
      } else {
        setError("please enter valid the email address.");
      }
    } else {
      setError("please enter the email address.");
    }
  };

  const inputOnchange = (e) => {
    setEmail(e.target.value);
    if(e.target.value){
      setError("");
    }
  };

  return (
    <Modal
      // className="custom-modal pick-your-library"
      style={ { zIndex: 1000 } }
      show={ show }
      onHide={ handleClose }
      backdrop="static"
      keyboard={ false }
      className="default-modal"
    >
      <Modal.Header closeButton className="light-modal">
        <p>{ headerMessage }</p>
      </Modal.Header>
      {
        interest &&
          <div className="my-4" style={ { margin:"0 auto" } }>
            <h3 className="my-4 text-center">
              Please leave your email below if you are interested in
              <br/>
              {
                (interest === "SCHOOL") ?
                  "registering a School account"
                  :"the English Language"
              }
            </h3>
            <FormFields
              name="email"
              type="email"
              className="input-bg email-bg"
              placeholder="Enter email"
              onChange={ (e) => inputOnchange(e) }
              value={ email }
            />
            { error && (
              <div className="text-validation text-danger">{ error }</div>
            ) }
            <Button
              className="orange-btn primary-btn test-center mt-4"
              style={ { margin:"0 auto" } }
              variant="primary"
              onClick={ send }
            >
              Submit
            </Button>
          </div>
      }

    </Modal>
  );
};
export default DialogPopup;
