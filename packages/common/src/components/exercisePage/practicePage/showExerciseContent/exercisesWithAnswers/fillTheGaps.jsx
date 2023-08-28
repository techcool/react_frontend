import React, { Fragment } from 'react';
import { VideoScreenWithButtons } from 'common/src/components/shared/others/screenWithButtons';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';
import styledComponents from 'styled-components'
import QuestionsStepper from '../questionsStepper';

const Span = styledComponents.span`color: #000;
font-size:15px;
margin-bottom:10px;
`
const FillTheGaps = ({
  saveNotes,
  saveProgress,
  getVideoDetails,
  getStudentAnswer,
  deleteVocabulary,
  getQuestionsCount,
  getCurrentQuestion,
  updateStudentAnswer,
  getCurrentQuestionIndex,
  getCurrentExerciseAnswers,
  getCurrentExerciseEvaluation,
}) => {

  const { url, grammar, vocabulary, notes, captionUrl, language, _id: video_id, level,
    category,
    title,
    description } = getVideoDetails();
  const question = getCurrentQuestion();

  const evaluation = getCurrentExerciseEvaluation();
  const correctAnswers = getCurrentExerciseAnswers();
  const index = getCurrentQuestionIndex();
  const { t, paragraph, id } = question
  const [fisrtParagraphPart, secondParagraphPart] = paragraph.split('____')

  return <Fragment>
    <VideoScreenWithButtons
      key={`key-${getCurrentQuestionIndex()}`}
      {...{
        url,
        captionUrl,
        grammar,
        vocabulary,
        notes,
        video_id,
        level,
        category,
        title,
        description, saveNotes,
        language,
        t,
        highlight: [{
          time: t,
          text: `Question`
        }],
        deleteVocabulary,
        showCategory:false,
        showVideoTitleAndDescription:false,
      }}
    />
    <QuestionsStepper
      activeStep={getCurrentQuestionIndex()}
      totalSteps={getQuestionsCount()}
    />
   <div className="px-4 mt-4 text-center">
    <Question
      question={question}
      evaluation={evaluation && evaluation[question.id]}
      studentAnswer={getStudentAnswer({ question_id: id })}
      correctAnswer={correctAnswers[index]}
    />
    </div>
  </Fragment>
}

const Question = ({ question, evaluation, studentAnswer, correctAnswer }) => {
  const [fisrtParagraphPart, secondParagraphPart] = question.paragraph.split('____')
  return (
    <Fragment>
      <Span>
        {fisrtParagraphPart}
        {(studentAnswer === '' || studentAnswer=== undefined )
          ?
          <> 
            {' '}
            <span className='font-weight-bold' style={{ textDecoration: 'underline', color: '#000', }}>
              not answered  
            </span>
            {' '}
          </>
          : (!evaluation)
            ? <>
              {' '}
              <span style={{ textDecoration: 'line-through', color: '#f00', }}>
                {studentAnswer} 
              </span>
              {' '}
            </>
            : null
        }
        <span className="text-dark-blue font-weight-bold">
          {' '} {correctAnswer}  {' '}
        </span>
        {secondParagraphPart}
      </Span>
      <ActivityEvaluationMsg evaluation={evaluation} studentAnswer={studentAnswer}
          isFromAnswed={true}/>
    </Fragment>
  )
}

export default FillTheGaps;

/********************Old Code******************/
// const FillTheGaps = ({
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
//   const correctAnswers = getCurrentExerciseAnswers()

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
//     <div className='pt-3'>
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

// const Question = ({ index, question, evaluation, studentAnswer, correctAnswer }) => {
//   const [fisrtParagraphPart, secondParagraphPart] = question.paragraph.split('____')
//   return (
//     <Fragment>
//       <Span>
//       {index + 1} {" . "}
//         {fisrtParagraphPart}
//         {(studentAnswer === '')
//           ? <span className='font-weight-bold' style={{ textDecoration: 'underline', color: '#000', }}>
//              {' '} not answered  {' '}
//            </span>
//           : (!evaluation)
//             ? <span style={{ textDecoration: 'line-through', color: '#f00', }}>
//                {' '} {studentAnswer} {' '}
//             </span>
//             : null
//         }
//         <span className="text-dark-blue font-weight-bold">
//         {' '} {correctAnswer}  {' '}
//         </span>
//         {secondParagraphPart}
//       </Span>
//       <ActivityEvaluationMsg evaluation={evaluation} />
//       {/* <div>
//         {
//           evaluation ?
//             <div className='text-dark-blue font-weight-bold'>Correct</div>
//             :
//             <Fragment>
//               <div className="px-4 my-3">
//                 The correct answer : &nbsp;
//                   <span className="bg-primary">
//                   &nbsp;{correctAnswer}&nbsp;
//                 </span>
//               </div>
//               {
//                 evaluation !== undefined &&
//                 <div className='text-danger font-weight-bold'>Incorrect</div>
//               }
//             </Fragment>
//         }
//       </div> */}
//     </Fragment>
//   )
// }
// export default FillTheGaps;