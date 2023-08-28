import React from 'react';
import styledComponents from 'styled-components';

const Div = styledComponents.div`
  color: #000;
  margin-top:20px;
  text-transform: uppercase;
  font-weight:800;
  margin-bottom:15px;
`
const QuestionTitle = ({ text, style = {} }) =>
  <Div
    style={style}
  >
    {text}
  </Div>

export default QuestionTitle;