import React, {useState} from "react";
// import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import queryString from "query-string";
import { Form, Button, Row, Col } from "react-bootstrap";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";
import GoogleLogin from "react-google-login";
import MicrosoftLogin from "react-microsoft-login";
import CommingSoonDialog from 'common/src/components/shared/commingSoonDialog';
import googleIcon from "common/src/images/google.svg";
import newlogo from "common/src/images/new-logo.svg";
import microsotofficeIcon from "common/src/images/office-365.svg";
import {
  setFreeTrailSubComponent,
  setFreeTrialData,
  checkForEmailUniqueness,
  socialLogin,
} from "common/src/old-api/usersActions";
// Functional Component used in class for redux

export default function LoginForm(props) {

  const dispatch = useDispatch();

  const location = useLocation();

  const isOpenFreeTrail = queryString.parse(location.search).signup;

  const [freeTrail, setFreeTrail] = useState(true);

  const { handleSubmit: parentHandleSubmit, code, stepper } = props;

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(ValidationMessages.freeTrial.email_username.required)
      .max(255, ValidationMessages.freeTrial.email.max),
    password: yup
      .string()
      .required(ValidationMessages.freeTrial.password.required),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data, e) => {
    parentHandleSubmit(e, data);
  };

  const setFreeTrailPopup = () => {
    dispatch(setFreeTrailSubComponent({ subcomponent: "signupas" }));
    setFreeTrail(false);
  }

  return (
    <>
    { isOpenFreeTrail && freeTrail && setFreeTrailPopup() }
    <div className="h-100  justify-content-center d-flex curve-shape stepper-wrapper margin-header">
      <Row>
        <Col xs={12}>
          <div className="auth-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="content-h2">Login in & Join Your Class</h2>
              <Form.Group className="mb-4">
                <FormFields
                  name="email"
                  label="Email or Username"
                  type="text"
                  className="input-bg"
                  placeholder="Enter Email or Username"
                  register={register}
                  errors={errors && errors.email}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FormFields
                  name="password"
                  label="Password"
                  type="password"
                  className="input-bg"
                  placeholder="Enter Password"
                  register={register}
                  errors={errors && errors.password}
                />
              </Form.Group>
              {/* <a className="text-link text-default">Forgot Password?</a> */}
              <a
                href="/forgot-password"
                className="text-link text-default"
                id="forgetpassword"
              >
                Forgot Password?
              </a>
              <div className="pt-2">
                <Button
                  className="primary-btn mt-4 w-100"
                  id="submit_btn"
                  variant="primary"
                  type="submit"
                >
                  Log In
                </Button>
              </div>
              <div className="or-divider my-4">OR</div>
              <div className="btn-wrapper flex-column pt-0 mt-4">
                <span className="text-dark mb-3 text-center">Log In</span>
                <GoogleButton />
                {/* <Button
                  className="secondary-btn w-100"
                  src={newlogo}
                  variant="secondary"
                >
                  <img className="mr-3" alt="logo" src={microsotofficeIcon} />{" "}
                  Join With Office365
                </Button> */}
                {/* <MicrosoftButton /> */}
              </div>
              {code && (
                <span
                  className="back-link mt-4 d-inline-block"
                  href="#"
                  title="Back"
                  onClick={() => stepper.previous()}
                >
                  <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                    <path
                      d="M6.16334 0.680948C6.46699 0.985908 6.49363 1.46215 6.24393 1.79717L6.16073 1.89313L2.7876 5.25145L6.16073 8.61205C6.46569 8.9157 6.49438 9.39182 6.24612 9.72791L6.16334 9.82423C5.85969 10.1292 5.38357 10.1579 5.04747 9.90963L4.95116 9.82684L0.967159 5.85999C0.661268 5.55541 0.63346 5.07753 0.883734 4.74145L0.967159 4.64519L4.95116 0.678335C5.28662 0.344322 5.82933 0.345492 6.16334 0.680948Z"
                      fill="#3B3759"
                    />
                  </svg>
                  Back
                </span>
              )}
            </form>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
}
function GoogleButton(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  // const history = useHistory();

  const onSocialLogin = async (data) => {
    if (!data.error) {
      const response = await dispatch(
        checkForEmailUniqueness({
          email: data?.profileObj?.email,
        })
      );
      if (response && response.isEmailPass) {
        // setServerError(""
        await dispatch(
          setFreeTrialData({
            email: data.profileObj.email,
            firstname: data.profileObj.givenName,
            lastname: data.profileObj.familyName,
          })
        );
        // history.push({
        //   pathname: "/teacher/signup",
        //   state: { isValid: true, step: 2 },
        // });
        await dispatch(setFreeTrailSubComponent({ subcomponent: "signupas" }));
      } else {
        await dispatch(
          socialLogin({
            provider: "google",
            token: data.tokenId,
            uid: data.googleId,
            accessToken: data.accessToken,
          })
        );
        // setServerError(response.message);
        // history.push("/login");
      }
    }
  };
  return (
    <React.Fragment>
      <CommingSoonDialog
        show={show}
        headerMessage={"Coming in few days!"}
        handleClose={() => setShow(false)}
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          <Button
            onClick={
              () => {
                setShow(true)
                // renderProps.onClick
              }
            }
            //onClick={renderProps.onClick}
            //disabled={renderProps.disabled}
            className="secondary-btn mb-3 w-100"
            variant="secondary"
          >
            <img className="mr-3" alt="logo" src={googleIcon} /> Join With Google
          </Button>
        )}
        buttonText="Login"
        // buttonText="Join with Google"
        onSuccess={onSocialLogin}
        onFailure={onSocialLogin}
        cookiePolicy={"single_host_origin"}
      // scope="https://www.googleapis.com/auth/classroom.courses.readonly"
      />
    </React.Fragment>
  );
}

function MicrosoftButton(props) {
  const authHandler = (err, data) => {
    // console.log(err, data);
  };

  return (
    <MicrosoftLogin
      clientId={"f8c7976f-3e93-482d-88a3-62a1133cbbc3"}
      authCallback={authHandler}
      redirectUri={"https://alexandrtovmach.github.io/react-microsoft-login/"}
    >
      <Button className="secondary-btn w-100" src={newlogo} variant="secondary">
        <img className="mr-3" alt="logo" src={microsotofficeIcon} /> Join With
        Office365
      </Button>
    </MicrosoftLogin>
  );
}
