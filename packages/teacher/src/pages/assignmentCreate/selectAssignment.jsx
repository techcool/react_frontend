import assignments_blue from "common/src/images/assignments_blue.svg";
import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function SelectAssignment({ handlePage, handleTitle }) {
  const [show, setShow] = useState(false);
  const handleForward = () => {
    handlePage(1);
  };

  const showModal = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="px-4 py-5 main-section top-zero">
      <div>
        <Row className="card shadow-none border-0 px-3 py-4 mx-0 mb-5">
          <Col className="mb-5">
            <h2 className="card-heading">
              <img src={ assignments_blue } className="pr-2" alt="" /> Create
              Assignments
            </h2>
          </Col>
          <Col>
          </Col>
          <Col>
            <div className="d-flex mt-4">
              <Button
                variant="primary"
                className="primary-btn mr-3"
                onClick={ () => {
                  handleForward();
                } }
              >
                Video Assignment
              </Button>
              <Button variant="primary" className="primary-btn orange-btn mr-3" onClick={ showModal }>
                Storybook Assignment
              </Button>

              <Modal show={ show } className="default-modal" onHide={ handleClose }>
                <Modal.Body className="light-modal">
                  <p>Coming Soon!</p>
                </Modal.Body>
              </Modal>

            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}


