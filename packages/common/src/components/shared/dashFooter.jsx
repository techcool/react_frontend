import React, { Fragment,useState }  from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import logo_img from "common/src/images/logo.jpg";
import fb from "common/src/images/fb_black.svg";
import twitter from "common/src/images/twitter_black.svg";
import linkedin from "common/src/images/linkedin_black.svg";
import trophy from "common/src/images/footer_trophy.svg";
import star from "common/src/images/footer_star.svg";
import { Link } from "react-router-dom";

export  function DashFooter() {
    return (
        <div className="dash-footer">
        <Row>
          <Col>
            <div>
              <img className="logo-img" src={logo_img}/>
              <span>Copyright © 2021 Lit</span>
            </div>
          </Col>
          <Col>
            <div>
              <h6>Contact</h6>
              <span className="mb-1 d-block">Boston, MA 02210</span>
              <span>info@learnlit.online</span>
            </div>
          </Col>
          <Col>
            <div>
              <h6>Social</h6>
              <ul className="list-unstyled d-flex">
                <li>
                   <a href="https://www.facebook.com/litlanguages" target="_blank" className="img-link mr-2">
                     <img  src={fb}/>
                  </a>
                 </li>
                 <li>
                   <a href="https://twitter.com/Lit_Learning" target="_blank"  className="img-link mr-2">
                   <img  src={twitter}/>
                  </a>
                 </li>
                 <li>
                   <a href="https://www.linkedin.com/company/litlearning" target="_blank" className="img-link">
                   <img  src={linkedin}/>
                  </a>
                 </li>
              </ul>
            </div>
          </Col>
          <Col>
           <div className="d-flex">
             <div className="trophy-img">
               <img src={trophy} className="default-img"/>
             </div>
             <div className="ml-4 trophy-img">
               <img src={star} className="default-img" />
             </div>
           </div>
          </Col>
        </Row>
     </div>
    )
}
