import classnames from "classnames";
import { EXERCISE_RECORD_RETELL_STORY } from "common/src/constants";
import React, { Fragment, useState } from "react";

const RecordActivity = ({
  practiceExercises,
  addExercise,
  deleteQuestion
}) => {
  const [note, setNote] = useState("");
  const clean = () => {
    setNote("");
  };
  const exercise = practiceExercises[EXERCISE_RECORD_RETELL_STORY];
  const notes = (exercise && exercise.notes) || [];
  const selected = (exercise && exercise.selected) || 0;

  return (<Fragment>
    <h1>
      Record activity
    </h1>
    <div>
      <div className="form-group">
        <label>
          Note
        </label>
        <textarea
          style={ { resize:"none" } }
          type="text"
          value={ note }
          className="form-control"
          onChange={ e => setNote(e.target.value) }
        />
      </div>
      <input
        type="button"
        className="btn btn-primary block full-width m-b"
        value="Add note"
        onClick={ () => {
          addExercise({
            exercise_id: EXERCISE_RECORD_RETELL_STORY,
            question: note
          });
          clean();
        } }
      />
    </div>
    <div>
      Notes list
    </div>
    <table className="table">
      <thead>
        <th scope="col">
          Note
        </th>
        <th scope="col" colSpan="2">
          Action
        </th>
      </thead>
      <tbody>
        { notes.map((note, index) =>
          <tr>
            <td>
              <textarea
                style={ { resize: "none",  height:"auto" } }
                className="form-control"
                value={ note }
                rows="5"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-gramm="false"
                disabled
              />
            </td>
            <td>
              <input
                type="button"
                className={
                  classnames(
                    "btn",
                    { "btn-warning": selected !== index },
                    { "btn-primary": selected === index }
                  )
                }
                value="Select as default"
                onClick={ () => addExercise({
                  exercise_id: EXERCISE_RECORD_RETELL_STORY,
                  selected: index
                }) }
              />
            </td>
            <td>
              <input
                type="button"
                className="btn btn-primary"
                value="Edit"
                onClick={ () => {
                  setNote(note);
                  deleteQuestion({
                    exercise_id: EXERCISE_RECORD_RETELL_STORY,
                    question_id: index
                  });
                }
                }
              />
              <input
                type="button"
                className="btn btn-danger"
                value="Delete"
                onClick={ () => deleteQuestion({
                  exercise_id: EXERCISE_RECORD_RETELL_STORY,
                  question_id: index
                }) }
              />
            </td>
          </tr>
        ) }
      </tbody>
    </table>
  </Fragment>
  );
};
export default RecordActivity;
