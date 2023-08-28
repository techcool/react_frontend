import classnames from "classnames";
import {
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH
} from "common/src/constants";
import React, { Fragment, useState } from "react";

const RewriteTheStoryInEnglish = ({
  practiceExercises,
  addExercise,
  deleteQuestion
}) => {
  const [note, setNote] = useState("");
  const clean = () => {
    setNote("");
  };
  const exercise = practiceExercises[EXERCISE_REWRITE_THE_STORY_IN_ENGLISH];
  const notes = (exercise && exercise.notes) || [];
  const selected = (exercise && exercise.selected) || 0;

  return (<Fragment>
    <h1>
      Rewrite the story in english
    </h1>
    <div>
      <div className="form-group">
        <label>
          Note
        </label>
        <textarea
          style={ { resize: "none" } }
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
            exercise_id: EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
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
        <th scope="col" colSpan="3">
          Action
        </th>
      </thead>
      <tbody>
        { notes.map((note, index) =>
          <tr key={ index }>
            <td>
              <textarea
                style={ { resize: "none", height: "auto" } }
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
                  exercise_id: EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
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
                    exercise_id: EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
                    question_id: index
                  });
                }
                }
              />
            </td>
            <td>
              <input
                type="button"
                className="btn btn-danger"
                value="Delete"
                onClick={ () => deleteQuestion({
                  exercise_id: EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
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

export default RewriteTheStoryInEnglish;
