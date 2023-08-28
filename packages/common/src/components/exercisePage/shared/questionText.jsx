import React, { Fragment } from 'react';
import styledComponents from 'styled-components';

export const Div = styledComponents.div`
  color: #000;
  margin-bottom:10px;
  font-size: 16px;
  font-weight: 500;
`

const QuestionText = ({ index, paragraph }) =>
  <Div className="px-4 mt-4">
    {index !== undefined && <Fragment> {index} {" . "} </Fragment>}
    {paragraph}
  </Div>

export default QuestionText;