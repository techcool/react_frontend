import React, { Fragment } from "react";
import RadioBox, {
  GreenRadioBox,
  OrangeRadioBox,
} from "common/src/components/Forms/radioBox";
import ActivityEvaluationMsg from "common/src/components/exercisePage/shared/activityEvaluationMsg.jsx";
import hashString from "hash-string";
import QuestionsStepper from "../questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const MatchAudioDescription = ({
  getStudentAnswer,
  getQuestionsCount,
  getCurrentQuestion,
  updateStudentAnswer,
  getCurrentQuestionIndex,
  getCurrentExerciseAnswers,
  getCurrentExerciseEvaluation,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
}) => {
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();
  const correctAnswers = getCurrentExerciseAnswers();
  const { url, answers, id } = question;
  const studentAnswer = getStudentAnswer({ question_id: id });
  const {
    url: Url,
    grammar,
    vocabulary,
    notes: Notes,
    captionUrl,
    language,
    _id: video_id,
    level,
    category,
    title,
    description,
  } = getVideoDetails();
  const { t } = getCurrentQuestion();
  return (
    <Fragment>
      <VideoScreenWithButtons
        key={`key-${getCurrentQuestionIndex()}`}
        hide={true}
        {...{
          url: Url,
          captionUrl,
          grammar,
          vocabulary,
          notes: Notes,
          video_id,
          level,
          category,
          title,
          description,
          saveNotes,
          language,
          t,
          highlight: [
            {
              time: t || 0,
              text: `Question`,
            },
          ],
          deleteVocabulary,
        }}
      />
      <div className="text-center mt-4 h4 fw-600">Listening Choice</div>
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      <div className="text-center mt-4">
        <audio className="audio" key={`key-${hashString(url)}`} controls>
          <source src={url} />
        </audio>
      </div>
      <div className="my-3 px-4 text-center">
        {answers.map((answer, index) =>
          index === correctAnswers[id] ? (
            <GreenRadioBox checked={true} label={answer} />
          ) : studentAnswer === index &&
            studentAnswer !== correctAnswers[id] ? (
            <OrangeRadioBox checked={false} label={answer} />
          ) : (
            <RadioBox checked={false} label={answer} />
          )
        )}
      </div>
      <ActivityEvaluationMsg
        evaluation={evaluation && evaluation[question.id]}
        studentAnswer={studentAnswer}
        isFromAnswed={true}
      />
    </Fragment>
  );
};

export default MatchAudioDescription;

/**************************** old code *********************/
// const MatchAudioDescription = ({
//   getCurrentQuestions,
//   getStudentAnswer,
//   getCurrentExerciseEvaluation,
//   getCurrentExerciseAnswers,
// }) => {
//   const questions = getCurrentQuestions();
//   const evaluation = getCurrentExerciseEvaluation();
//   const correctAnswers = getCurrentExerciseAnswers()

//   return <Fragment>
//     <div style={{ paddingTop: '20px' }}/>
//       {
//         questions.map(
//           (question, index) =>
//             <Question
//               key={index}
//               index={index}
//               question={question}
//               evaluation={evaluation && evaluation[question.id]}
//               studentAnswer={getStudentAnswer({ question_id: question.id })}
//               correctAnswer={correctAnswers[question.id]}
//             />
//         )
//       }
//   </Fragment>
//     }

// const Question = ({index, question, evaluation, studentAnswer, correctAnswer}) =>
//   <Fragment>
//       <div>
//         {index + 1} {" . "}
//         <audio controls>
//           <source src={question.url} />
//         </audio>
//       </div>
//       <div className="my-3">
//         <Answers
//           {...{
//             question_id: question.id,
//             answers: question.answers,
//             studentAnswer,
//             correctAnswer,
//           }}
//         />
//       </div>
//       <ActivityEvaluationMsg evaluation={evaluation} />
//     </Fragment>

//     const Answers = ({question_id, answers, studentAnswer, correctAnswer}) =>
//   <div className="my-3">
//       {
//         answers.map(
//           (answer, index) =>
//             (
//               (index === correctAnswer)
//                 ? <GreenRadioBox
//                   checked={true}
//                   label={answer}
//                 />
//                 : (studentAnswer === index && studentAnswer !== correctAnswer)
//                   ? <OrangeRadioBox
//                     checked={false}
//                     label={answer}
//                   />
//                   : <RadioBox
//                     checked={false}
//                     label={answer}
//                   />
//             )
//         )
//       }
//     </div>

//  export default MatchAudioDescription;
