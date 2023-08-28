import { yupResolver } from "@hookform/resolvers/yup";
import FormFields from "common/src/components/helpers/FormField";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { TeacherGrades } from "common/src/constants";
import { addTeacher } from "common/src/old-api/schoolActions";
import { Country, State } from "country-state-list";
import React, { Component } from "react";
import {  Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import ReactSelect, { components } from "react-select";

// For handling form submition and Validations
import * as yup from "yup";
//Helper

class AddTeacherForm extends Component {
  // constructor(props) {
  //     super(props)
  // }
  render() {
    return (
      <ChildStep { ...this.props } />
    );
  }
}


const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, { addTeacher })(AddTeacherForm);

const country = Country.getAllCountries().map((country) => {
  return {
    value: country.isoCode,
    flag: country.isoCode,
    label: country.name,
    phone: country.phonecode
  };
});
const countryCode = Country.getAllCountries().map((country) => {
  return {
    value: country.phonecode,
    flag: country.isoCode,
    label: `(${country.phonecode})${country.name}`
  };
});
const Control = ({ children, ...props }) => {
  return (
    <components.Control { ...props }>
      { children }
    </components.Control>
  );
};

// Functional Component used in class for redux
function ChildStep(props) {

  const { addTeacher, setDialogOpen, accessToken, role } = props;

  const [state, setState] = React.useState(State.getStatesOfCountry("US").map((state) => {
    return {
      label: state.name,
      value: state.name
    };
  }));

  const [countrycode, setCountryCode] = React.useState({
    label: "USA",
    value: "1",
    flag: "US"
  });

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required(ValidationMessages.freeTrial.firstname.required)
      .max(255, ValidationMessages.freeTrial.firstname.max)
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/,ValidationMessages.freeTrial.firstname.invalid),
    lastName: yup
      .string()
      .required(ValidationMessages.freeTrial.lastname.required)
      .max(255, ValidationMessages.freeTrial.lastname.max)
      .matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/,ValidationMessages.freeTrial.lastname.invalid),
    email: yup
      .string()
      .required(ValidationMessages.freeTrial.email.required)
      .email(ValidationMessages.freeTrial.email.invaild)
      .max(255, ValidationMessages.freeTrial.email.max),
    country: yup.object({
      value: yup.string().required("Please select Country")
    }),
    state: yup.object({
      value: yup.string().required(ValidationMessages.freeTrial.state.required)
    }),
    school: yup
      .string()
      .required(ValidationMessages.freeTrial.school.required)
      .min(2, ValidationMessages.freeTrial.school.min)
      .max(255, ValidationMessages.freeTrial.school.max),
    grade: yup.object({
      value: yup.string().required(ValidationMessages.freeTrial.step3.grade.required)
    }),
    contact: yup
      .string()
      .required(ValidationMessages.freeTrial.phone.required)
      .min(10, ValidationMessages.freeTrial.phone.min)
      .max(15, ValidationMessages.freeTrial.phone.max)
  });
  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data) => {
    data.grade = data.grade?.value;
    data.country = data.country?.value;
    data.state = data.state?.value;
    data.accessToken = accessToken;
    data.role= role;
    let response = addTeacher(data);
    if(response){
      setDialogOpen("inviteSent");
    }
  };

  React.useEffect(() => {

    if (watch("country").value) {
      let temp = State.getStatesOfCountry(watch("country").value);
      let state = temp.map((state) => {
        return {
          label: state.name,
          value: state.name
        };
      });
      setCountryCode({
        value: watch("country").phone,
        label: `(${watch("country").phone}) ${watch("country").label}`,
        flag: watch("country").flag
      });
      setState(state);
    }
  }, [watch("country")]);

    
  return (
        
    <Modal className="custom-modal text-left join-with custom-modal-lg"
      show={ true }
      centered
      size="xl"
      onHide={ () => setDialogOpen("") }
    >
      <div className="box">
        { /* <img
                    className="mb-4"
                    width="95"
                    height="56"
                    alt="logo"
                    src={newlogo}
                /> */ }
        <Modal.Header closeButton className="mb-4">
          <Modal.Title>Sign up to Create Your Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <Row>
            <Col xs="12" md="6">
              <Form.Group>
                <FormFields
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  register={ register }
                  errors={ errors && errors.firstName } />
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group>
                <FormFields
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  register={ register }
                  errors={ errors && errors.lastName } />
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group>
                <FormFields
                  type="text"
                  name="email"
                  placeholder="Email"
                  label="Email"
                  register={ register }
                  errors={ errors && errors.email } />
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group className="country">
                <Form.Label>Country</Form.Label>
                <Controller
                  render={ (props) => (
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="custom-react-select"
                      onChange={ (val) => {
                        props.onChange(val);
                      } }
                      closeMenuOnSelect={ true }
                      components={ { Control } }
                      onFocus={ (val) => {
                        props.onChange(val);
                      } }
                      placeholder="Select Country"
                      options={ country }
                      defaultValue={ { value: "USA", label: "United States", flag: "usa" } }
                    />
                  ) }
                  name="country"
                  control={ control }
                  defaultValue={ { value: "" } }
                />
                { errors.country &&
                                    errors.country.value &&
                                    errors.country.value.message && (
                                      <div className="text-validation text-danger">
                    { errors.country.value.message }
                  </div>
                ) }
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group className="mb-4">
                <Form.Label>State</Form.Label>
                <Controller
                  render={ (props) => (
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="custom-react-select"
                      onChange={ (val) => {
                        props.onChange(val);
                      } }
                      closeMenuOnSelect={ true }
                      onFocus={ (val) => {
                        props.onChange(val);
                      } }
                      placeholder="Select State"
                      options={ state }
                    />
                  ) }
                  name="state"
                  control={ control }
                  defaultValue={ { value: "" } }
                />
                { errors.state && errors.state.value && errors.state.value.message && (
                  <div className="text-validation text-danger">
                    { errors.state.value.message }
                  </div>
                ) }
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group>
                <FormFields
                  type="text"
                  name="school"
                  placeholder="School"
                  label="School"
                  register={ register }
                  errors={ errors && errors.school } />
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group className="mb-4 phone-number-field">
                <Form.Label>Phone</Form.Label>
                <Controller
                  render={ (props) => (
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="custom-react-select"
                      placeholder="+1"
                      closeMenuOnSelect={ true }
                      components={ { Control } }
                      options={ countryCode }
                      isDisabled={ true }
                      value={ countrycode }
                    />
                  ) }
                  name="countrycode"
                  control={ control }
                  defaultValue={ { value: "" } }
                />
                <FormFields
                  placeholder="Phone"
                  name="contact"
                  type="number"
                  register={ register }
                  errors={ errors && errors.contact }
                />
              </Form.Group>
            </Col>
            <Col xs="12" md="6">
              <Form.Group className="mb-4">
                <Form.Label>Grade</Form.Label>
                <Controller
                  render={ (props) => (
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="custom-react-select"
                      onChange={ (val) => {
                        props.onChange(val);
                      } }
                      closeMenuOnSelect={ true }
                      onFocus={ (val) => {
                        props.onChange(val);
                      } }
                      placeholder="Select Grade"
                      options={ TeacherGrades }
                    />
                  ) }
                  name="grade"
                  control={ control }
                  defaultValue={ { value: "" } }
                />
                { errors.grade &&
                                    errors.grade.value &&
                                    errors.grade.value.message && (
                                      <div className="text-validation text-danger">
                    { errors.grade.value.message }
                  </div>
                ) }
                { /* {errors.grade && errors.grade.value && errors.grade.value.message && (
                                    <div className="text-validation text-danger">
                                        {errors.grade.value.message}
                                    </div>
                                )} */ }
              </Form.Group>
            </Col>

          </Row>

          <div className="pt-2">
            <Button className="primary-btn mt-4 w-100 " variant="primary" type="submit" id="sendInviteSubmit">
              Send Invitation to Join
            </Button>
          </div>
        </form>
      </div>

    </Modal>


  );
}
