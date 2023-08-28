import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import styledComponent from 'styled-components'
import cn from 'classnames';


const CardContainer = styledComponent.div`
border: 1px solid #13bbed;
width: 100%;
height: 100%;
`
const CardHeader = styledComponent.div`
background-color:#13bbed;
display: flex;
align-items: center;
flex-direction: column;
color: white;
padding-top: 15px;
padding-bottom: 15px;
position: relative;
`
const CardBestValue = styledComponent.div`
background-color: #020245;
color:white;
text-transform: uppercase;
padding: 1rem;
font-size: 1rem;
font-weight: bold;
margin-top: calc(-2.5rem - 7px);
`;

const CardBody = styledComponent.div`
display: flex;
align-items: center;
flex-direction: column;
`
const PackTitle = styledComponent.p`
margin-top: 20px;
margin-bottom: 20px;
font-size: calc(1.125 * 1rem);
text-transform: uppercase;
`

const PackPrice = styledComponent.div`
text-transform: uppercase;
display: flex;
span{
  line-height: calc(4 * 1rem);
}
.strike {
  color: red;
  text-decoration: line-through;
}
.value{
  color:white;
}
p{
  &.main-price {
    font-size: calc(4 * 1rem);
    margin-bottom:0px;
  }
}
`
const PackDiscount = styledComponent.p`
color:black;
`
const PaymentButtonContainer = styledComponent.div`
display: flex;
justify-content: center;
width: 100%;
button {
  border: 1px solid #000;
  border-radius: 5px;
  background-color: white;
  width: 75%;
  padding: 5px 25px;
  color: #13bbed;
  font-size: calc(1.125 * 1rem);
  font-weight: bold;
}
`;

const FeaturesContainer = styledComponent.div`
font-size: calc(1.125 * 1rem);
text-align: center;
padding-top: 40px;
padding-bottom: 40px;
`;
const FeaturesTitle = styledComponent.p`
font-weight: bold;
color: #43cb83;
`
const FeatureContainer = styledComponent.p`

`

const PacksContainer = ({ packs = [], selectPack = () => { } }) =>{

return(

  <Container
    fluid={true}
  >
    <Row
      className="mt-4 mb-4 justify-content-md-center"
    >
      {
        packs.map((pack, index) =>
          <Col
            key={index}
            xs={12}
            sm={4}
          >
            <CardContainer>
              <CardHeader>
                {
                  pack.isBestValue &&
                  <CardBestValue>
                    Best value
                  </CardBestValue>
                }
                <PackTitle>
                  {pack.title}
                </PackTitle>
                <PackPrice>
                  <span>
                    $
                  </span>
                  <p className="main-price">
                    <span className={cn({ 'strike': pack.discount })}>
                      <span className="value">
                        {pack.price / 100}
                      </span>
                    </span>
                  </p>
                </PackPrice>
                {
                  pack.discount ?
                    <PackDiscount>
                      {`Beta Discount Price: $${pack.discount / 100}/yr`}
                    </PackDiscount>
                    : null
                }
                <PaymentButtonContainer>
                  <button onClick={() => selectPack(pack)} >
                    Buy Now
                  </button>
                </PaymentButtonContainer>
              </CardHeader>
              <CardBody>
                <FeaturesContainer>
                  {
                    pack.featuresTitle ?
                      <FeaturesTitle>
                        {pack.featuresTitle}
                      </FeaturesTitle>
                      : null
                  }
                  {
                    pack.featuresList.map(feature =>
                      <FeatureContainer>
                        {feature}
                      </FeatureContainer>
                    )
                  }

                </FeaturesContainer>
              </CardBody>
            </CardContainer>

          </Col>
        )
      }
    </Row>
  </Container>
)
}



export default PacksContainer;