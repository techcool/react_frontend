import Select from "common/src/components/Forms/select";
import { Submit } from "common/src/components/Forms/submit";
import Form from "common/src/components/shared/form";
import ShouldRender from "common/src/components/shared/ShouldRender";
import React, { Fragment } from "react";

const SendVerificationsEmailsPage = ({
  target,
  processing,
  handleChanges,
  handleSubmit
}) =>
  <Fragment>
    <ShouldRender
      condition={ !processing }
    >
      <Form
        title="Send verification emails"
        onSubmit={ handleSubmit }
      >
        <Select
          id="target"
          placeholder="Target"
          classNamePrefix="react-select"
          isClearable={ false }
          isSearchable={ false }
          value={
            [
              { value: "teacher", label: "Teachers" },
              { value: "student", label: "Students" }
            ].filter(e => e.value === target)[0]
          }
          options={ [
            { value: "teacher", label: "Teachers" },
            { value: "student", label: "Students" }
          ] }
          onChange={ handleChanges }
        />
        <Submit
          text="Send!"
          disabled={ processing }
        />
      </Form>
    </ShouldRender>
    <ShouldRender
      condition={ processing }
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </ShouldRender>
  </Fragment>;

export {
  SendVerificationsEmailsPage
};
