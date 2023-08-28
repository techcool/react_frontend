import close from "common/src/images/close_icon.svg";
import message_img from "common/src/images/message_grey.svg";
import {
  isVerified as isVerifiedEmail,
  resendVerificationEmail
} from "common/src/old-api/usersActions";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {  useDispatch } from "react-redux";
import UpdateUserEmail from "./changeEmail";
const IsVerifiedAccount= (props)=>  <Child { ...props } />;

export default IsVerifiedAccount;

function Child(props) {
  const [show, setShow] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const { email, isVerified, role } = props;
  React.useEffect(() => {
    if (email && isVerified === false && role === "teacher") {
      (async () => {
        await isVerifiedEmail({ email });
      })();
      setShow(true);
    }
  }, [email, isVerified, role ]);
  const closePopup = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 5000);
  };
  const resendVerification = async () => {
    await resendVerificationEmail({ email });
  };
  const ChangeYourEmail = () => {
    setChangeEmail(!changeEmail);
  };
  return (
    <>
      <Modal show={ show } className="default-modal" closeButton>
        { changeEmail ? (
          <UpdateUserEmail close={ ChangeYourEmail } />
        ) : (
          <>
            <Modal.Body className="light-modal">
              <p
                onClick={ () => closePopup() }
                style={ {
                  right: "12px",
                  position: "absolute",
                  top: "6px",
                  cursor: "pointer"
                } }
              >
                <img src={ close } height="12px" alt="" />
              </p>
              <p className="text-center mb-3 d-flex justify-content-center align-items-center">
                <img src={ message_img } height="16px" className="pr-2" alt="" />
                Please Verify Your Email address ({ email })
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  className="border-btn mr-3"
                  onClick={ () => resendVerification() }
                >
                  Resend Verification Email
                </Button>
                <Button
                  className="border-btn"
                  onClick={ () => ChangeYourEmail() }
                >
                  Change Your Email Address
                </Button>
              </div>
            </Modal.Body>
          </>
        ) }
      </Modal>
    </>
  );
}
