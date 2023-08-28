import React from "react";
import { Modal, Button, Form } from "react-bootstrap";




export default function QuestionChanges({
    show,
    handleClose,
}) {
    return (
        <div>
            <Modal show={show} className="class-modal" centered onHide={handleClose}>
                {(
                    <Modal.Body >
                        <div>
                            <h2 className="content-h2 border-bottom pb-3">Question Changes</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" placeholder="Which of these best describes respiration?" rows={5} className="input-bg" />
                                </Form.Group>
                            </Form>

                            <div className="btn-wrapper flex-column pt-0 mt-4">
                                <Button
                                    className="primary-btn mb-3 w-100"
                                    variant="secondary"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                )}
            </Modal>
        </div>
    );
}
