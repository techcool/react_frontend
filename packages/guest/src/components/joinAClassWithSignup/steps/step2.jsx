import React, { useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { connect } from 'react-redux';
import ValidationMessages from "common/src/components/helpers/validationMessages";
import { setStudentSignupWithClass } from 'common/src/old-api/usersActions';
import FormFields from "common/src/components/helpers/FormField";

class Step2 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ChildStep {...this.props} />
    )
  }
}

export default connect(null, { setStudentSignupWithClass })(Step2);

function ChildStep(props) {

  const { stepper, setStudentSignupWithClass } = props;

  const [selectedValue, setSelectedValue] = useState('');
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    if (selectedValue !== '') {
      setIsFormSubmit(true);
      setStudentSignupWithClass({ haveAccount: selectedValue })
      stepper.next();
    }

  };

  const handleRadio = (event) => {
    setSelectedValue(event.target.value);
  }

  const onBack = () => {
    stepper.previous();
  }
  return (
    <div className="language custom-radio join-class">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2>You Only Need One Lit Account for All Of Your Classes.</h2>
        {["radio"].map((type) => (
          <div key={`inline-${type}`}>
            <Form.Check
              inline
              label="I'm new to Lit. Create my account."
              className="flag-1"
              value={false}
              name="haveAccount"
              type={type}
              ref={register}
              onChange={(e) => {
                handleRadio(e);
              }}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="I already have a Lit account."
              value={true}
              name="haveAccount"
              className="flag-2"
              type={type}
              ref={register}
              onChange={(e) => {
                handleRadio(e);
              }}
              id={`inline-${type}-2`}
            />
          </div>
        ))}
        {isFormSubmit && selectedValue === '' && (
          <div className="text-validation text-danger">Please choose library option</div>
        )}
        <Button id="step2Submit" type="submit" className="primary-btn  w-100 mt-3" variant="primary" onClick={() => setIsFormSubmit(true)}>
          Continue
                            </Button>
      </form>
    </div>
  );
}
