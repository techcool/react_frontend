import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import speaker from "common/src/images//speaker_grey.svg";
import congrats from "common/src/images//green_check.svg";
import { useHistory } from "react-router";
export default function Congrats({ show, handleClose }) {
  const history = useHistory();
  return (
    <div>
      <Modal show={show} className="class-modal " centered onHide={handleClose}>
        {
          <Modal.Body>
            <div>
              <div className="text-center">
                <img src={congrats} height="85px" alt="" />
                <h4 className="h5 text-dark fw-600 my-3">Congratulations!</h4>
                <p className="para mb-3">
                  Assignment has been created successfully
                </p>
                <div className="btn-wrapper flex-column pt-0 mt-4">
                  <Button
                    className="primary-btn mb-3 w-100"
                    variant="secondary"
                    type="submit"
                    onClick={() => {
                      history.push("/teacher/postwork");
                    }}
                  >
                    View All Assignments
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
