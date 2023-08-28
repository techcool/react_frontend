import React, { Fragment } from 'react';
import classnames from 'classnames';
import OptionBox from 'common/src/components/Forms/optionBox';
import { VideoScreenWithButtons } from 'common/src/components/shared/others/screenWithButtons';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';
import QuestionText from 'common/src/components/exercisePage/shared/questionText';

import QuestionsStepper from '../questionsStepper';
import RadioBox, { GreenRadioBox, OrangeRadioBox } from 'common/src/components/Forms/radioBox';

const FillTheBlank = ({
  saveNotes,
  getVideoDetails,
  getStudentAnswer,
  deleteVocabulary,
  getQuestionsCount,
  getCurrentQuestion,
  updateStudentAnswer,
  getCurrentQuestionIndex,
  getCurrentExerciseAnswers,
  getCurrentExerciseEvaluation
}) => {
  const { url, grammar, vocabulary, notes, captionUrl, language, _id: video_id, level,
    category,
    title,
    description } = getVideoDetails();
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();
  const correctAnswers = getCurrentExerciseAnswers();
  const currentQuestionIndex = getCurrentQuestionIndex();
  const { t, paragraph, answers, id } = question;

  return <Fragment>
    <VideoScreenWithButtons
      key={`key-${getCurrentQuestionIndex()}`}
      // hide={true}
      {...{
        url,
        captionUrl,
        grammar,
        vocabulary,
        notes,
        video_id,
        saveNotes,
        level,
        category,
        title,
        description,
        language,
        t,
        highlight: [{
          time: t,
          text: `Question`
        }],
        deleteVocabulary,
        showCategory: false,
        showVideoTitleAndDescription: false,
      }}
    />
    <QuestionsStepper
      activeStep={getCurrentQuestionIndex()}
      totalSteps={getQuestionsCount()}
    />
    <div className="px-4 mt-4">
      <QuestionText
        index={getCurrentQuestionIndex() + 1}
        paragraph={paragraph}
      />
      <Answers
        {...{
          answers: answers,
          studentAnswer: getStudentAnswer({ question_id: id }),
          correctAnswer: correctAnswers[currentQuestionIndex],
        }}
      />
      <ActivityEvaluationMsg 
      evaluation={evaluation && evaluation[id]}
      studentAnswer = {getStudentAnswer({ question_id: id })}
      isFromAnswed={true}
      />
    </div>
  </Fragment>
}


//export default FillTheBlank;

// const FillTheBlank = ({
//   getVideoDetails,
//   getCurrentQuestions,
//   getStudentAnswer,
//   getCurrentExerciseEvaluation,
//   getCurrentExerciseAnswers,
//   saveNotes,
//   deleteVocabulary,
// }) => {
//   const { url, grammar, vocabulary, notes, captionUrl,language } = getVideoDetails();
//   const questions = getCurrentQuestions();
//   const evaluation = getCurrentExerciseEvaluation();
//   const correctAnswers = getCurrentExerciseAnswers();

//   return <Fragment>

//     <VideoScreenWithButtons
//       {...{
//         url,
//         captionUrl,
//         grammar,
//         vocabulary,
//         language,
//         notes,
//         saveNotes,
//         deleteVocabulary,
//         highlight: questions.map((question, index) => {
//           return ({
//             time: question.t,
//             text: `Question ${index + 1}`
//           })
//         })

//       }}
//     />
//     <div className='pt-2'>
//       {
//         questions.map(
//           (question, index) =>
//             <Question
//               index={index}
//               question={question}
//               evaluation={evaluation && evaluation[question.id]}
//               studentAnswer={getStudentAnswer({ question_id: question.id })}
//               correctAnswer={correctAnswers[question.id]}
//             />
//         )
//       }
//     </div>
//   </Fragment>
// }

// const Question = ({ index, question, evaluation, studentAnswer, correctAnswer }) =>
//   <Fragment>
//     <QuestionText
//       index={index + 1}
//       paragraph={question.paragraph}
//     />
//     <Answers
//       {...{
//         answers: question.answers,
//         studentAnswer,
//         correctAnswer,
//       }}
//     />
//     <ActivityEvaluationMsg evaluation={evaluation} />
//   </Fragment>

const Answers = ({ answers, studentAnswer, correctAnswer }) =>
  <div className="d-flex align-center">
    {
      answers.map(
        (answer, index) =>
          index === correctAnswer ? (
            <GreenRadioBox checked={true} label={answer} />
          ) : studentAnswer === index ? (
            <OrangeRadioBox checked={false} label={answer} />
          ) : (
            <RadioBox checked={false} label={answer} />
          )
      )
    }
  </div>

export default FillTheBlank;