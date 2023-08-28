import React from "react";
import { Modal, Button } from "react-bootstrap";
import del_img from "common/src/images//delete_img.svg";
export default function DeleteDialog({
  show,
  handleClose,
  handleConfirm,
  title,
  description
}) {
  return (
    <div>
      <Modal show={show} centered className="class-modal">
        <Modal.Body>
          <div className="text-center">
            <img src={del_img} height="80px" alt="" />
            <h4 className="h4 text-dark font-weight-bold mt-4">
              {title}
            </h4>
            <p className="para">
              {description}
            </p>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                className="primary-btn"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                variant="danger"
                className="danger-btn primary-btn ml-3"
                onClick={handleConfirm}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
