import isBlank from "common/src/components/helpers/isBlank";
import { EXERCISE_FILL_THE_GAPS } from "common/src/constants";
import React, { Fragment, useState } from "react";
import VideoPlayer from "../../../../videoPlayer/videoPlayer";
const FillTheGaps = ({
  url,
  practiceExercises,
  addExercise,
  deleteQuestion
}) => {
  const [t, setT] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const clean = () => {
    setT(0);
    setParagraph("");
    setRightAnswer("");
  };
  const exercise = practiceExercises[EXERCISE_FILL_THE_GAPS];
  const questions = (exercise && exercise.questions) || [];
  return (
    <Fragment>
      <h1>
        Fill the gaps
      </h1>
      <VideoPlayer
        url={ url }
        onSeekOrPause={ (progress) => { setT(Math.floor(progress)); } }
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
        <label> Question: <small>use "_____"  (4 underscores) to refer to the gap</small></label>
        <input
          type="text"
          className="form-control"
          value={ paragraph }
          onChange={ e => setParagraph(e.target.value) }
        />
      </div>
      <div className="form-group">
        <label>The correct answer</label>
        <input
          type="text"
          className="form-control"
          value={ rightAnswer }
          onChange={ e => setRightAnswer(e.target.value) }
        />
      </div>
      <input
        type="button"
        value="Add the question"
        className="btn btn-primary block full-width m-b"
        onClick={
          () => {
            if (
              paragraph.search("____") === -1 ||
              isBlank(rightAnswer)
            )
              return;
            addExercise({
              exercise_id: EXERCISE_FILL_THE_GAPS,
              question: {
                t,
                paragraph,
                rightAnswer
              }
            });
            clean();
          }
        }
      />
      <div>
        Questions list
      </div>
      <table className="table">
        <thead>
          <th>Question</th>
          <th>time <small>in video (in sec)</small></th>
          <th>The answer</th>
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
                  { question.rightAnswer }
                </td>
                <td>
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Edit"
                    onClick={ () => {
                      setT(question.t);
                      setParagraph(question.paragraph);
                      setRightAnswer(question.rightAnswer);
                      deleteQuestion({
                        exercise_id: EXERCISE_FILL_THE_GAPS,
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
                      exercise_id: EXERCISE_FILL_THE_GAPS,
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

export default FillTheGaps;
