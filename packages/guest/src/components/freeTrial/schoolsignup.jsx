import React, { Component, useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import ReactSelect, { components } from "react-select";
import { Country, State } from "country-state-list";
import { useHistory } from "react-router-dom";

// For handling form submition and Validations
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Helper
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";
import {
  setStudentSignupWithClass,
  SignupWithClass,
  freeTrial,
  setFreeTrialData,
  setFreeTrailSubComponent,
} from "common/src/old-api/usersActions";
import Login from "../../containers/guests/login";
import { HOW_DID_HEAR_ABOUT_US_OPTIONS } from "common/src/constants";
import { Nav, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class SchoolSignup extends Component {
  constructor(props) {
    super(props);
    let isRedirect = false;
    if (
      !props.location ||
      !props.location.state ||
      !props.location.state.isValid
    ) {
      isRedirect = true;
    }
    this.state = {
      isRedirect: isRedirect,
    };
  }

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <Container className="h-100 student signup-header justify-content-center d-flex curve-shape stepper-wrapper">
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.freeTrialData,
  };
};

export default connect(mapStateToProps, {
  setStudentSignupWithClass,
  SignupWithClass,
  freeTrial,
  setFreeTrialData,
  setFreeTrailSubComponent,
})(SchoolSignup);

const country = Country.getAllCountries().map((country) => {
  return {
    value: country.isoCode,
    flag: country.isoCode,
    label: country.name,
    phone: country.phonecode,
  };
});
const countryCode = Country.getAllCountries().map((country) => {
  return {
    value: country.phonecode,
    flag: country.isoCode,
    label: `(${country.phonecode})${country.name}`,
  };
});

const SchoolRole = [
  {
    label: "School Admin",
    value: "school_admin",
  },
];

const Control = ({ children, ...props }) => {
  let flag = props.getValue();
  flag = flag[0] ? flag[0].flag : "none";
  return (
    <components.Control {...props}>
      {children}
    </components.Control>
  );
};

function ChildStep(props) {
  const {
    setFreeTrialData,
    SignupWithClass,
    stepper,
    userData,
    isFromFreeTrial,
    freeTrial,
    setFreeTrailSubComponent,
  } = props;
  const history = useHistory();

  const [check, setCheck] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [countrycode, setCountryCode] = React.useState({});
  const [state, setState] = React.useState();

  const validationSchema = yup.object({
    firstname: yup
      .string()
      .required(ValidationMessages.freeTrial.firstname.required)
      .max(255, ValidationMessages.freeTrial.firstname.max),
    lastname: yup
      .string()
      .required(ValidationMessages.freeTrial.lastname.required)
      .max(255, ValidationMessages.freeTrial.lastname.max),
    school: yup
      .string()
      .required(ValidationMessages.freeTrial.school.required)
      .max(255, ValidationMessages.freeTrial.school.max),
    message: yup
      .string()
      .required(ValidationMessages.freeTrial.message.required)
      .max(255, ValidationMessages.freeTrial.message.max),
    country: yup.object({
      value: yup.string().required("Please select Country"),
    }),
    state: yup.object({
      value: yup.string().required("Please select State"),
    }),
    hearAboutUs: yup.object({
      value: yup
        .string()
        .required(ValidationMessages.freeTrial.step3.hearAboutUs.required),
    }),
    role: yup.object({
      value: yup
        .string()
        .required(ValidationMessages.freeTrial.step3.role.required),
    }),
    email: yup
      .string()
      .required(ValidationMessages.freeTrial.email.required)
      .email(ValidationMessages.freeTrial.email.invalid)
      .max(255, ValidationMessages.freeTrial.email.max),
    username: yup
      .string()
      .required(ValidationMessages.freeTrial.username.required)
      .max(255, ValidationMessages.freeTrial.username.max),
    phone: yup
      .string()
      .required("Please select phone")
      .min(10, "Phone Number is invalid")
      .max(10, "Phone Number is invalid"),
    countrycode: yup.object({
      value: yup.string().required("Please select Country Code "),
    }),
  });

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (watch("country").value) {
      let temp = State.getStatesOfCountry(watch("country").value);
      let state = temp.map((state) => {
        return {
          label: state.name,
          value: state.name,
        };
      });
      setState(state);
    }
  }, [watch("country")]);

  const onSubmit = async (data) => {
    const finalData = {
      firstname: data.firstname,
      lastname: data.lastname,
      hearAboutUs: data.hearAboutUs.value,
      type: "school",
      schoolRole: data.role.value,
      library: userData.Library,
      state: data.state.value,
      country: data.country.value,
      school: data.school,
      check: check,
      howCanWeHelp: data.message,
      contact: data.countrycode.value + data.phone,
      username: data.username,
      email: data.email,
    };
    setFreeTrialData(finalData);
    setFreeTrailSubComponent({ subcomponent: "schoolcreatepassword" });
    history.push("/school/createpassword");
  };

  if (userData && userData.haveAccount === "true") {
    return <Login code={userData.Code} stepper={stepper} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up to Create Your Account</h2>
      <Form.Group className="mb-4">
        <Form.Label>First Name</Form.Label>
        <FormFields
          type="text"
          name="firstname"
          placeholder="First Name"
          register={register}
          errors={errors && errors.firstname}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Last Name</Form.Label>
        <FormFields
          type="text"
          name="lastname"
          placeholder="Last Name"
          register={register}
          errors={errors && errors.lastname}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Email</Form.Label>
        <FormFields
          name="email"
          type="text"
          placeholder="Enter email"
          register={register}
          errors={errors && errors.email}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>User Name</Form.Label>
        <FormFields
          type="text"
          name="username"
          placeholder="User Name"
          register={register}
          errors={errors && errors.username}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>How Did You Know About Us</Form.Label>
        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              className="custom-react-select"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              onFocus={(val) => {
                props.onChange(val);
              }}
              placeholder="Select"
              options={HOW_DID_HEAR_ABOUT_US_OPTIONS.map((e) => ({
                value: e,
                label: e,
              }))}
            />
          )}
          name="hearAboutUs"
          control={control}
          defaultValue={{ value: "" }}
        />
        {errors.hearAboutUs &&
          errors.hearAboutUs.value &&
          errors.hearAboutUs.value.message && (
            <div className="text-validation text-danger">
              {errors.hearAboutUs.value.message}
            </div>
          )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Role</Form.Label>
        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              className="custom-react-select"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              onFocus={(val) => {
                props.onChange(val);
              }}
              placeholder="Select Role"
              options={SchoolRole}
            />
          )}
          name="role"
          control={control}
          defaultValue={{ value: "" }}
        />
        {errors.role && errors.role.value && errors.role.value.message && (
          <div className="text-validation text-danger">
            {errors.role.value.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-4 country">
        <Form.Label>Country</Form.Label>
        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              className="custom-react-select"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              components={{ Control }}
              onFocus={(val) => {
                props.onChange(val);
              }}
              placeholder="Select Country"
              options={country}
            />
          )}
          name="country"
          control={control}
          defaultValue={{ value: "" }}
        />
        {errors.country &&
          errors.country.value &&
          errors.country.value.message && (
            <div className="text-validation text-danger">
              {errors.country.value.message}
            </div>
          )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>State</Form.Label>
        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              className="custom-react-select"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              onFocus={(val) => {
                props.onChange(val);
              }}
              placeholder="Select State"
              options={state}
            />
          )}
          name="state"
          control={control}
          defaultValue={{ value: "" }}
        />
        {errors.state && errors.state.value && errors.state.value.message && (
          <div className="text-validation text-danger">
            {errors.state.value.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>School</Form.Label>
        <FormFields
          name="school"
          type="text"
          placeholder="Select By School Name"
          register={register}
          errors={errors && errors.school}
        />
      </Form.Group>
      <Form.Group className="mb-4 phone-number-field">
        <Form.Label>Phone</Form.Label>

        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              className="phone-flag custom-react-select"
              placeholder="Code"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              components={{ Control }}
              onFocus={(val) => {
                props.onChange(val);
              }}
              options={countryCode}
              // isDisabled={true}
            />
          )}
          name="countrycode"
          control={control}
        />
        <FormFields
          placeholder="Phone"
          name="phone"
          type="number"
          register={register}
          errors={errors && errors.phone}
        />
        {errors.countrycode &&
          errors.countrycode.value &&
          errors.countrycode.value.message && (
            <div className="text-validation text-danger">
              {errors.countrycode.value.message}
            </div>
          )}
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>How can We Help you</Form.Label>
        <FormFields
          placeholder="Message"
          name="message"
          as="textarea"
          rows={3}
          type="password"
          register={register}
          errors={errors && errors.message}
        />
      </Form.Group>
      <div className="language custom-checkbox">
        {["checkbox"].map((type) => (
          <div key={`inline-${type}`}>
            <Form.Check
              inline
              label="Be the First to know About the latest product,exclusives and offer from Lit!"
              name="terms"
              type={type}
              value={check}
              onChange={() => {
                setCheck(!check);
              }}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
        {err && <div className="text-validation text-danger">{err}</div>}
      </div>
      <div className="d-flex align-items-center justify-content-between pt-2 mt-3">
        {/* <a
          className="back-link"
          href="#"
          title="Back"
          onClick={() => {
            onBack();
          }}
        >
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path
              d="M6.16334 0.680948C6.46699 0.985908 6.49363 1.46215 6.24393 1.79717L6.16073 1.89313L2.7876 5.25145L6.16073 8.61205C6.46569 8.9157 6.49438 9.39182 6.24612 9.72791L6.16334 9.82423C5.85969 10.1292 5.38357 10.1579 5.04747 9.90963L4.95116 9.82684L0.967159 5.85999C0.661268 5.55541 0.63346 5.07753 0.883734 4.74145L0.967159 4.64519L4.95116 0.678335C5.28662 0.344322 5.82933 0.345492 6.16334 0.680948Z"
              fill="#3B3759"
            />
          </svg>
          Back
        </a> */}
        <Button className="primary-btn" type="submit" variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
}
