import React, { Fragment } from 'react';
import RadioBox from 'common/src/components/Forms/radioBox';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';

import QuestionsStepper from '../questionsStepper';

const MatchAudioDescription = ({
  getCurrentQuestions,
  updateStudentAnswer,
  getStudentAnswer,
  getCurrentQuestion,
  getQuestionsCount,
  getCurrentQuestionIndex,
  getCurrentExerciseEvaluation,
}) => {
  //const questions = getCurrentQuestions();
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();

  return <Fragment>
     <div className="text-center mt-4 h4 fw-600">Listening Choice</div>
    <QuestionsStepper
      activeStep={getCurrentQuestionIndex()}
      totalSteps={getQuestionsCount()}
    />
    <div style={{ paddingTop: '20px' }} />
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
      <div>
        <audio className="audio" controls>
          <source src={question.url} />
        </audio>
      </div>
      <div className="px-4 my-3">
        <Answers
          {...{
            question_id: question.id,
            answers: question.answers,
            studentAnswer,
            updateStudentAnswer
          }}
        />
      </div>
      <ActivityEvaluationMsg evaluation={evaluation} />
    </div>
  </Fragment>

const Answers = ({ answers, studentAnswer, updateStudentAnswer, question_id }) =>
  <div className="my-3">
    {
      answers.map(
        (answer, index) =>
          <RadioBox
            onChange={() => updateStudentAnswer({ answer: index })}
            checked={studentAnswer === index}
            label={answer}
          />
      )
    }
  </div>
export default MatchAudioDescription;