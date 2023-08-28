import React from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { connect, useSelector } from "react-redux";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { setFreeTrialData } from "common/src/old-api/usersActions";
import FormFields from "common/src/components/helpers/FormField";

class Step2 extends React.Component {
  render() {
    return <ChildStep {...this.props} />;
  }
}

export default connect(null, { setFreeTrialData })(Step2);

function ChildStep(props) {
  const { freeTrialData } = useSelector((state) => state.user);
  const { stepper, setFreeTrialData } = props;
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

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: {
      firstname: freeTrialData.FirstName,
      lastname: freeTrialData.LastName,
      username:
        freeTrialData.UserName || freeTrialData.FirstName
          ? `${freeTrialData.FirstName}_${freeTrialData.LastName}`
          : "",
    },
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setFreeTrialData({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      confirm: data.confirm,
    });
    stepper.next();
  };

  const onBack = () => {
    stepper.previous();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Your Account</h2>
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
        <a
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
        </a>
        <Button className="primary-btn" type="submit" variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
}
