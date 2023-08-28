import React from 'react';
import styledComponents from 'styled-components';
import { Div } from './questionText';
import { GRAY, BLUE } from 'common/src/constants';
import arw_down from 'common/src/images/arw_down_org.svg'

const Input = styledComponents.input`
  border: 1px solid ${GRAY};
  &:focus{
    border-color: ${BLUE} !important;
    box-shadow: 0px 0px 2px ${BLUE} !important; 
  }
`

const FillTheGapQuestion = ({
  index,
  text1,
  text2,
  value,
  onChange = () => { },
  onBlur = () => { },
}) =>
  <Div className="px-4 mt-4 d-flex flex-column">
    <span>
      {index} {" . "} {text1}
      <Input
        value={value}
        style={{ border: "1px solid orange" }}
        onChange={onChange}
        onBlur={onBlur}
      />
      {text2}
    </span>
    <span className="mx-auto my-4 fw-400">Click the Right ones to fll the Gap</span>
    <span className="mx-auto">
      <img src={arw_down}/>
    </span>

  </Div>

export default FillTheGapQuestion;