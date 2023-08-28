import del_img from "common/src/images/delete_img.svg";
import React from "react";
import { Button, Modal } from "react-bootstrap";
export default function DeleteDialog({
  show,
  handleClose,
  handleDelete,
  name,
  isFrom
}) {
  return (
    <div>
      <Modal show={ show } centered className="class-modal">
        <Modal.Body>
          <div className="text-center">
            <img src={ del_img } height="80px" alt="" />
            <h4 className="h4 text-dark font-weight-bold mt-4">
              { isFrom == "student" ? "Remove" : "Delete" }{ " " }
              { name ? name : "Class" }
            </h4>
            <p className="para">
              Do you confirm to { isFrom == "student" ? "Remove" : "Delete" }?
            </p>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                className="primary-btn"
                onClick={ handleClose }
              >
                No
              </Button>
              <Button
                variant="danger"
                className="danger-btn primary-btn ml-3"
                onClick={ handleDelete }
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
