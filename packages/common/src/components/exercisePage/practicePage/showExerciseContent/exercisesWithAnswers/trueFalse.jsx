import React, { Fragment } from "react";
import classnames from "classnames";
import RadioBox, {
  OrangeRadioBox,
  GreenRadioBox,
} from "common/src/components/Forms/radioBox";
import ActivityEvaluationMsg from "common/src/components/exercisePage/shared/activityEvaluationMsg.jsx";
import QuestionsStepper from "../questionsStepper";
import hashString from "hash-string";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const TrueFalse = ({
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
  const correctAnwsers = getCurrentExerciseAnswers();
  const evaluation = getCurrentExerciseEvaluation();
  const { url, id } = question;
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
      <div className="text-center mt-4 fw-600 h4">True or False</div>
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      <div className="text-center mt-4">
        <audio className="audio" key={`key-${hashString(url)}`} controls>
          <source src={url} />
        </audio>
      </div>
      <div className="my-3 d-flex justify-content-center px-4">
        {true === correctAnwsers[id] ? (
          <GreenRadioBox checked={true} label="True" />
        ) : studentAnswer === true ? (
          <OrangeRadioBox checked={false} label="True" />
        ) : (
          <RadioBox checked={false} label="True" />
        )}
        {false === correctAnwsers[id] ? (
          <GreenRadioBox checked={true} label="False" />
        ) : studentAnswer === false ? (
          <OrangeRadioBox checked={false} label="False" />
        ) : (
          <RadioBox checked={false} label="false" />
        )}
      </div>
      <div className="text-center px-4">
        <ActivityEvaluationMsg
          evaluation={evaluation && evaluation[question.id]}
          studentAnswer={studentAnswer}
          isFromAnswed={true}
        />
      </div>
    </Fragment>
  );
};
export default TrueFalse;

/*********************Old Code********************/
// const TrueFalse = ({
//   getCurrentQuestions,
//   getStudentAnswer,
//   getCurrentExerciseEvaluation,
//   getCurrentExerciseAnswers,
// }) => {

//   const questions = getCurrentQuestions();
//   const evaluation = getCurrentExerciseEvaluation();
//   const correctAnwsers = getCurrentExerciseAnswers();

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
//             correctAnwser={correctAnwsers[question.id]}
//           />
//       )
//     }
//   </Fragment>
// }

// const Question = ({ index, question, evaluation, studentAnswer, correctAnwser, }) =>
//   <Fragment>
//     <div>
//       {index + 1} {" . "}
//       <audio controls>
//         <source src={question.url} />
//       </audio>
//     </div>
//     <div className="my-3">
//       {
//         (true === correctAnwser)
//           ? <GreenRadioBox checked={true} label="True" />
//           : (studentAnswer === true)
//             ? <OrangeRadioBox checked={false} label="True" />
//             : <RadioBox checked={false} label="True" />
//       }
//       {
//         (false === correctAnwser)
//           ? <GreenRadioBox checked={true} label="False" />
//           : (studentAnswer === false)
//             ? <OrangeRadioBox checked={false} label="False" />
//             : <RadioBox checked={false} label="false" />
//       }
//     </div>
//     <ActivityEvaluationMsg evaluation={evaluation} />
//   </Fragment>

// export default TrueFalse;
