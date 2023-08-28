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
import { setStudentSignupWithClass } from "common/src/old-api/usersActions";
import { checkForClassCode } from "common/src/old-api/classesActions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
class Step1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ChildStep {...this.props} />;
  }
}

export default connect(null, { setStudentSignupWithClass })(Step1);

// Functional Component used in class for redux
function ChildStep(props) {
  // comment
  const { setStudentSignupWithClass, stepper } = props;

  const [serverError, setServerError] = useState("");
  const location = useLocation();
  const validationSchema = yup.object({
    classCode: yup.string().required(ValidationMessages.classCode.required),
  });

  const { register, handleSubmit, errors, control } = useForm({
    mode: "all",
    defaultValues: {
      classCode: queryString.parse(location.search).code
        ? queryString.parse(location.search).code
        : "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (serverError === "") {
      const response = await checkForClassCode({ code: data.classCode });
      if (response && response.isCodePass) {
        setStudentSignupWithClass({ code: data.classCode });
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
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Enter Your Class Code</h2>
        <Form.Group className="mb-4">
          <FormFields
            name="classCode"
            type="text"
            className="input-bg email-bg"
            placeholder="Enter Class Code"
            register={register}
            errors={errors && errors.classCode}
            onChange={handleOnChange}
          />
          {serverError && (
            <div className="text-validation text-danger">{serverError}</div>
          )}
        </Form.Group>
        <div className="pt-2">
          <Button
            id="step1Submit"
            className="primary-btn mt-4 w-100 "
            variant="primary"
            type="submit"
          >
            Submit & Continue
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
