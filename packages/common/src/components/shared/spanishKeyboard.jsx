import React from 'react';
import styleComponents from 'styled-components';

const Span = styleComponents.span`
dispaly: inline-block;
margin: 0px 10px;
&:hover{
  cursor:pointer;
}
-webkit-touch-callout: none;
  -webkit-user-select: none; 
   -khtml-user-select: none; 
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
`

const SpanishKeyboard = ({ onClick }) =>
  <div className="px-4 spanish-words mt-4 d-flex justify-content-center">
    {["á", "é", "í", "ó", "ú", "ñ"].map(
      letter =>
        <Span onClick={() => onClick(letter)}>
          {letter}
        </Span>
    )
    }
  </div>

export default SpanishKeyboard;