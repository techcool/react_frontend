import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { createPassword, setRedux } from "common/src/old-api/usersActions";
import FormFields from "common/src/components/helpers/FormField";
import logo from "common/src/images/logo.jpg";

class CraetePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      createpassword: true,
      redirect: false,
      res: {},
    };
  }
  componentDidMount() {
    if (this.props.accessToken) {
      this.setState({ show: true });
    }
    // if(this.props.firstName)
    // {
    //   this.setState({ createpassword: false });
    // }
  }
  handleClose = async () => {
    this.setState({ show: false });
    await this.props.setRedux(this.state.res);
    // this.props.history.push('/teacher/home')
    this.setState({ redirect: true });
  };
  handleShow = () => this.setState({ show: true });

  setCreatePassword = (data) => {
    const {
      accessToken,
      role,
      firstName,
      lastName,
      email: receivedEmail,
    } = data;
    this.setState({
      createpassword: false,
      res: {
        loggedIn: true,
        accessToken,
        role,
        firstName,
        lastName,
        receivedEmail,
      },
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/teacher/home" />;
    }
    return (
      <Modal show={this.state.show} centered>
        {/* <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header> */}

        <div style={{ padding: "32px 32px" }}>
          {this.state.createpassword ? (
            <ChildStep
              {...this.props}
              setCreatePassword={this.setCreatePassword}
            />
          ) : (
            <Success close={this.handleClose} />
          )}
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.freeTrialData,
    accessToken: state.user.accessToken,
    firstName: state.user.firstName,
  };
};

export default connect(mapStateToProps, { createPassword, setRedux })(
  CraetePassword
);

function ChildStep(props) {
  const { createPassword, accessToken, setCreatePassword } = props;

  const validationSchema = yup.object({
    password: yup
      .string()
      .required(ValidationMessages.freeTrial.password.required)
      .max(255, ValidationMessages.freeTrial.password.max)
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        ValidationMessages.freeTrial.password.match
      ),
    confirm: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match"),
      }),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const res = await createPassword({
      token: accessToken,
      password: data.password,
      passwordConfirmation: data.confirm,
    });
    if (res) {
      setCreatePassword(res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="content-h2 text-center mb-0">Create Your Password</h2>
      <p className="text-center mb-3">
        Your Email Has been Verified now add your password to continue
      </p>
      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <FormFields
          placeholder="Password"
          name="password"
          type="password"
          register={register}
          errors={errors && errors.password}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Confirm Password</Form.Label>
        <FormFields
          placeholder="Confirm Password"
          name="confirm"
          type="password"
          register={register}
          errors={errors && errors.confirm}
        />
      </Form.Group>
      <div className="d-flex align-items-center justify-content-between pt-2">
        <Button
          className="primary-btn btn-block"
          type="submit"
          variant="primary"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}

function Success(props) {
  return (
    <div className="text-center verify-email">
      <img alt="Logo" src={logo} style={{ width: "auto", height: "60px" }} />
      <h3 className="font-md text-dark mt-3 mb-2 fw-600">Congratulations</h3>
      <p>Account has been created successfully</p>
      <Button
        className="primary-btn btn-block"
        type="submit"
        variant="primary"
        onClick={() => props.close()}
      >
        Continue
      </Button>
    </div>
  );
}
