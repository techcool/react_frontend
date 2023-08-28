import React from "react";
import { FormOut } from "common/src/components/shared/form";
import { FormControl, Button, Form } from "react-bootstrap";
import Container from "common/src/components/shared/container";
import Input from "./input";
import Buttons from "./buttons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";
const ChangePassword = ({
  password,
  newPassword,
  newPasswordConfirmation,
  handleChanges,
  handleSubmit: userSubmit,
}) => {
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
  return (
    <FormOut title="Change Password" onSubmit={handleSubmit(userSubmit)}>
      <Input
        id="password"
        type="password"
        placeholder={"Current password"}
        label="Current password :"
        value={password}
        onChange={handleChanges}
        autocomplete="off"
        required={true}
      />
      {/* <Input
        id="newPassword"
        label="New password :"
        type="password"
        value={newPassword}
        onChange={handleChanges}
        autocomplete="off"
        required={true}
      />
      <Input
        id="newPasswordConfirmation"
        label="New password confirmation:"
        type="password"
        value={newPasswordConfirmation}
        onChange={handleChanges}
        autocomplete="off"
        required={true}
      /> */}
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
      <Buttons submitLabel={"Update"} cancelLabel={"Cancel"} />
    </FormOut>
  );
};

export default ChangePassword;
