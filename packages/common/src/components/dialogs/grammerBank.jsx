import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

export default function GrammarBank({ show, handleClose, grammar, title }) {
  return (
    <div>
      <Modal
        size="lg"
        show={show}
        className="class-modal wd-100"
        centered
        onHide={handleClose}
      >
        {
          <Modal.Body>
            <div>
              <h2 className="medium-heading  pb-3">{title}</h2>
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: grammar }}
              ></div>

              {/* <div className="btn-wrapper flex-column pt-0 mt-4">
                                <Button
                                    className="primary-btn mb-3 w-100"
                                    variant="secondary"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div> */}
            </div>
          </Modal.Body>
        }
      </Modal>
    </div>
  );
}
