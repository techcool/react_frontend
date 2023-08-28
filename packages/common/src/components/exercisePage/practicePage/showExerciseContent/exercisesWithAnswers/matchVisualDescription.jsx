import React, { Fragment } from "react";
import Image from "common/src/components/shared/VideoActiviesImges";
import ActivityEvaluationMsg from "common/src/components/exercisePage/shared/activityEvaluationMsg.jsx";
import RadioBox, {
  GreenRadioBox,
  OrangeRadioBox,
} from "common/src/components/Forms/radioBox";
import QuestionsStepper from "../questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const MatchVisualDescription = ({
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
  const { id } = question;
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
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      <div className="my-3">
        <Question
          question={question}
          evaluation={evaluation && evaluation[id]}
          studentAnswer={getStudentAnswer({ question_id: id })}
          correctAnswer={correctAnswers[id]}
        />
      </div>
    </Fragment>
  );
};

const Question = ({ question, evaluation, studentAnswer, correctAnswer }) => (
  <Fragment>
    <div className="row px-4">
      <div className="col-md-5">
        <img src={question.url} className={"w-100"} />
      </div>

      <div className="col-md-7 pl-md-0">
        <div className="my-3">
          <Answers
            {...{
              question_id: question.id,
              answers: question.answers,
              studentAnswer,
              correctAnswer,
            }}
          />
        </div>
      </div>
    </div>
    <ActivityEvaluationMsg 
    evaluation={evaluation} 
    studentAnswer={studentAnswer}
    isFromAnswed={true} />
  </Fragment>
);

const Answers = ({ question_id, answers, studentAnswer, correctAnswer }) => (
  <div className="my-3">
    {answers.map((answer, index) =>
      index === correctAnswer ? (
        <GreenRadioBox checked={true} label={answer} />
      ) : studentAnswer === index && studentAnswer !== correctAnswer ? (
        <OrangeRadioBox checked={false} label={answer} />
      ) : (
        <RadioBox checked={false} label={answer} />
      )
    )}
  </div>
);

export default MatchVisualDescription;

/********************** Old Code *****************/
// const MatchVisualDescription = ({
//   getCurrentQuestions,
//   getStudentAnswer,
//   getCurrentExerciseEvaluation,
//   getCurrentExerciseAnswers,
// }) => {
//   const questions = getCurrentQuestions();
//   const evaluation = getCurrentExerciseEvaluation();
//   const correctAnswers = getCurrentExerciseAnswers()

//   return <Fragment>
//     <div style={{ paddingTop: '20px' }} />
//     {
//       questions.map(
//         (question, index) =>
//           <Question
//             key={index}
//             index={index}
//             question={question}
//             evaluation={evaluation && evaluation[question.id]}
//             studentAnswer={getStudentAnswer({ question_id: question.id })}
//             correctAnswer={correctAnswers[question.id]}
//           />
//       )
//     }
//   </Fragment>
// }

// const Question = ({ index, question, evaluation, studentAnswer, correctAnswer }) =>
//   <Fragment>
//     <div>
//       {index + 1} {" . "} <img src={question.url} />
//     </div>
//     <div className="my-3">
//       <Answers
//         {...{
//           question_id: question.id,
//           answers: question.answers,
//           studentAnswer,
//           correctAnswer,
//         }}
//       />
//     </div>
//     <ActivityEvaluationMsg evaluation={evaluation} />
//   </Fragment>

// const Answers = ({ question_id, answers, studentAnswer, correctAnswer }) =>
//   <div className="my-3">
//     {
//       answers.map(
//         (answer, index) =>
//         (
//           (index === correctAnswer)
//             ? <GreenRadioBox
//               checked={true}
//               label={answer}
//             />
//             : (studentAnswer === index && studentAnswer !== correctAnswer)
//               ? <OrangeRadioBox
//                 checked={false}
//                 label={answer}
//               />
//               : <RadioBox
//                 checked={false}
//                 label={answer}
//               />
//         )
//       )
//     }
//   </div>

// export default MatchVisualDescription;
