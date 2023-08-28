import React, { Fragment } from "react";
import GradingForm from "./gradingForm";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const RewriteTheStoryInEnglish = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getStudentAnswer,
  updateTeacherReview,
  getCurrentExerciseID,
  getTeacherReview,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
  getCurrentQuestionIndex,
}) => {
  const { notes, selected, note } = getCurrentQuestion();
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
          id: "rewriteTheStoryInEnglish",
          updateTeacherReview,
          getTeacherReview,
        }}
      />
      <div className="border text-black p-4">{note || notes[selected]}</div>
      <div className="form-group my-3 px-4">
        <textarea
          className="form-control bg-white"
          style={{ resize: "none", fontSize: "16px" }}
          rows="13"
          value={getStudentAnswer()}
          readOnly
          onChange={(e) => updateStudentAnswer({ answer: e.target.value })}
        ></textarea>
      </div>
    </Fragment>
  );
};
export default RewriteTheStoryInEnglish;
