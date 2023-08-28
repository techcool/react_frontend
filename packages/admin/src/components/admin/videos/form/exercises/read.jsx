import { EXERCISE_READ } from "common/src/constants";
import React, { Fragment } from "react";

const Read = ({
  practiceExercises,
  addExercise
}) => {
  const exercise = practiceExercises[EXERCISE_READ];
  const textPreview = (exercise && exercise.text) || "";
  return (
    <Fragment>
      <h1>
        Read activity
      </h1>
      <div className="my-2">
        <label>
          Text
        </label>
        <textarea
          type="text"
          rows="15"
          value={ textPreview }
          className="form-control"
          style={ { resize: "none" } }
          onChange={ e => addExercise(
            {
              exercise_id: EXERCISE_READ,
              question: e.target.value
            }
          ) }
        />
      </div>
    </Fragment>
  );
};
export default Read;
