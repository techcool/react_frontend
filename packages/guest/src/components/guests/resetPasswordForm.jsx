import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";

const ResetPasswordForm = ({ handleSubmit: parentHandleSubmit }) => {
  const validationSchema = yup.object({
    password: yup
      .string()
      .required(ValidationMessages.freeTrial.password.required)
      .max(255, ValidationMessages.freeTrial.password.max)
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        ValidationMessages.freeTrial.password.match
      ),
    passwordConfirmation: yup
      .string()
      .required(ValidationMessages.freeTrial.confirmPassword.required)
      .oneOf(
        [yup.ref("password"), null],
        ValidationMessages.freeTrial.confirmPassword.match
      ),
  });

  const { register, handleSubmit, errors, watch } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data, event) => {
    parentHandleSubmit(event, data);
  };

  return (
    <div className="h-100  justify-content-center d-flex curve-shape stepper-wrapper margin-header">
      <Row>
        <Col xs={12}>
          <div className="auth-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="content-h2">Reset Password.</h2>
              <Form.Group className="mb-4">
                <FormFields
                  name="password"
                  label="Password"
                  type="password"
                  className="input-bg"
                  placeholder="Password"
                  register={register}
                  errors={errors && errors.password}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <FormFields
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  className="input-bg"
                  placeholder="Confirm Password"
                  register={register}
                  errors={errors && errors.passwordConfirmation}
                />
              </Form.Group>

              <div className="pt-2">
                <Button
                  className="primary-btn mt-4 w-100 "
                  variant="primary"
                  type="submit"
                >
                  Reset Password
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

export default ResetPasswordForm;
