import React, { Fragment } from "react";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
import CompleteActivityButton from "common/src/components/shared/completeActivityButton";
import styledComponents from "styled-components";

const Listen = ({
  getVideoDetails,
  saveNotes,
  deleteVocabulary,
  isCurrentExerciseCompleted,
  updateStudentAnswer,
}) => {
  const {
    url,
    grammar,
    vocabulary,
    notes,
    captionUrl,
    language,
    _id: video_id,
    level,
    category,
    title,
    description,
  } = getVideoDetails();
  return (
    <Fragment>
      {/* <div className="d-flex flex-row-reverse px-3">
        <CompleteActivityButton
          isCompleted={isCurrentExerciseCompleted()}
          onClick={updateStudentAnswer}
        />
      </div>  */}
      <VideoScreenWithButtons
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
          description,
          saveNotes,
          deleteVocabulary,
          language,
          videoMinHeight: "500px",
          // hideTabs: true,
          buttons: [
            () => (
              <div className="pt-1">
                <CompleteActivityButton
                  isCompleted={isCurrentExerciseCompleted()}
                  onClick={updateStudentAnswer}
                />
              </div>
            ),
          ],
          showCategory:false,
          showVideoTitleAndDescription:false,
        }}
      />
    </Fragment>
  );
};
export default Listen;
