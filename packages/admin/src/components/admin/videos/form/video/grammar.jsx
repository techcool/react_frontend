import { Editor } from "@tinymce/tinymce-react";
import React, { Fragment } from "react";
import renderHTML from "react-render-html";


const VideoGammar = ({ grammar, grammarTitle, handleChanges }) => {
  return (<Fragment>
    <h1>
      Grammar
    </h1>
    <div className="form-group">
      <label htmlFor="grammar">
        Title:
      </label>
      <input
        type="text"
        id="grammarTitle"
        value={ grammarTitle }
        className="form-control"
        onChange={ handleChanges }
      />
    </div>
    <Editor
      initialValue={ grammar }
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
            id: "grammar",
            value
          }
        });
      } }
    />
    <div>
      <div>
        Preview
      </div>
      <div
        className="p-2 border markdown-preview"
        style={ { width: "100%", height: "500px" } }
      >
        { renderHTML(grammar) }
      </div>
    </div>
  </Fragment>);
};
export default VideoGammar;
