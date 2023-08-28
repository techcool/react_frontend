import React from "react";
import styledComponents from "styled-components";

const SmallText = styledComponents.span`
  font-size:10px;
  display: inline-block;
  margin-left:3px;
  color: #aaa;
`;

const GradingForm = ({
  id,
  exercise_id,
  getTeacherReview,
  updateTeacherReview,
}) => (
  <div className="d-flex flex-row-reverse w-100 px-4">
    <form className="form-inline my-2" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor={id} className="px-2">
          <span className="font-weight-bold h4 text-gray">Grade </span>
          <SmallText>(max:100, min:0)</SmallText>{" "}
        </label>
        <input
          id={id}
          className="form-control"
          value={getTeacherReview({ exercise_id })}
          onChange={(e) => {
            updateTeacherReview({
              exercise_id,
              score: e.target.value,
            });
          }}
          placeholder="Student score"
        />
      </div>
    </form>
  </div>
);

export default GradingForm;
