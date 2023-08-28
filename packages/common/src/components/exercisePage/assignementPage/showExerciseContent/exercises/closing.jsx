import React from 'react';

const ViewAnswers = ({ switchMode }) =>
  <div className="d-flex flex-column align-items-center justify-content-center h-100">
    <div
      className="primary-btn sm"
      onClick={() => switchMode()}
    >
      Submit All Your Work
    </div>
   </div>

export default ViewAnswers;