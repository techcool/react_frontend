import React from 'react';
import styled from 'styled-components';

const Container = ({
  initialStyle = {
    margin: '20px',
    padding: '20px',
  },
}
) =>
  ({ children, style }) => {
    const defaultStyle = { ...initialStyle };
    const customizedStyle = Object.assign({}, defaultStyle, style)
    return (<div
      style={customizedStyle}
    >
      {children}
    </div>)
  }


export const ContainerWithoutHorizontalSpace = Container({
  initialStyle : {
    margin: '20px 0px',
    padding: '20px 0px',
  },
})

export const StickyContainer = styled.span`
position: sticky;
top: 5px;
z-index: 100000;
`

export default Container({});