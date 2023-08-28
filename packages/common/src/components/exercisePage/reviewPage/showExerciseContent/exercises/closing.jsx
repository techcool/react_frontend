import React from 'react';

const ViewAnswers = ({ submitReview }) =>
  <div className="d-flex flex-column align-items-center">
    <div
      className="btn primary-btn mt-5"
      onClick={() => submitReview()}
      >
      Submit the review
    </div>

  </div>

export default ViewAnswers;