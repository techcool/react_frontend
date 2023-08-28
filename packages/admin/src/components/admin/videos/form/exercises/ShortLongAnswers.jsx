import isBlank from "common/src/components/helpers/isBlank";
import { EXERCISE_LONG_ANSWER, EXERCISE_SHORT_ANSWER } from "common/src/constants";
import React, { Fragment } from "react";
import styledComponents from "styled-components";

const DeleteButton = styledComponents.div`
&:hover{
  cursor:pointer;
}
`;

const Answers = ({ ACTIVITY_ID, title }) =>
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        paragraph: ""
      };
    }
    clean() {
      this.setState({ paragraph: "" });
    }

    render() {
      const { paragraph } = this.state;
      const {
        practiceExercises,
        addExercise,
        deleteQuestion
      } = this.props;
      const exercise = practiceExercises[ACTIVITY_ID];
      const questions = (exercise && exercise.questions) || [];

      return (
        <Fragment>
          <h1>
            { title }
          </h1>
          <div className="form-group">
            <label>
              Question :
            </label>
            <textarea
              type="text"
              value={ paragraph }
              className="form-control"
              style={ { resize: "none" } }
              onChange={ e => this.setState({ paragraph: e.target.value }) }
            />
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
                  exercise_id: ACTIVITY_ID,
                  question: {
                    paragraph
                  }
                });
                this.clean();
              } }
          />
          <table className="table">
            <thead>
              <th>
                Question
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
                        <input
                          type="button"
                          className="btn btn-primary"
                          value="Edit"
                          onClick={ () => {
                            this.setState({ paragraph: question.paragraph });
                            deleteQuestion({
                              exercise_id: ACTIVITY_ID,
                              question_id: index
                            });
                          }
                          }
                        />
                        <input
                          type="button"
                          className="btn btn-danger"
                          onClick={ () => deleteQuestion({
                            exercise_id: ACTIVITY_ID,
                            question_id: index
                          }) }
                          value="Delete"
                        />
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </Fragment>
      );
    }
  };


export const ShortAnswer = Answers({
  ACTIVITY_ID: EXERCISE_SHORT_ANSWER,
  title: "Short answer"
});

export const LongAnswer = Answers({
  ACTIVITY_ID: EXERCISE_LONG_ANSWER,
  title: "Long answer"
});
