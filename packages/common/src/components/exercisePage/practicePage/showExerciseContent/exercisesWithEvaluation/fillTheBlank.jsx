import React, { Fragment } from 'react';
import { VideoScreenWithButtons } from 'common/src/components/shared/others/screenWithButtons';
import OptionBox from 'common/src/components/Forms/optionBox';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';
import QuestionText from 'common/src/components/exercisePage/shared/questionText';
import QuestionsStepper from '../questionsStepper';

const FillTheBlank = ({
  saveNotes,
  getVideoDetails,
  getStudentAnswer,
  deleteVocabulary,
  getQuestionsCount,
  getCurrentQuestion,
  updateStudentAnswer,
  //getCurrentQuestions,
  getCurrentQuestionIndex,
  getCurrentExerciseEvaluation,

}) => {
  const { url, grammar, vocabulary, notes, captionUrl, language, _id: video_id, level,
    category,
    title,
    description } = getVideoDetails();
  //const questions = getCurrentQuestions();
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();

  return <Fragment>
    <VideoScreenWithButtons
      {...{
        url,
        captionUrl,
        grammar,
        vocabulary,
        language,
        notes,
        video_id,
        level,
        category,
        title,
        description,
        saveNotes,
        deleteVocabulary,
        // highlight: questions.map((question, index) => {
        //   return ({
        //     time: question.t,
        //     text: `Question ${index + 1}`
        //   })
        // }),
        highlight: [
          {
            time: question.t,
            text: `Question ${getCurrentQuestionIndex() + 1}`
          }
        ],
        showCategory:false,
        showVideoTitleAndDescription:false,
      }}
    />
    <div className='pt-2'>
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      {/* {
        questions.map(
          (question, index) => */}
      <Question
        index={getCurrentQuestionIndex()+1}
        question={question}
        evaluation={evaluation && evaluation[question.id]}
        studentAnswer={getStudentAnswer({ question_id: question.id })}
        updateStudentAnswer={
          ({ answer }) => updateStudentAnswer({
            question_id: question.id,
            answer,
          })
        }
      />
      {/* )
      } */}
    </div>
  </Fragment>
}

const Question = ({ index, question, evaluation, studentAnswer, updateStudentAnswer }) =>
  <Fragment>
    <QuestionText
      index={index}
      paragraph={question.paragraph}
    />
    <Answers
      {...{
        answers: question.answers,
        studentAnswer,
        updateStudentAnswer
      }}
    />
    <ActivityEvaluationMsg evaluation={evaluation} />
  </Fragment>

const Answers = ({ answers, studentAnswer, updateStudentAnswer }) =>
  answers.map(
    (answer, index) =>
      <OptionBox
        key={index}
        checked={studentAnswer === index}
        onClick={() => updateStudentAnswer({ answer: index })}
        label={answer}
      />
  )

export default FillTheBlank;