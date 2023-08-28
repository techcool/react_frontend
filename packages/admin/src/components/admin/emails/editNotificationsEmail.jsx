import { Editor } from "@tinymce/tinymce-react";
import { Submit } from "common/src/components/Forms/submit";
import Form from "common/src/components/shared/form";
import React from "react";

const EditNotificationsEmailPage = ({
  formTitle,
  title,
  content,
  handleChanges,
  handleSubmit
}) =>
  <Form
    style={ { maxWidth: "800px" } }
    title={ formTitle }
    onSubmit={ handleSubmit }
  >
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
    <div className="form-group">
      <label htmlFor="content">
        Content:
      </label>
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
    </div>
    <div className="py-3" />
    <Submit
      text="Send!"
    />
  </Form>;

export {
  EditNotificationsEmailPage
};
