import React, { Fragment } from 'react';
import GradingForm from './gradingForm';
import Select from 'react-select';
import ReactAudioPlayer from 'react-audio-player';
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const RecordAndPlay = ({
  updateTeacherReview,
  getCurrentExerciseID,
  getTeacherReview,
  getStudentAnswer,
  getCurrentQuestion,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
  getCurrentQuestionIndex,
}) => {
  const { notes, selected, note, } = getCurrentQuestion();
  const url = getStudentAnswer();
  const exercise_id = getCurrentExerciseID()
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
          id: "recordAndPlay",
          updateTeacherReview,
          getTeacherReview,
        }}
      />
      {note ?
        note :
        <Select
          classNamePrefix="react-select"
          className="px-4"
          isSearchable={false}
          isClearable={false}
          defaultValue={{ value: 0, label: notes[selected] }}
          options={
            notes.map((element, index) => ({ value: index, label: element })
            )
          }
        />
      }
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ paddingTop: '40px' }}
      >
        {
          !url
            ? <div>
              The student didn't do this activity
          </div>
            : <ReactAudioPlayer id='recorded' className="audio" controls src={url} />
        }

      </div>
    </Fragment>)
}
export default RecordAndPlay;