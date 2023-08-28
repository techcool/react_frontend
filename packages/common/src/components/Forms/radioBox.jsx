import React from 'react';
import styledComponent from 'styled-components';
import classnames from 'classnames';
import { BLUE, GREEN, ORANGE } from 'common/src/constants';
import Checkmark from 'common/src/images/check_mark';

const Container = styledComponent.div`
  display: inline-block;
  margin:5px 0px;
  padding: .375rem .75rem;   
  font-size: 16px;

  // padding-left:5px;
  // border : 1px solid #eee;
  // border-radius:2px;
  // &:hover{
  //     background-color: #eee;
  // }    
  // &.checked{
  //   background-color: rgba(40, 194, 234,0.1);
  //   border : 1px solid ${BLUE};
  //   box-shadow: 0px 0px 2px ${BLUE};
  // }
`

const Label = styledComponent.label`
cursor: pointer;
width:100%;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`
const Radio = styledComponent.input`
opacity: 0;
cursor: poi&nter;
height: 0;
width: 0;
`
const iconSize = '20px'
const EmptyCircle = styledComponent.div`
border-radius:50%;
border: 1px solid #999;
background-color:#eee;
height:${iconSize};
width:${iconSize};
min-width:${iconSize};
max-width:${iconSize};


`
const DefaultRadioBox = ({ style = {}, labelColor = "#000" }) => ({ label, onChange = () => { }, checked, }) =>
  <Container
    className={classnames({ 'checked': checked }, 'd-flex', 'align-items-center')}
    style={style}
  >
    <Label
      className={classnames('d-flex', 'align-items-center', 'm-0','blue-box')}

    >
      {
        checked ?
          <Checkmark style={{ height: iconSize, width: iconSize }} />
          : <EmptyCircle />
      }
      <Radio
        type='radio'
        onChange={onChange}
        checked={checked}
      />
      <span className="ml-2"
        style={{
          color: `${labelColor}`
        }}
      >
        {label}
      </span>
    </Label>
  </Container >

export const GreenRadioBox = DefaultRadioBox({
  labelColor: BLUE
});
export const OrangeRadioBox = DefaultRadioBox({
  labelColor: '#f00',
});

const RadioBox=DefaultRadioBox({});

export default RadioBox; 