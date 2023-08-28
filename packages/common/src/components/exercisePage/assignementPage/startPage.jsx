import React from 'react'
const StartPage = ({ limit, startPractice }) =>
  <div
    className="d-flex flex-column align-items-center"
  >
    <div className="my-4">
      You can still submit this postwork ( {limit} ) times.
    </div>
    <button
      className='btn button-blue '
      onClick={startPractice}
    >
      Start
    </button>
  </div>

export default StartPage