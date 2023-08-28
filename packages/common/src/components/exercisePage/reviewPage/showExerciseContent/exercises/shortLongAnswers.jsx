import React, { Fragment } from "react";
import QuestionTitle from "common/src/components/exercisePage/shared/questionTitle";
import QuestionText from "common/src/components/exercisePage/shared/questionText";
import GradingForm from "./gradingForm";

import QuestionsStepper from "../../../practicePage/showExerciseContent/questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Answer =
  ({ rows }) =>
  ({
    saveProgress,
    getStudentAnswer,
    getTeacherReview,
    getQuestionsCount,
    getCurrentQuestion,
    updateStudentAnswer,
    updateTeacherReview,
    getCurrentExerciseID,
    getCurrentQuestionIndex,
    saveNotes,
    deleteVocabulary,
    getVideoDetails,
  }) => {
    const { paragraph, id } = getCurrentQuestion();
    const exercise_id = getCurrentExerciseID();
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
        <GradingForm
          {...{
            exercise_id,
            id,
            updateTeacherReview,
            getTeacherReview,
          }}
        />

        <QuestionsStepper
          activeStep={getCurrentQuestionIndex()}
          totalSteps={getQuestionsCount()}
        />
        <QuestionText
          index={getCurrentQuestionIndex() + 1}
          paragraph={paragraph}
          className="mt-3"
        />
        <div className="form-group my-3 ">
          <div className="form-group my-3 px-4">
            <textarea
              className="form-control"
              style={{ resize: "none", fontSize: "16px" }}
              rows={rows}
              value={getStudentAnswer({ question_id: id }) || ""}
            />
          </div>
        </div>
      </Fragment>
    );
  };

export const ShortAnswer = Answer({ id: "ShowAnswer", rows: 10 });
export const LongAnswer = Answer({ id: "LongAnswer", rows: 13 });

// const Answer = ({ id, rows }) => ({
//   getCurrentQuestions,
//   getCurrentExerciseID,
//   getQuestionsCount,
//   getStudentAnswer,
//   updateTeacherReview,
//   getTeacherReview,
// }) => {
//   const questions = getCurrentQuestions();
//   const exercise_id = getCurrentExerciseID();
//   return (
//     <Fragment>
//       <GradingForm
//         {...{
//           exercise_id,
//           id,
//           updateTeacherReview,
//           getTeacherReview,
//         }}
//       />
//       {
//         questions.map((question, index) =>
//           <Fragment key={index}>
//             <QuestionTitle
//               style={{
//                 marginTop: '50px'
//               }}
//               text={`Question ${index + 1} of ${getQuestionsCount()}`}
//             />
//             <QuestionText
//               index={index + 1}
//               paragraph={question.paragraph}
//             />
//             <div className="form-group my-3 ">
//               <textarea
//                 className="form-control"
//                 style={{ resize: "none",fontSize:'20px' }}
//                 rows={rows}
//                 value={getStudentAnswer({ question_id: question.id }) || ""}
//               />
//             </div>
//           </Fragment>
//         )
//       }
//     </Fragment>
//   );
// }

// export const ShortAnswer = Answer({ id: 'ShowAnswer', rows: 10 });
// export const LongAnswer = Answer({ id: 'LongAnswer', rows: 13 });
