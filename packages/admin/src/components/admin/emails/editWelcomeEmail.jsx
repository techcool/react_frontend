import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const EditEmailPage = ({ title, content, handleChanges, handleSubmit }) =>
  <form
    onSubmit={ handleSubmit }
  >
    <div className="form-group">
      <label htmlFor="grammar">
        Title:
      </label>
      <input
        type="text"
        id="title"
        value={ title }
        className="form-control"
        onChange={ handleChanges }
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
    <div
      className="d-flex flex-row-reverse m-2"
    >
      <input
        className="btn button-blue"
        type="submit"
        value="Save"
      />
    </div>
  </form>;


export default EditEmailPage;
