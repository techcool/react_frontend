import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Link } from "react-bootstrap";
import message_img from "common/src/images/message_grey.svg";
import close from "common/src/images/close_icon.svg";

export default function NotHaveAccess(props) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { role, notAuthorized, freeTrialExpired,packId } = props;
  React.useEffect(() => {
    if (role === "teacher" && notAuthorized) {
      setShow(true);
    }
  }, [props]);

  const closePopup = () => {
    setShow(false);
    props.setnotAuthorized(false);
    // if(freeTrialExpired) {
    //   setTimeout(() => {
    //     setShow(true);
    //   }, 5000);
    // }
  };

  const upgradeAccount = () => {
    history.push("/teacher/payments");
  };

  return (
    <>
      <Modal show={show} className="default-modal" closeButton>
        <Modal.Body className="light-modal">
          <p
            onClick={() => closePopup()}
            style={{
              right: "12px",
              position: "absolute",
              top: "6px",
              cursor: "pointer",
            }}
          >
            <img src={close} height="12px" alt="" />
          </p>
          <p className="text-center mb-3 d-flex justify-content-center align-items-center">
            <img src={message_img} height="16px" className="pr-2" alt="" />
            {freeTrialExpired && packId ===0
              ? "Your Trial Period is expired. Kindly purchase a pack to continue"
              : "You don't have access to view this data. Please upgrade your package."}
          </p>
          <div className="d-flex justify-content-center">
            <Button
              className="border-btn mr-3"
              onClick={() => upgradeAccount()}
            >
              Upgrade
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
