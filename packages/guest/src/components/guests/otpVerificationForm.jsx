import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";

const OtpVerificationForm = ({ handleSubmit: parentHandleSubmit }) => {
  const validationSchema = yup.object({
    otp: yup.string().required(ValidationMessages.Otp.required),
  });

  const { register, handleSubmit, errors, watch } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data, event) => {
    parentHandleSubmit(event, data);
  };

  return (
    <div className="h-100 min-curve justify-content-center d-flex curve-shape stepper-wrapper margin-header">
      <Row>
        <Col xs={12}>
          <div className="auth-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="content-h2">OTP Verification</h2>
              <Form.Group className="mb-4">
                <FormFields
                  name="otp"
                  label="OTP"
                  type="number"
                  className="input-bg"
                  placeholder="OTP"
                  register={register}
                  errors={errors && errors.otp}
                />
              </Form.Group>

              <div className="pt-2">
                <Button
                  className="primary-btn mt-4 w-100 "
                  variant="primary"
                  type="submit"
                >
                  Verify Otp
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

export default OtpVerificationForm;
