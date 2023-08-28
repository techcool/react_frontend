import React from 'react';
import ArrowCircle from 'common/src/images/arrow_circle';

const BackButton = ({goBack}) => <span
  className="change-activity-button"
  onClick={() => goBack()}
>
  <ArrowCircle className='turn-to-left ' /> Back
</span>

export default BackButton;