import isBlank from "common/src/components/helpers/isBlank";
import { EXERCISE_MATCH_VISUAL_DESCRIPTION } from "common/src/constants";
import React, { Fragment, useState } from "react";
import OptionsTable from "./optionsTable";

const MatchVisualDescription = ({
  practiceExercises,
  addExercise,
  deleteQuestion
}) => {
  const [url, setUrl] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const clean = () => {
    setUrl("");
    setNewAnswer("");
    setAnswers([]);
    setRightAnswer(0);
  };
  const exercise = practiceExercises[EXERCISE_MATCH_VISUAL_DESCRIPTION];
  const questions = (exercise && exercise.questions) || [];
  return (
    <Fragment>
      <h1>
        Match the visual description
      </h1>
      <div className="form-group">
        <label>
          Image url:
        </label>
        <input
          type="text"
          className="form-control"
          value={ url }
          onChange={ e => setUrl(e.target.value) }
        />
      </div>
      <div>
        <div>
          Image preview
        </div>
        <div className="d-flex justify-content-center p-2 border">
          <img
            style={ { width: "500px", height: "auto", maxHeight: "500px" } }
            src={ url }
          />
        </div>
      </div>
      <div>
        Options:<small>You must give at least two options</small>
        <OptionsTable
          { ...{
            answers,
            newAnswer,
            rightAnswer,
            setAnswers,
            setNewAnswer,
            setRightAnswer
          } }
        />
      </div>
      <input
        type="button"
        value="Add the question"
        className="btn btn-primary block full-width m-b"
        onClick={
          () => {
            if (
              isBlank(url) ||
              answers.length < 2
            )
              return;
            addExercise({
              exercise_id: EXERCISE_MATCH_VISUAL_DESCRIPTION,
              question: {
                url,
                answers,
                rightAnswer
              }
            });
            clean();
          } }
      />
      <div>
        Questions list
      </div>
      <table className="table">
        <thead>
          <th>Image</th>
          <th>Options</th>
          <th>The right answers</th>
          <th>Actions</th>
        </thead>
        <tbody>

          {
            questions.map((question, index) =>
              <tr>
                <td>
                  <img
                    style={ {
                      width: "150px",
                      height: "auto",
                      maxHeight: "500px"
                    } }
                    src={ question.url }
                  />
                </td>
                <td>
                  <ul>
                    {
                      question.answers.map((answer, index) =>
                        <li key={ index }>
                          { answer }
                        </li>
                      )
                    }
                  </ul>
                </td>
                <td>
                  { question.answers[question.rightAnswer] }
                </td>
                <td>
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Edit"
                    onClick={ () => {
                      setUrl(question.url);
                      setAnswers(question.answers);
                      setRightAnswer(question.rightAnswer);
                      deleteQuestion({
                        exercise_id: EXERCISE_MATCH_VISUAL_DESCRIPTION,
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
                      exercise_id: EXERCISE_MATCH_VISUAL_DESCRIPTION,
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

export default MatchVisualDescription;
