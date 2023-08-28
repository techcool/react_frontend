import React, { Component } from "react";
//Stepper
// import 'bootstrap/dist/css/bootstrap.min.css';

import Stepper from "bs-stepper";
import { Row, Col } from "react-bootstrap";

//Steps
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";

export default class index extends Component {

  constructor() {
    super();
    this.state = {
      stepper: ''
    }
  }

  componentDidMount() {
    const stepperIntialization = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
    document.getElementById('stepperevent').style.pointerEvents = 'none';
    this.setState({
      stepper: stepperIntialization
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="h-100  justify-content-center d-flex curve-shape stepper-wrapper margin-header">
          <Row>
            <Col xs={12}>
               <p className="mb-3 text-dark">Students, your teacher will give you a code so that you can join your class. Enter it below to get started.</p>
              <div id="stepper1" className="bs-stepper step-1">
             <div className="bs-stepper-header" id="stepperevent">
                  <div className="step" data-target="#step1">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">1</span>
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="step" data-target="#step2">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">2</span>
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="step" data-target="#step3">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">3</span>
                    </button>
                  </div>
                </div>
                <div className="bs-stepper-content join-class-stepper">
                  <div id="step1" className="content">
                    <Step1 stepper={this.state.stepper} />
                  </div>
                  <div id="step2" className="content">
                    <Step2 stepper={this.state.stepper} />
                  </div>
                  <div id="step3" className="content join-class-3">
                    <Step3 stepper={this.state.stepper} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
