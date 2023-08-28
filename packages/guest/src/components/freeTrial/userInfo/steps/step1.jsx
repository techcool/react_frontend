import React, { Component, useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
// For handling form submition and Validations
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Helper
import ValidationMessages from "common/src/components/helpers/validationMessages";
import FormFields from "common/src/components/helpers/FormField";
import {
  setFreeTrialData,
  checkForEmailUniqueness,
} from "common/src/old-api/usersActions";

class Step1 extends Component {
  render() {
    return <ChildStep {...this.props} />;
  }
}

export default connect(null, { setFreeTrialData, checkForEmailUniqueness })(
  Step1
);

// Functional Component used in class for redux
function ChildStep(props) {
  const { setFreeTrialData, stepper, checkForEmailUniqueness } = props;

  const [serverError, setServerError] = useState("");

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(ValidationMessages.freeTrial.email.required)
      .email(ValidationMessages.freeTrial.email.invalid)
      .max(255, ValidationMessages.freeTrial.email.max),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (serverError === "") {
      const response = await checkForEmailUniqueness(data);
      if (response && response.isEmailPass) {
        setServerError("");
        setFreeTrialData({ email: data.email.toLowerCase(), provider: "email" });
        stepper.next();
      } else {
        setServerError(response.message);
      }
    }
  };

  const handleOnChange = () => {
    setServerError("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Enter Your Email</h2>
      <Form.Group className="mb-4">
        <FormFields
          name="email"
          type="text"
          className="input-bg email-bg"
          placeholder="Enter email"
          register={register}
          errors={errors && errors.email}
          onChange={handleOnChange}
        />
        {serverError && (
          <div className="text-validation text-danger">{serverError}</div>
        )}
      </Form.Group>
      <div className="pt-2">
        <Button
          className="primary-btn mt-4 w-100 "
          variant="primary"
          type="submit"
        >
          Continue With Email
        </Button>
      </div>
    </form>
  );
}
