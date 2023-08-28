import React, { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  Form,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { createStudentNewPassword } from "common/src/old-api/classesActions";
import FormFields from "common/src/components/helpers/FormField";
import logo from "common/src/images//logo.jpg";
import { Link } from "react-router-dom";
export default function ChangePassword(props) {

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
    const { id, accessToken } = props;
    const res = await createStudentNewPassword({
      accessToken,
      id,
      data: {
        newPassword: data.password,
        newPasswordConfirmation: data.confirm,
      },
    });
    // const res = await createPassword({
    //   token: accessToken,
    //   password: data.password,
    //   passwordConfirmation: data.confirm,
    // });
    if (res) {
      props.handleClose()
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="content-h2 text-center mb-0">Password Reset</h2>
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
