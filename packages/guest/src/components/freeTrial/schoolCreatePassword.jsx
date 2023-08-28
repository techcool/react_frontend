import React from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { connect } from 'react-redux';
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { setFreeTrialData,freeTrial } from 'common/src/old-api/usersActions';
import FormFields from "common/src/components/helpers/FormField";
import { Nav, Container, Row, Col } from "react-bootstrap";

class SchoolCreatePassword extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container className="h-100 studentsignup-header justify-content-center d-flex curve-shape stepper-wrapper">
        <Row>
          <Col xs={12}>
            <div className="bs-stepper-content">
              <div className="content">
                <ChildStep {...this.props} />;
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
    )
  }
}
const mapStateToProps = (state) => {
    return {
      userData: state.user.freeTrialData,
    };
  };
export default connect(mapStateToProps, { setFreeTrialData,freeTrial })(SchoolCreatePassword);

function ChildStep(props) {
  const { stepper, setFreeTrialData ,freeTrial,userData} = props;

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
        is: password => (password && password.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
      })
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const finalData = {
      firstName: userData.FirstName,
      lastName: userData.LastName,
      hearAboutUs: userData.Reference,
      contact: userData.Phone,
      school: userData.School,
      // role:userData.SIGN_UP_TYPE,
      email: userData.Email,
      password: data.password,
      passwordConfirmation: data.confirm,
      country: userData.Country,
      state: userData.State,
      library: userData.Library,
      howCanWeHelp: userData.howCanWeHelp,
      role: 'school_admin',
      subscribed: userData.SchoolCheck,
      technicalDirector:userData.SchoolRole
  }
  freeTrial(finalData,stepper)

  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Your Password</h2>
      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <FormFields placeholder="Password" name="password" type="password"
          register={register}
          errors={errors && errors.password} />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Confirm Password</Form.Label>
        <FormFields placeholder="Confirm Password" name="confirm" type="password"
          register={register}
          errors={errors && errors.confirm} />
      </Form.Group>
      <div className="d-flex align-items-center justify-content-between pt-2">
        <Button className="primary-btn" type="submit" variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
}
