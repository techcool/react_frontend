import React, { Fragment } from 'react';
import QuestionTitle from 'common/src/components/exercisePage/shared/questionTitle';
import QuestionText from 'common/src/components/exercisePage/shared/questionText';
import SpanishKeyboard from 'common/src/components/shared/spanishKeyboard';
import QuestionsStepper from '../questionsStepper';

const Answer = ({ rows }) => ({
  saveProgress,
  getStudentAnswer,
  getQuestionsCount,
  getCurrentQuestion,
  updateStudentAnswer,
  // getCurrentQuestions,
  getCurrentQuestionIndex,
}) => {
  // const questions = getCurrentQuestions();
  const question = getCurrentQuestion();
  return (
    // questions.map((question, index) =>
    //   <Fragment key={index}>
    <Fragment>
      {/* <QuestionTitle
          style={{
            marginTop: '50px'
          }}
          text={`Question ${index + 1} of ${getQuestionsCount()}`}
        /> */}
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      <QuestionText
        //index={index + 1}
        paragraph={question.paragraph}
        className="mt-3"
      />
      <div className="form-group my-3 px-4">
        <textarea
          className="form-control"
          style={{ resize: "none", fontSize: '16px' }}
          rows={rows}
          value={getStudentAnswer({ question_id: question.id }) || ""}
          onChange={(e) => updateStudentAnswer({
            question_id: question.id,
            answer: e.target.value,
            save: false,
          })}
          onBlur={() => saveProgress()}
        />
        {/* <SpanishKeyboard
          onClick={(letter) => updateStudentAnswer({
            question_id: question.id,
            answer: `${getStudentAnswer({ question_id: question.id }) || ""}${letter}`
          })}
        /> */}
      </div>
    </Fragment>
    // )
  )
}

export const ShortAnswer = Answer({ rows: 10 });
export const LongAnswer = Answer({ rows: 15 });