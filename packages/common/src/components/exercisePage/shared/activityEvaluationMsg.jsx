import React, { Fragment } from 'react';

const ActivityEvaluationMsg = ({ evaluation, studentAnswer, isFromAnswed }) =>
  evaluation === undefined ?
    <Fragment />
    : evaluation
      ? <div className='text-dark-blue text-center px-4 mt-1 mb-3 font-weight-bold'>Correct</div>
      : <div className='mt-1 mb-3 px-4 text-center font-weight-bold' style={{color:"#f00"}}>Incorrect { isFromAnswed && studentAnswer ===  undefined ? '(Not Answered)':''}</div>

export default ActivityEvaluationMsg;