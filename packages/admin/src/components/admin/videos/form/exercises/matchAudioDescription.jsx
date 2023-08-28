import isBlank from "common/src/components/helpers/isBlank";
import ShouldRender from "common/src/components/shared/ShouldRender";
import { EXERCISE_MATCH_AUDIO_DESCRIPTION } from "common/src/constants";
import React, { Fragment, useState } from "react";
import OptionsTable from "./optionsTable";

const MatchAudioDescription = ({
  practiceExercises,
  addExercise,
  deleteQuestion,
  editQuestion
}) => {
  const [paragraph, setParagraph] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [questionIdToEdit, setQuestionIdToEdit] = useState(null);

  const clean = () => {
    setNewAnswer("");
    setParagraph("");
    setAnswers([]);
    setRightAnswer(0);
  };
  const exercise = practiceExercises[EXERCISE_MATCH_AUDIO_DESCRIPTION];
  const questions = (exercise && exercise.questions) || [];
  let selectedQuestion;
  if (isEditing) {
    selectedQuestion = questions.filter(q => q.id === questionIdToEdit)[0];
  }

  return (
    <Fragment>
      <h1>
        Match the audio description
      </h1>
      <ShouldRender
        condition={ !isEditing }
      >
        <div className="form-group">
          <label>
            Question:
          </label>
          <textarea
            className="form-control"
            style={ { resize: "none" } }
            value={ paragraph }
            onChange={ e => setParagraph(e.target.value) }
          />
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
                isBlank(paragraph) ||
                answers.length < 2
              )
                return;
              addExercise({
                exercise_id: EXERCISE_MATCH_AUDIO_DESCRIPTION,
                question: {
                  paragraph,
                  answers,
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
            Question:
          </label>
          <textarea
            className="form-control"
            value={ selectedQuestion && selectedQuestion.paragraph }
            style={ { resize: "none" } }
            onChange={ e => editQuestion({
              exercise_id: EXERCISE_MATCH_AUDIO_DESCRIPTION,
              question: {
                ...selectedQuestion,
                paragraph: e.target.value
              }
            }) }
          />
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
          value="Finish editing"
          className="btn btn-primary block full-width m-b"
          onClick={
            () => {
              if (
                !selectedQuestion ||
                !selectedQuestion.paragraph ||
                isBlank(selectedQuestion.paragraph) ||
                answers.length < 2
              )
                return;
              editQuestion({
                exercise_id: EXERCISE_MATCH_AUDIO_DESCRIPTION,
                question: {
                  ...selectedQuestion,
                  answers,
                  rightAnswer
                }
              });
              clean();
              setIsEditing(false);
            } }
        />
      </ShouldRender>
      <div>
        Questions list
      </div>
      <table className="table">
        <thead>
          <th>Question</th>
          <th>Options</th>
          <th>The right answers</th>
          <th>Actions</th>
        </thead>
        <tbody>

          {
            questions.map((question, index) =>
              <tr>
                <td>
                  { question.paragraph }
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
                    onClick={
                      () => {
                        const { answers, rightAnswer } = question;
                        setQuestionIdToEdit(question.id);
                        setIsEditing(true);
                        setNewAnswer("");
                        setAnswers(answers);
                        setRightAnswer(rightAnswer);
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
                        exercise_id: EXERCISE_MATCH_AUDIO_DESCRIPTION,
                        question_id: index
                      });
                    } }
                  />
                </td>
              </tr>
            ) }
        </tbody>
      </table>

    </Fragment>
  );
};

export default MatchAudioDescription;
