import isBlank from "common/src/components/helpers/isBlank";
import ShouldRender from "common/src/components/shared/ShouldRender";
import { EXERCISE_TRUE_FALSE } from "common/src/constants";
import React, { Fragment, useState } from "react";

const TrueFalse = ({
  addExercise,
  practiceExercises,
  deleteQuestion,
  editQuestion
}) => {
  const [paragraph, setParagraph] = useState("");
  const [rightAnswer, setRightAnswer] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [questionIdToEdit, setQuestionIdToEdit] = useState(null);
  const clean = () => {
    setParagraph("");
    setRightAnswer(true);
  };
  const exercise = practiceExercises[EXERCISE_TRUE_FALSE];
  const questions = (exercise && exercise.questions) || [];
  let selectedQuestion;
  if (isEditing) {
    selectedQuestion = questions.filter(q => q.id === questionIdToEdit)[0];
  }

  return (
    <Fragment>
      <h1>
        True or False
      </h1>
      <ShouldRender
        condition={ !isEditing }
      >
        <div className="form-group">
          <label>
            Question :
          </label>
          <textarea
            type="text"
            value={ paragraph }
            className="form-control"
            style={ { resize: "none" } }
            onChange={ e => setParagraph(e.target.value) }
          />
        </div>
        <div>
          <div>
            The correct answer:
          </div>
          <div className="form-check">
            <input
              id="trueFalseNewQuestionRadioTrue"
              type="radio"
              checked={ rightAnswer }
              onChange={ () => setRightAnswer(true) }
            />
            <label htmlFor="trueFalseNewQuestionRadioTrue">True</label>
          </div>
          <div className="form-check">
            <input
              id="trueFalseNewQuestionRadioFalse"
              type="radio"
              checked={ !rightAnswer }
              onChange={ () => setRightAnswer(false) }
            />
            <label htmlFor="trueFalseNewQuestionRadioFalse">False</label>
          </div>
        </div>
        <input
          type="button"
          value="Add the question"
          className="btn btn-primary block full-width m-b"
          onClick={
            () => {
              if (isBlank(paragraph))
                return;
              addExercise({
                exercise_id: EXERCISE_TRUE_FALSE,
                question: {
                  paragraph,
                  rightAnswer
                }
              });
              clean();
            } }
        />
      </ShouldRender>
      <ShouldRender
        condition={ isEditing }
      >
        <div className="form-group">
          <label>
            Question :
          </label>
          <textarea
            type="text"
            value={ selectedQuestion && selectedQuestion.paragraph }
            className="form-control"
            style={ { resize: "none" } }
            onChange={ e => editQuestion({
              exercise_id: EXERCISE_TRUE_FALSE,
              question: {
                ...selectedQuestion,
                paragraph: e.target.value
              }
            })
            }
          />
        </div>
        <div>
          <div>
            The correct answer:
          </div>
          <div className="form-check">
            <input
              id="trueFalseNewQuestionRadioTrue"
              type="radio"
              checked={ selectedQuestion && selectedQuestion.rightAnswer }
              onChange={ () => editQuestion({
                exercise_id: EXERCISE_TRUE_FALSE,
                question: {
                  ...selectedQuestion,
                  rightAnswer: true
                }
              })
              }
            />
            <label htmlFor="trueFalseNewQuestionRadioTrue">True</label>
          </div>
          <div className="form-check">
            <input
              id="trueFalseNewQuestionRadioFalse"
              type="radio"
              checked={ selectedQuestion && !selectedQuestion.rightAnswer }
              onChange={ () => editQuestion({
                exercise_id: EXERCISE_TRUE_FALSE,
                question: {
                  ...selectedQuestion,
                  rightAnswer: false
                }
              })
              }
            />
            <label htmlFor="trueFalseNewQuestionRadioFalse">False</label>
          </div>
        </div>
        <input
          type="button"
          value="Finish editing"
          className="btn btn-primary block full-width m-b"
          onClick={
            () => {
              clean();
              setIsEditing(false);
            } }
        />
      </ShouldRender>
      <table className="table">
        <thead>
          <th>
            Question
          </th>
          <th>
            Answer
          </th>
          <th>
            Actions
          </th>
        </thead>
        <tbody>
          {
            questions.map(
              (question, index) =>
                <tr>
                  <td>
                    { question.paragraph }
                  </td>
                  <td>
                    { question.rightAnswer && "True" }
                    { !question.rightAnswer && "False" }
                  </td>
                  <td>
                    <input
                      type="button"
                      className="btn btn-primary"
                      value="Edit"
                      onClick={
                        () => {
                          setQuestionIdToEdit(question.id);
                          setIsEditing(true);
                        }
                      }
                    />
                    <input
                      type="button"
                      className="btn btn-danger"
                      value="Delete"
                      onClick={ () => {
                        setIsEditing(false);
                        deleteQuestion({
                          exercise_id: EXERCISE_TRUE_FALSE,
                          question_id: index
                        });
                      } }
                    />
                  </td>
                </tr>
            )
          }
        </tbody>
      </table>
    </Fragment>
  );
};
export default TrueFalse;
