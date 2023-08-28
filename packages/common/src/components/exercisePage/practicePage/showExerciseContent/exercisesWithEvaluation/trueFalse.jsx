import React, { Fragment } from 'react';
import RadioBox from 'common/src/components/Forms/radioBox';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';
import QuestionsStepper from '../questionsStepper';

const TrueFalse = ({
  getStudentAnswer,
  getQuestionsCount,
  getCurrentQuestion,
  getCurrentQuestions,
  updateStudentAnswer,
  getCurrentQuestionIndex,
  getCurrentExerciseEvaluation,
}) => {
  //const questions = getCurrentQuestions();
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();

  return <Fragment>
    <div className="text-center mt-4 fw-600 h4">True or False</div>
    <QuestionsStepper
      activeStep={getCurrentQuestionIndex()}
      totalSteps={getQuestionsCount()}
    />
    <div className="text-center mt-4" />
    {/* {
      questions.map(
        (question, index) => */}
    <Question
      question={question}
      evaluation={evaluation && evaluation[question.id]}
      studentAnswer={getStudentAnswer({ question_id: question.id })}
      updateStudentAnswer={({ answer }) => updateStudentAnswer({
        question_id: question.id,
        answer,
      })}
    />
    {/* )
    } */}
  </Fragment>
}

const Question = ({ question, evaluation, studentAnswer, updateStudentAnswer }) =>
  <Fragment>
    <div className="text-center">
      <audio className="audio" controls>
        <source src={question.url} />
      </audio>
    </div>
    <div className="my-3  d-flex justify-content-center px-4">
      <RadioBox
        onChange={() => updateStudentAnswer({ answer: true })}
        checked={studentAnswer === true}
        label='True'
      />

      <RadioBox
        onChange={() => updateStudentAnswer({ answer: false })}
        checked={studentAnswer === false}
        label='False'
      />
    </div>
    <div className="text-center px-4">
      <ActivityEvaluationMsg evaluation={evaluation} />
    </div>
  </Fragment>

export default TrueFalse;
