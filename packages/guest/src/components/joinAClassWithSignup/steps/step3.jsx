import React, { Component, useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";

// For handling form submition and Validations
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Helper
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { StudentGrades } from "common/src/constants";
import FormFields from "common/src/components/helpers/FormField";
import {
  setStudentSignupWithClass,
  SignupWithClass,
  freeTrial,
  setFreeTrailSubComponent,
} from "common/src/old-api/usersActions";
import Login from "../../../containers/guests/login";
import { HOW_DID_HEAR_ABOUT_US_OPTIONS } from "common/src/constants";

class Step3 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ChildStep {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.studentSignupWithClassData,
    freeTrialData: state.user.freeTrialData,
  };
};

export default connect(mapStateToProps, {
  setStudentSignupWithClass,
  SignupWithClass,
  setFreeTrailSubComponent,
  freeTrial,
})(Step3);

function ChildStep(props) {
  const {
    setStudentSignupWithClass,
    setFreeTrailSubComponent,
    SignupWithClass,
    stepper,
    userData,
    freeTrialData,
    isFromFreeTrial,
    freeTrial,
  } = props;

  const validationSchema = yup.object({
    firstname: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z ]+$/, ValidationMessages.freeTrial.firstname.invalid)
      .required(ValidationMessages.freeTrial.firstname.required)
      .max(60, ValidationMessages.freeTrial.firstname.max),
    lastname: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z ]+$/, ValidationMessages.freeTrial.lastname.invalid)
      .required(ValidationMessages.freeTrial.lastname.required)
      .max(60, ValidationMessages.freeTrial.lastname.max),
    username: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
        ValidationMessages.freeTrial.username.match
      )
      .required(ValidationMessages.freeTrial.username.required)
      .max(255, ValidationMessages.freeTrial.username.max),

    hearAboutUs: yup.object({
        value: yup.string().required("Please select hear about us."),
      }),

    grade: yup.object({
      value: yup
        .string()
        .required("Please select grade."),
    }),

    email: yup
      .string()
      .required(ValidationMessages.freeTrial.email.required)
      .email(ValidationMessages.freeTrial.email.invaild)
      .max(255, ValidationMessages.freeTrial.email.max),

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

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      firstname: freeTrialData.FirstName,
      lastname: freeTrialData.LastName,
      email: freeTrialData.Email,
      username:
        freeTrialData.UserName || freeTrialData.FirstName
          ? `${freeTrialData.FirstName}_${freeTrialData.LastName}`
          : "",
    },
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (!isFromFreeTrial) {
      let code = userData.Code;
      const Response = await SignupWithClass({
        code: code,
        role: "student",
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        password: data.password,
        passwordConfirmation: data.confirm,
        grade: data.grade.value,
        hearAboutUs: data.hearAboutUs.value,
        email: data.email.toLowerCase(),
      });
    } else {
      const finalData = {
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        grade: data.grade.value,
        hearAboutUs: data.hearAboutUs.value,
        role: "student",
        email: data.email.toLowerCase(),
        password: data.password,
        passwordConfirmation: data.confirm,
        library: freeTrialData.Library,
      };
      freeTrial(finalData);
    }
  };

  const onBack = (e) => {
    e.preventDefault();
    if (stepper) {
      stepper.previous();
    }
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
         {errors.hearAboutUs && errors.hearAboutUs.value && errors.hearAboutUs.value.message && 
         errors.hearAboutUs.value.message && errors.hearAboutUs.value.message && (
          <div className="text-validation text-danger">
            {errors.hearAboutUs.value.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Grade</Form.Label>
        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              id="grade"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              onFocus={(val) => {
                props.onChange(val);
              }}
              placeholder="Select Grade"
              options={StudentGrades}
            />
          )}
          name="grade"
          control={control}
          defaultValue={{ value: "" }}
        />
        {errors.grade && errors.grade.value && errors.grade.value.message && errors.grade.value.message && (
          <div className="text-validation text-danger">
            {errors.grade.value.message}
          </div>
        )}
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
        {stepper ? (
          <a
            className="back-link"
            id="backBtn"
            href
            title="Back"
            onClick={(e) => onBack(e)}
          >
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
              <path
                d="M6.16334 0.680948C6.46699 0.985908 6.49363 1.46215 6.24393 1.79717L6.16073 1.89313L2.7876 5.25145L6.16073 8.61205C6.46569 8.9157 6.49438 9.39182 6.24612 9.72791L6.16334 9.82423C5.85969 10.1292 5.38357 10.1579 5.04747 9.90963L4.95116 9.82684L0.967159 5.85999C0.661268 5.55541 0.63346 5.07753 0.883734 4.74145L0.967159 4.64519L4.95116 0.678335C5.28662 0.344322 5.82933 0.345492 6.16334 0.680948Z"
                fill="#3B3759"
              />
            </svg>
            Back
          </a>
        ) : (
          <></>
        )}

        <Button
          className="primary-btn"
          type="submit"
          id="step3Submit"
          variant="primary"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
