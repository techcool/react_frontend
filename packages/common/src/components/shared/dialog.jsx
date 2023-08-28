import React from "react";
import { Modal } from "react-bootstrap";
export default function Dialog(props) {
  return (

    <Modal  show={props.show} onHide={props.handleClose} size={props.size}>
      <div className="model-popup-outer">
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <div style={{ padding: "20px" }}>{props.children}</div>
      </div>
    </Modal>
    
  );
}
