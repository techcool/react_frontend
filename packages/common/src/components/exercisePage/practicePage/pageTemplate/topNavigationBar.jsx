import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowCircle from 'common/src/images/arrow_circle';
import CompleteActivityButton from 'common/src/components/shared/completeActivityButton';
import ShouldRender from 'common/src/components/shared/ShouldRender';
import { EXERCICES_TITLES, EXERCISE_LISTEN, EXERCISE_FILL_THE_BLANK, EXERCISE_FILL_THE_GAPS } from 'common/src/constants';
import styledComponents from 'styled-components'
import Modal from 'common/src/components/shared/others/modal';
import { VideoScreenWithButtons } from 'common/src/components/shared/others/screenWithButtons';

const ButtonContainer = styledComponents.div`
-webkit-touch-callout: none;
  -webkit-user-select: none; 
   -khtml-user-select: none; 
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
`
const VideosButtonsContainer = styledComponents.div`
  border-radius: .25rem;
  border-color: #28c2ea !important;
`

const TopNavigationBar = ({
  onNextButtonClick,
  getVideoDetails,
  saveNotes,
  isTeacherReveiwing = () => false,
  getTeacherNote,
  updateTeacherNote,
  saveTeacherNote,
  getCurrentExerciseID,
  deleteVocabulary,
}) => {

  const {
    _id: video_id,
    title,
    url,
    notes,
    grammar,
    vocabulary,
    captionUrl,
    language,
    level,
    category,
    description,
  } = getVideoDetails();

  const ExerciseID = getCurrentExerciseID();

  return (
    <div className="d-flex justify-content-between mb-1">
      <div className="d-flex">
        {/* <Link
          className="text-dark-blue mr-3"
          style={{ fontSize: '25px' }}
          to='/'
        >
          <i className='fa fa-home' />
        </Link> */}
        {
          [EXERCISE_LISTEN, EXERCISE_FILL_THE_BLANK, EXERCISE_FILL_THE_GAPS].includes(ExerciseID) === false &&
          <VideosButtonsContainer
            className="d-flex align-items-center mr-2  border"
          >
            <div
              className='text-dark-blue m-2 font-weight-bold'
              style={{
                fontSize: '12px',
                cursor: 'pointer'
              }}
              data-toggle="modal"
              data-target="#videoModal"
            >
              {`Video & Banks`}
            </div>
          </VideosButtonsContainer>
        }


        {/* <div
          className="text-dark-blue mr-3"
          style={{ fontSize: '25px', cursor: 'pointer' }}
          data-toggle="modal"
          data-target="#videoModal"
        >
          <i className='fa fa-youtube-play' />
        </div>
        
        <ShouldRender
          condition={!isTeacherReveiwing()}
        >
          <div
            className="text-dark-blue mr-2"
            style={{ fontSize: '25px', cursor: 'pointer' }}
            data-toggle="modal"
            data-target="#notesModal"
          >
            <i className='fa fa-pencil-square-o' />
          </div>
        </ShouldRender>*/}
        <ShouldRender
          condition={isTeacherReveiwing()}
        >

          <div
            className="text-dark-blue"
            style={{ fontSize: '25px', cursor: 'pointer' }}
            data-toggle="modal"
            data-target="#WriteNoteForStudentModal"
            onClick={() => {
              const CurrentExerciseID = getCurrentExerciseID();
              const activityTitle = `[ ${EXERCICES_TITLES[CurrentExerciseID]} ]`
              if (!getTeacherNote() || getTeacherNote().indexOf(activityTitle) === -1) {
                const previousText = (!!getTeacherNote()) ? `${getTeacherNote()}\n` : '';
                const newText = `${previousText}${activityTitle}`
                updateTeacherNote(newText);
              }
            }}
          >
            <i className='fa fa-pencil-square-o' title="Leave comments for the student"/>
          </div>
          <div
            style={{
              fontWeight: '500',
              color: '#605d82',
              paddingTop: '11px',
              marginLeft: '10px',
              fontSize: '15px'
            }}>
            Leave comments for the student</div>
        </ShouldRender>
      </div>
      <div className="d-flex align-items-center">
        <ButtonContainer
          className="change-activity-button"
          onClick={() => onNextButtonClick(+1)}
        >
          Next <ArrowCircle className='turn-to-right' />
        </ButtonContainer>
      </div>
      <Modal
        title={title}
      >
        <VideoScreenWithButtons
          {...{
            url,
            grammar,
            vocabulary,
            notes,
            captionUrl,
            language,
            video_id,
            level,
            category,
            title,
            description,
          }}
          saveNotes={({ notes }) => saveNotes({ notes })}
          deleteVocabulary={(id) => deleteVocabulary(id)}
        />
      </Modal>
      <ShouldRender
        condition={!isTeacherReveiwing()}
      >
        <NotesModal
          notes={notes}
          saveNotes={saveNotes}
        />
      </ShouldRender>
      <ShouldRender
        condition={isTeacherReveiwing()}
      >
        <WriteNoteForStudentModal
          {...{
            getTeacherNote,
            updateTeacherNote,
            saveTeacherNote,
          }}
        />
      </ShouldRender>
    </div >)
}
const WriteNoteForStudentModal = ({
  getTeacherNote,
  updateTeacherNote,
  saveTeacherNote,
}) =>
  <div
    id="WriteNoteForStudentModal"
    className="modal fade"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      className="modal-dialog modal-dialog-centered"
      role="document"
      style={{ maxWidth: "60%" }}
    >
      <div
        className="modal-content"
      >
        <div className="modal-header">
          <h5 className="modal-title" >Notes for student</h5>
          <button
            id="close-modal"
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <textarea
            style={{
              width: "100%",
              height: "80%",
              resize: "none",
            }}
            rows='15'
            value={getTeacherNote()}
            onChange={(e) => updateTeacherNote(e.target.value)}
          />
          <div className="d-flex flex-row-reverse">
            <input
              type='button'
              className="btn button-blue"
              value='save'
              onClick={() => saveTeacherNote()}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

const NotesModal = ({ notes = '', saveNotes }) => {
  const [text, setText] = useState(notes)
  return (
    <div
      id="notesModal"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: "60%" }}
      >
        <div
          className="modal-content"
        >
          <div className="modal-header">
            <h5 className="modal-title" >Notes</h5>
            <button
              id="close-modal"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <textarea
              style={{
                width: "100%",
                height: "80%",
                resize: "none",
                fontSize: '20px'
              }}
              rows='15'
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div className="d-flex flex-row-reverse">
              <input
                type='button'
                className="btn button-blue"
                value='save'
                onClick={() => saveNotes({ notes: text })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export { TopNavigationBar }