import { Editor } from "@tinymce/tinymce-react";
import Select from "common/src/components/Forms/select";
import { Submit } from "common/src/components/Forms/submit";
import Form from "common/src/components/shared/form";
import ShouldRender from "common/src/components/shared/ShouldRender";
import React, { Fragment } from "react";

const SendEmailPage = ({
  target,
  processing,
  title,
  content,
  handleChanges,
  handleSubmit
}) =>
  <Fragment>
    <ShouldRender
      condition={ processing }
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </ShouldRender>
    <ShouldRender
      condition={ !processing }
    >
      <Form
        style={ { maxWidth: "800px" } }
        title="Send emails to users"
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
        <div className="form-group">
          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={ title }
            className="form-control"
            onChange={ handleChanges }
            required={ true }
          />
        </div>
        <Editor
          initialValue={ content }
          init={ {
            height: 500,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          image |\
          bullist numlist outdent indent | removeformat | help"
          } }
          onEditorChange={ (value) => {
            handleChanges({
              target: {
                id: "content",
                value
              }
            });
          } }
        />
        <div className="py-3"/>
        <Submit
          text="Send!"
          disabled={ processing }
        />
      </Form>
    </ShouldRender>
  </Fragment>;

export {
  SendEmailPage
};
