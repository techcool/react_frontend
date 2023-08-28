import React from "react";
import Form from "common/src/components/shared/form";


const JoinClassForm = ({ code, handleChanges, handleSubmit }) => (
  <div className="main-section top-zero">
  <div className="outer-box">
    <h4>Join a Class</h4>
  <div className="row">
    
    <Form title={"Join a class"} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="code">Enter Your Class Code </label>
        <input
          type="text"
          id="code"
          className="form-control"
          onChange={handleChanges}
          value={code}
          required
        />
      </div>
      <button name="submit" className="btn btn-primary block full-width m-b">
      Submit & Join Class
      </button>
    </Form>
    </div>
  </div>
  </div>
);

export default JoinClassForm;
