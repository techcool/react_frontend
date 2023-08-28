import React, { Fragment } from "react";
import CompleteActivityButton from "common/src/components/shared/completeActivityButton";
import Select from "react-select";
import SpanishKeyboard from "common/src/components/shared/spanishKeyboard";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const RewriteTheStoryInEnglish = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getStudentAnswer,
  isCurrentExerciseCompleted,
  saveProgress,
  isFrom,
  getCurrentQuestionIndex,
  getVideoDetails,
  saveNotes,
  deleteVocabulary,
}) => {
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
  const { notes, selected, note, t } = getCurrentQuestion();
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
      <div style={{ paddingTop: "20px" }} />
      <h2 className="my-3 px-4 mb-4 text-black medium-heading">
        {
          note ? note : notes[selected]
          // <Select
          //   className="px-4"
          //   classNamePrefix="react-select"
          //   isSearchable={false}
          //   isClearable={false}
          //   defaultValue={{ value: 0, label: notes[selected] }}
          //   options={
          //     notes.map((element, index) => ({ value: index, label: element })
          //     )
          //   }
          // />
        }
      </h2>
      <div className="form-group my-3 px-4 ">
        <textarea
          className="form-control"
          style={{
            resize: "none",
            fontSize: "16px",
            "background-color": "#F5F5F5",
            height: "371px",
            padding: "10px",
          }}
          rows="15"
          value={getStudentAnswer() || ""}
          onChange={(e) =>
            updateStudentAnswer({ answer: e.target.value, save: false })
          }
          onBlur={() => saveProgress()}
          placeholder="Rewirte English Story..."
        ></textarea>
        {/* <SpanishKeyboard
        onClick={(letter) => updateStudentAnswer({ answer: `${getStudentAnswer() || ""}${letter}` })}
      /> */}
        <CompleteActivityButton
          onClick={() => updateStudentAnswer({ completed: true })}
          isCompleted={isCurrentExerciseCompleted()}
        />
      </div>
    </Fragment>
  );
};
export default RewriteTheStoryInEnglish;
