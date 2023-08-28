import React from 'react';
import { BLUE } from 'common/src/constants';

const ProgressBar = ({ getProgressPercentage }) =>
  <div className="progress">
    <div
      className="progress-bar bg-dark-blue"
      role="progressbar"
      style={{ width: `${getProgressPercentage()}%` }}
      aria-valuenow={getProgressPercentage()}
      aria-valuemin="0"
      aria-valuemax="100"
    >
    </div>
  </div>

export { ProgressBar };
