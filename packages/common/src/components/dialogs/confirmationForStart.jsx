import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
export default function ConfirmationForStart() {

  const [show, setShow] = useState(true);
  
  const handleClose= () => {
    setShow(false);
  }

  const history = useHistory();
  return (
    <div>
      <Modal show={show} className="class-modal " centered onHide={handleClose}>
        {
          <Modal.Body>
            <div>
              <div className="text-center">
                {/* <img src={} height="85px" alt="" /> */}
                <h4 className="h5 text-dark fw-600 my-3">Are you ready?</h4>
                <div className="btn-wrapper d-flex justify-content-center pt-0 mt-4">
                  <Button
                    className="primary-btn mr-3 primary-btn-outline mb-3 w-auto"
                    type="button"
                    onClick={() => {
                      history.push("/student/postwork");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="primary-btn mb-3 w-auto"
                    variant="secondary"
                    type="button"
                    onClick={handleClose}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        }
      </Modal>
    </div>
  );
}
