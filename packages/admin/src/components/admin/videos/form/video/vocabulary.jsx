import React, { Fragment, useState } from "react";

const VideoVocabulary = ({ vocabulary, addVocabulary, deleteVocabularyItem }) => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  return (
    <Fragment>
      <h1>
        Vocabulary
      </h1>
      <div className="form-group">
        <label>Add new word</label>
        <input
          type="text"
          className="form-control"
          value={ word }
          onChange={ e => setWord(e.target.value) }
        />
      </div>
      <div className="form-group">
        <label>Definition</label>
        <textarea
          type="text"
          className="form-control"
          style={ { resize: "none" } }
          value={ definition }
          onChange={ e => setDefinition(e.target.value) }
        />
      </div>
      <input
        type="button"
        className="btn btn-primary block m-b"
        value="Add"
        onClick={ () => {
          if (
            word.match(/^\s*$/g) ||
            definition.match(/^\s*$/g)
          )
            return;
          addVocabulary({ word, definition });
          setWord("");
          setDefinition("");
        } }
      />
      <table className="table">
        <thead>
          <tr>
            <th>Word</th>
            <th>Definition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { vocabulary.map((item, index) =>
            <tr key={ index }>
              <td>
                { item.word }
              </td>
              <td>
                { item.definition }
              </td>
              <td>
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Edit"
                  onClick={ () => {
                    setWord(item.word);
                    setDefinition(item.definition);
                    deleteVocabularyItem({ index });
                  }
                  }
                />

                <input
                  type="button"
                  className="btn btn-danger "
                  value="Delete"
                  onClick={ () => deleteVocabularyItem({ index }) }
                />
              </td>
            </tr>
          ) }
        </tbody>
      </table>
    </Fragment>);
};
export default VideoVocabulary;
