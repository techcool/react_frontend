import React from 'react';
import styledComponents from 'styled-components'

const Container = styledComponents.div`
margin:20px 0px;
`
const Img = styledComponents.img`
heigth:250px;
width: 250px;
`
const Image = ({ src, imgClass }) =>
  <Container>
    <Img src={src} className={imgClass} />
  </Container>

export default Image;