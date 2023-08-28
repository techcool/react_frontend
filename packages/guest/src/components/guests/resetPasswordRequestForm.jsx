import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Country } from "country-state-list";
import ReactSelect, { components } from "react-select";
import classnames from "classnames";
import Template from "./template";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";

const country = Country.getAllCountries().map((country) => {
  return {
    value: country.phonecode,
    flag: country.isoCode,
    label: `(${country.phonecode}) ${country.name}`,
  };
});
const Control = ({ children, ...props }) => {
  let flag = props.getValue();
  flag = flag[0] ? flag[0].flag : "none";
  return (
    <components.Control {...props}>
      {children}
    </components.Control>
  );
};

const ResetPasswordRequestForm = ({ handleSubmit: parentHandleSubmit }) => {
  const [via, setVia] = useState("email");

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(ValidationMessages.freeTrial.email_username.required)
      .max(255, ValidationMessages.freeTrial.email_username.max),
  });

  const { register, handleSubmit, errors, watch } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data, event) => {
    let dataToSend = { email: data.email };
    event.target.reset();
    parentHandleSubmit(event, dataToSend);
  };

  const handleAnotherWay = () => {
    if (via === "email") {
      setVia("phone");
    } else {
      setVia("email");
    }
  };

  if (via === "phone")
    return (
      <ForgotViaPhone
        parentHandleSubmit={parentHandleSubmit}
        handleAnotherWay={handleAnotherWay}
      />
    );
  return (
    <div className="h-100  justify-content-center d-flex curve-shape stepper-wrapper margin-header">
      <Row>
        <Col xs={12}>
          <div className="auth-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="content-h2">
                Please Enter Your Email to Reset Your Password.
              </h2>
              <Form.Group className="mb-4">
                <FormFields
                  name="email"
                  label="Email"
                  type="text"
                  className="input-bg"
                  placeholder="Email"
                  register={register}
                  errors={errors && errors.email}
                />
              </Form.Group>
              {/* <a className="text-link text-default">Forgot Password?</a> */}
              <a
                to="#"
                className="text-link text-default"
                onClick={() => setVia("phone")}
              >
                Try Another Way!
              </a>
              <div className="pt-2">
                <Button
                  className="primary-btn mt-4 w-100 "
                  variant="primary"
                  type="submit"
                >
                  Send Email
                </Button>
                <Link
                  to="/login"
                  className="primary-btn mt-4 w-100 "
                  variant="primary"
                  type="submit"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

function ForgotViaPhone(props) {
  const { parentHandleSubmit, handleAnotherWay } = props;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    phone: yup
      .string()
      .required(ValidationMessages.freeTrial.phone.required)
      .matches(phoneRegExp, ValidationMessages.freeTrial.phone.invalid)
      .max(15, ValidationMessages.freeTrial.phone.max),
    code: yup.object({
      value: yup.string().required("Please select Country code"),
    }),
  });

  const { register, handleSubmit, errors, watch, control } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      code: { value: "1", label: "(+1) USA", flag: "usa" },
    },
  });

  const onSubmit = (data, event) => {
    let dataToSend = { contact: data.code.value + data.phone, type: "phone" };
    event.target.reset();
    parentHandleSubmit(event, dataToSend);
  };

  return (
    <div className="h-100  justify-content-center d-flex curve-shape stepper-wrapper margin-header">
      <Row>
        <Col xs={12}>
          <div className="auth-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="content-h2">
                Please Enter Your Phone Number to Reset Your Password.
              </h2>
              <Form.Group className="phone-number-field">
                <Form.Label>Phone Number </Form.Label>
                <Controller
                  render={(props) => (
                    <ReactSelect
                      defaultValue={props.value}
                      classNamePrefix="react-select"
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
                  name="code"
                  control={control}
                />
                <FormFields
                  name="phone"
                  type="number"
                  className="input-bg"
                  placeholder="Phone Number"
                  register={register}
                  errors={errors && errors.phone}
                />
                {errors.code &&
                  errors.code.value &&
                  errors.code.value.message && (
                    <div className="text-validation text-danger">
                      {errors.code.value.message}
                    </div>
                  )}
              </Form.Group>
              {/* <a className="text-link text-default">Forgot Password?</a> */}
              <a
                to="#"
                className="text-link text-default"
                onClick={handleAnotherWay}
              >
                Try Another Way!
              </a>
              <div className="pt-2">
                <Button
                  className="primary-btn mt-4 w-100 "
                  variant="primary"
                  type="submit"
                >
                  Send SMS
                </Button>
                <Link
                  to="/login"
                  className="primary-btn mt-4 w-100 "
                  variant="primary"
                  type="submit"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default ResetPasswordRequestForm;
