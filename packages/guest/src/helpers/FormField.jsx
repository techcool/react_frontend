import React from "react";
import { FormControl } from "react-bootstrap";

const FormFields = ({ register, errors, label, id, type, ...inputProps }) => {
  return (
    <React.Fragment>
      {label && (
        <label htmlFor={id} className="custom-label">
          {label}
        </label>
      )}

      <FormControl ref={register} id={id} type={type} {...inputProps} />
      {errors && (
        <div className="text-validation text-danger">{errors.message}</div>
      )}
    </React.Fragment>
  );
};
export default FormFields;
