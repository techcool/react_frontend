import React from 'react';
import styledComponents from 'styled-components';
import classnames from 'classnames';
import { GRAY, BLUE } from 'common/src/constants';

const Div = styledComponents.div`
margin:5px 2px;
font-size: 16px;
display: inline-flex;
align-items: center;
&:hover{
  background-color: #eee;
}
span{
  border: 1px solid #ccc;
  border-radius:50%;
  display:inline-block;
  width:16px;
  height:16px;
  margin-right:6px;  
}
&.checked{
  background-color: rgba(40, 194, 234,0.1);
  border-color :${BLUE};
 
  span{
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
}
&.red{
  color:#f00;
}
`

const OptionBox = ({ label, checked, onClick = () => { }, color }) =>
  <Div
    className={classnames(
      'btn',
      { 'checked': checked },
      { 'text-dark-blue': color === 'blue' },
      { 'red': color === 'red' },
    )}
    onClick={onClick}
  >
    {checked ?
      <i className='fa fa-check-circle text-dark-blue'/>
      :
      <span />
    } {" "}
    {label}
  </Div>



export default OptionBox;