import React from 'react';
import {
  MODE_NORMAL,
  MODE_REVIEW_QUESTION,
  MODE_VIEW_ANSWERS,
} from 'common/src/constants'

const ViewAnswers = ({ switchMode }) =>
  <div 
    className="d-flex flex-column align-items-center h-100 justify-content-around"
    style={{paddingTop:"100px",paddingBottom:"100px"}}
  >
    <div
      className="btn button-blue block full-width mb-4"
      style={{
        width:'400px',
        maxWidth:'400px'
      }}
      onClick={() => switchMode(MODE_REVIEW_QUESTION)}
    >
      Submit & Check My Answers
    </div>
    <div
      className="btn button-blue block full-width mb-4"
      style={{
        width:'400px',
        maxWidth:'400px'
      }}
      onClick={() => switchMode(MODE_VIEW_ANSWERS)}
    >
      Submit & Check Correct Answers
    </div>
      <div
        className="btn button-blue block full-width  "
        style={{
          width:'400px',
          maxWidth:'400px'
          }}
        onClick={()=> switchMode(MODE_NORMAL)}
      >
        Redo Postwork
      </div>
  </div>

export default ViewAnswers;