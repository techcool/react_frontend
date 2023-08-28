import CommingSoonDialog from "common/src/components/shared/commingSoonDialog";
import googleIcon from "common/src/images/google.svg";
import newlogo from "common/src/images/new-logo.svg";
import microsotofficeIcon from "common/src/images/office-365.svg";
import {
  checkForEmailUniqueness,
  setFreeTrailSubComponent,
  setFreeTrialData,
  socialLogin
} from "common/src/old-api/usersActions";
import React, { Component, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import GoogleLogin from "react-google-login";
import MicrosoftLogin from "react-microsoft-login";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

class JoinWith extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
      redirect: false
    };
  }

  componentDidMount() {
    if (this.props?.userData?.Email) {
      this.props.setFreeTrailSubComponent({ subcomponent: "stepper" });
      this.setState({ redirect: true });
    }
  }
  handleClose = () => {
    this.setState({ show: false });
    this.props.setFreeTrailSubComponent({ subcomponent: "" });
  };

  render() {
    return (
      <Modal
        className="custom-modal join-with"
        show={ true }
        centered
        onHide={ this.handleClose }
      >
        <div className="box">
          <img
            className="mb-4"
            width="95"
            height="56"
            alt="logo"
            src={ newlogo }
          />
          <Modal.Header closeButton>
            <Modal.Title>Try our Premium Plan free for 14 days</Modal.Title>
          </Modal.Header>
          { /* Access to hundreds of videos and activities, plus Class Login for
            student access at home. */ }
          <p className="mt-3 mb-3">
            Access our digital library of animated videos, titles, and postwork activities.
            Create classes and give your students access.
          </p>
          <a href="https://www.learnlit.online/packages" target="_blank" rel="noopener noreferrer" className="pb-3">
            Learn about our Premium Plan
          </a>
          <div className="btn-wrapper flex-column pt-0 mt-4">
            { /* <Button className="secondary-btn mb-3 w-100" variant="secondary">
              <img className="mr-3" alt="logo" src={googleIcon} /> Join With
             Google
           </Button> */ }
            <GoogleButton { ...this.props } />
            { /* <MicrosoftButton /> */ }
            { /* <Button
              className="secondary-btn w-100"
              src={newlogo}
              variant="secondary"
            >
              <img className="mr-3" alt="logo" src={microsotofficeIcon} /> Join
              With Office365
            </Button> */ }
          </div>
          <span className="divider"></span>
          <RedirectionButton { ...this.props } />
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.freeTrialData
  };
};
export default connect(mapStateToProps, {
  setFreeTrailSubComponent,
  setFreeTrialData,
  checkForEmailUniqueness
})(JoinWith);

function RedirectionButton(props) {
  const { setFreeTrailSubComponent, redirect } = props;
  const history = useHistory();
  React.useEffect(() => {
    if (props?.userData?.Email) {
      history.push({
        pathname: "/teacher-signup",
        state: { isValid: true, step: 2 }
      });
    }
  }, [props]);
  return (
    <Button
      className="primary-btn join-with-email w-100"
      variant="primary"
      onClick={ () => {
        setFreeTrailSubComponent({ subcomponent: "stepper" });
        history.push({
          pathname: "/teacher-signup",
          state: { isValid: true }
        });
        // window.location.href = "/teacher/signup"
      } }
    >
      Join With Your Email
    </Button>
  );
}

function GoogleButton(props) {
  const {
    setFreeTrailSubComponent,
    setFreeTrialData,
    checkForEmailUniqueness
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const onSocialLogin = async (data) => {
    if (!data.error) {
      setFreeTrailSubComponent({ subcomponent: "stepper" });
      const response = await checkForEmailUniqueness({
        email: data.profileObj.email
      });
      if (response && response.isEmailPass) {
        // setServerError("")
        setFreeTrialData({
          email: data.profileObj.email,
          firstname: data.profileObj.givenName,
          lastname: data.profileObj.familyName,
          provider: "google"
        });
        history.push({
          pathname: "/teacher-signup",
          state: { isValid: true, step: 2 }
        });
      } else {
        // setServerError(response.message);
        // history.push("/login");
        await dispatch(
          socialLogin({
            provider: "google",
            token: data.tokenId,
            uid: data.googleId
          })
        );
      }
    }
  };
  return (
    <>
      <CommingSoonDialog
        show={ show }
        headerMessage={ "Coming in few days!" }
        handleClose={ () => setShow(false) }
      />
      <GoogleLogin
        clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
        render={ (renderProps) => (
          // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          <Button
            onClick={
              () => {
                setShow( true );
                // renderProps.onClick
              }
            }
            // disabled={renderProps.disabled}
            className="secondary-btn mb-3 w-100"
            variant="secondary"
          >
            <img className="mr-3" alt="logo" src={ googleIcon } /> Join With Google
          </Button>
        ) }
        // buttonText="Login"
        buttonText="Join with Google"
        onSuccess={ onSocialLogin }
        onFailure={ onSocialLogin }
        cookiePolicy={ "single_host_origin" }
      />
    </>
  );
}

// function MicrosoftButton(props) {
//   const authHandler = (err, data) => {
//     // console.log(err, data);
//   };

//   return (
//     <MicrosoftLogin
//       clientId={"f8c7976f-3e93-482d-88a3-62a1133cbbc3"}
//       authCallback={authHandler}
//       redirectUri={"https://alexandrtovmach.github.io/react-microsoft-login/"}
//     >
//       <Button className="secondary-btn w-100" src={newlogo} variant="secondary">
//         <img className="mr-3" alt="logo" src={microsotofficeIcon} /> Join With
//         Office365
//       </Button>
//     </MicrosoftLogin>
//   );
// }
