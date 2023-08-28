import isBlank from "common/src/components/helpers/isBlank";
import { EXERCISE_FILL_THE_BLANK } from "common/src/constants";
import React, { Fragment, useState } from "react";
import OptionsTable from "./optionsTable";
import VideoPlayer from "../../../../videoPlayer/videoPlayer";

const FillTheBlankForm = ({
  url,
  practiceExercises,
  addExercise,
  deleteQuestion
}) => {
  const [t, setT] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const clean = () => {
    setT(0);
    setParagraph("");
    setNewAnswer("");
    setAnswers([]);
    setRightAnswer(0);
  };
  const exercise = practiceExercises[EXERCISE_FILL_THE_BLANK];
  const questions = (exercise && exercise.questions) || [];
  return (
    <Fragment>
      <h1 >
        Fill the blank exercises:
      </h1>
      <VideoPlayer
        url={ url }
        onSeekOrPause={ (progress) => setT(Math.floor(progress)) }
        videoHeight="500px"
      />
      <div>
        Please pause the video where the question should be asked
      </div>
      <div className="form-group">
        <label>Time in video (in seconds)</label>
        <input value={ t } className="form-control" />
      </div>
      <div className="form-group">
        <label> Question:</label>
        <input
          type="text"
          className="form-control"
          value={ paragraph }
          onChange={ e => { setParagraph(e.target.value); } }
        />
      </div>
      <div>
        Options <small>You must add at least two options</small>:
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
              exercise_id: EXERCISE_FILL_THE_BLANK,
              question: {
                t,
                paragraph,
                answers,
                rightAnswer
              }
            });
            clean();
          } }
      />
      <p>
        Questions list
      </p>
      <table className="table">
        <thead>
          <th>Question</th>
          <th>time <small>in video (in sec)</small></th>
          <th>Options</th>
          <th>The right answers</th>
          <th>Actions</th>
        </thead>
        <tbody>

          {
            questions.map((question, index) =>
              <tr key={ index }>
                <td>
                  { question.paragraph }
                </td>
                <td>
                  { question.t }
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
                      setT(question.t);
                      setParagraph(question.paragraph);
                      setAnswers(question.answers);
                      setRightAnswer(question.rightAnswer);
                      deleteQuestion({
                        exercise_id: EXERCISE_FILL_THE_BLANK,
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
                      exercise_id: EXERCISE_FILL_THE_BLANK,
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

export default FillTheBlankForm;
