import React, { Fragment } from 'react';
import RadioBox from 'common/src/components/Forms/radioBox';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';
import QuestionsStepper from '../questionsStepper';

const MatchVisualDescription = ({
  //getCurrentQuestions,
  getStudentAnswer,
  getQuestionsCount,
  getCurrentQuestion,
  updateStudentAnswer,
  getCurrentQuestionIndex,
  getCurrentExerciseEvaluation,
}) => {
  //const questions = getCurrentQuestions();
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();

  return <Fragment>
    <div style={{ paddingTop: '20px' }} />
    <div className="mb-4">
    <QuestionsStepper
      activeStep={getCurrentQuestionIndex()}
      totalSteps={getQuestionsCount()}
    />
    </div>
 

    {/* {
      questions.map(
        (question, index) => */}
    <Question
      // key={index}
      // index={index}
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
    <div className="row px-4">
      <div className="col-md-5">
        <img src={question.url} className={'w-100'} />
      </div>
      <div className="col-md-7 pl-md-0">
        <div className="my-3 px-4">
          <Answers
            {...{
              question_id: question.id,
              answers: question.answers,
              studentAnswer,
              updateStudentAnswer
            }}
          />
          <ActivityEvaluationMsg evaluation={evaluation} />
        </div>
        
      </div>
    </div>

  </Fragment>

const Answers = ({ answers, studentAnswer, updateStudentAnswer, question_id }) =>
  <React.Fragment>
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
  </React.Fragment>

export default MatchVisualDescription;