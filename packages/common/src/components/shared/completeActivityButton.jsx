import React from "react";
import classnames from "classnames";
import { Form } from "react-bootstrap";
import styledComponents from "styled-components";

const Div = styledComponents.div`
display: inline-block;
&:hover{
  cursor: pointer;
}
font-size:25px;
`;
const Span = styledComponents.span`
&:hover{
  cursor: pointer;
}

font-size:14px;
margin-right:7px;
color: #3B3759;
font-weight: 500;
`;

const CompleteActivityButton = ({
  onClick,
  isCompleted = false,
  itemClass,
}) => (
  <Div
    className={classnames(
      { "text-dark-blue": isCompleted },
      { "text-black": !isCompleted }
    )}
    onClick={() => onClick({})}
  >
    <div className={`d-flex align-items-center ${itemClass}`}>
      {/* <input type="checkbox" checked={isCompleted}/>  */}
      <Form.Check
        type="checkbox"
        className="custom-checkbox success"
        checked={isCompleted}
      />
      <Span className="pl-2">Mark Complete</Span>
      {/* <i className='fa fa-check-circle' /> */}
    </div>
  </Div>
);

export default CompleteActivityButton;
