import React, { useState, useEffect, Fragment as div, Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import formatDuration from "format-duration";
import styledComponent from "styled-components";
import startRecordingLogo from "common/src/images/start_recording.svg";
import stopRecordingLogo from "common/src/images/stop_recording.svg";
import disabledRecordingLogo from "common/src/images/disabled_recording.svg";
import startMicro from "common/src/images/microphone.svg";
import timer from "common/src/images/timer.svg";
import sound from "common/src/images/sound.svg";

import { RED } from "common/src/constants";
import CompleteActivityButton from "common/src/components/shared/completeActivityButton";
import Select from "react-select";
import Checkmark from "common/src/images/check_mark";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Img = styledComponent.img`
width: 50px;
height: 50px;
transition: all .2s ease-in-out; 
&:hover{
  transform: scale(1.2);
}
`;
const PlayButtonContainer = styledComponent.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:75px;
  width:75px;
  border-radius: 50%;
  background-color: rgba(128,128,128,0.2);
`;
const RecordButtonContainer = styledComponent.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:75px;
  width:120px;
  border-radius: 30px;
  background-color: rgba(128,128,128,0.2);
`;

const RecordAndPlay = ({
  startRecording,
  stopRecording,
  updateStudentAnswer,
  getStudentAnswer,
  isCurrentExerciseCompleted,
  getCurrentQuestion,
  getCurrentQuestionIndex,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
}) => {
  const { notes, selected, note } = getCurrentQuestion();
  const answer = getStudentAnswer();
  const url = typeof answer === "object" ? URL.createObjectURL(answer) : answer;
  const [isRecording, setIsRecording] = useState(false);
  const [timeoutCallback, sentTimeoutCallback] = useState(() => {});
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
    <div className="h-100">
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
      <div
        className={`${
          isRecording
            ? "d-flex flex-column align-items-center justify-content-center record-wave"
            : "d-flex flex-column align-items-center justify-content-center"
        }`}
        style={{ height: "80%", marginTop: "50px", marginBottom: "50px" }}
      >
        {answer && !isRecording && (
          <ReactAudioPlayer
            id="recorded"
            className="audio"
            controls
            src={url}
          />
        )}
        <div style={{ marginTop: "50px" }}>
          {isCurrentExerciseCompleted() ? (
            <React.Fragment></React.Fragment>
          ) : (
            // <div
            //   className="d-flex"
            // >

            //   <Img
            //     src={disabledRecordingLogo}
            //     style={{ margin: '12px' }}
            //   />
            //   <CompleteButton
            //     onClick={() => updateStudentAnswer({ completed: true })}
            //     isCompleted={isCurrentExerciseCompleted()}
            //   />
            // </div>
            <div>
              <div className="d-flex justify-content-center">
                {isRecording ? (
                  <img src={startMicro} />
                ) : (
                  <img src={startMicro} />
                )}
              </div>
              {isRecording && (
                <div className="d-flex justify-content-center mt-4">
                  <div>
                    <img src={timer} className="pr-2" />
                    <Timer />
                  </div>
                  {/* <div><img src={sound} className="pr-2"/>14 MB</div> */}
                </div>
              )}

              <div className="d-flex mt-4 justify-content-center">
                {isRecording && (
                  <button
                    type="button"
                    className="btn btn-secondary bg-dark mr-4 px-4"
                    style={{ cursor: "auto" }}
                  >
                    <span className="stop-dot"></span>
                    Record
                  </button>
                )}
                {!isRecording && (
                  <button
                    type="button"
                    className="primary-btn sm px-4"
                    onClick={() => {
                      setIsRecording(true);
                      startRecording();
                      sentTimeoutCallback(
                        setTimeout(async () => {
                          const buffer = await stopRecording();
                          setIsRecording(false);
                          updateStudentAnswer({ answer: buffer });
                        }, process.env.REACT_APP_MAX_RECORD_TIME)
                      );
                    }}
                  >
                    Start
                  </button>
                )}
                {isRecording && (
                  <button
                    type="button"
                    className="btn btn-danger px-4"
                    onClick={async () => {
                      setIsRecording(false);
                      clearTimeout(timeoutCallback);
                      const buffer = await stopRecording();
                      updateStudentAnswer({ answer: buffer });
                    }}
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isRecording && (
        <div className="d-flex ml-4 w-100">
          <CompleteActivityButton
            onClick={() => updateStudentAnswer({ completed: true })}
            isCompleted={isCurrentExerciseCompleted()}
          />
        </div>
      )}
    </div>
  );
};
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, [seconds]);
  return <span>{formatDuration(seconds * 1000)}</span>;
};

const CompleteButton = ({ onClick, isCompleted }) => (
  <div
    style={{
      marginTop: "12px",
      marginBottom: "12px",
      width: "200px",
      textAlign: "center",
    }}
    onClick={() => onClick()}
  >
    {isCompleted ? (
      <Checkmark style={{ width: "50px", height: "50px" }} />
    ) : (
      <Checkmark
        style={{ width: "50px", height: "50px" }}
        backgroundColor="black"
      />
    )}
    {!isCompleted && (
      <>
        <br />
        <span style={{ fontSize: "12px" }}>Check When Complete</span>
      </>
    )}
  </div>
);

export default RecordAndPlay;
