import React, { Component } from "react";
//Stepper
// import 'bootstrap/dist/css/bootstrap.min.css';

import Stepper from "bs-stepper";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

//Steps
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";

export default class index extends Component {
  constructor(props) {
    super(props);
    let isRedirect = false;
    if (
      !props.location ||
      !props.location.state ||
      !props.location.state.isValid
    ) {
      isRedirect = true;
    }
    this.state = {
      stepper: "",
      isRedirect: isRedirect,
    };
  }

  componentDidMount() {
    if (!this.state.isRedirect) {
      const stepperIntialization = new Stepper(
        document.querySelector("#stepper1"),
        {
          linear: false,
          animation: true,
        }
      );
      document.getElementById("stepperevent").style.pointerEvents = "none";
      this.setState(
        {
          stepper: stepperIntialization,
        },
        () => {
          if (this.props.location.state.step) {
            this.state.stepper.to(2);
          }
        }
      );
    }
  }

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <div className="h-100  justify-content-center d-flex curve-shape stepper-wrapper margin-header">
          <Row>
            <Col xs={12}>
              <div id="stepper1" className="bs-stepper step-1">
                <div className="bs-stepper-header" id="stepperevent">
                  <div className="step" data-target="#step1">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">1</span>
                      <span className="bs-stepper-label">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <circle cx="18" cy="18" r="18" fill="#EEEDF8" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.1162 10.5C23.2337 10.5 24.3087 10.9417 25.0995 11.7342C25.8912 12.525 26.3337 13.5917 26.3337 14.7083V21.2917C26.3337 23.6167 24.442 25.5 22.1162 25.5H13.8837C11.5578 25.5 9.66699 23.6167 9.66699 21.2917V14.7083C9.66699 12.3833 11.5495 10.5 13.8837 10.5H22.1162ZM23.442 15.95L23.5087 15.8833C23.7078 15.6417 23.7078 15.2917 23.4995 15.05C23.3837 14.9258 23.2245 14.85 23.0587 14.8333C22.8837 14.8242 22.717 14.8833 22.5912 15L18.8337 18C18.3503 18.4008 17.6578 18.4008 17.167 18L13.417 15C13.1578 14.8083 12.7995 14.8333 12.5837 15.0583C12.3587 15.2833 12.3337 15.6417 12.5245 15.8917L12.6337 16L16.4253 18.9583C16.892 19.325 17.4578 19.525 18.0503 19.525C18.6412 19.525 19.217 19.325 19.6828 18.9583L23.442 15.95Z"
                            fill="#898796"
                          />
                        </svg>
                        Enter Your Email
                      </span>
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="step" data-target="#step2">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">2</span>
                      <span className="bs-stepper-label">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <circle cx="18" cy="18" r="18" fill="#EEEDF8" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.917 18.4614C18.2125 18.4614 20.0526 16.5975 20.0526 14.2724C20.0526 11.9472 18.2125 10.0833 15.917 10.0833C13.6216 10.0833 11.7815 11.9472 11.7815 14.2724C11.7815 16.5975 13.6216 18.4614 15.917 18.4614ZM15.917 20.5127C12.5455 20.5127 9.66699 21.0517 9.66699 23.2054C9.66699 25.3582 12.528 25.9167 15.917 25.9167C19.2876 25.9167 22.167 25.3776 22.167 23.224C22.167 21.0703 19.306 20.5127 15.917 20.5127ZM24.5819 15.9899H25.5845C25.9972 15.9899 26.3337 16.3311 26.3337 16.7496C26.3337 17.168 25.9972 17.5092 25.5845 17.5092H24.5819V18.4903C24.5819 18.9088 24.2463 19.25 23.8328 19.25C23.4201 19.25 23.0837 18.9088 23.0837 18.4903V17.5092H22.0828C21.6693 17.5092 21.3337 17.168 21.3337 16.7496C21.3337 16.3311 21.6693 15.9899 22.0828 15.9899H23.0837V15.0097C23.0837 14.5912 23.4201 14.25 23.8328 14.25C24.2463 14.25 24.5819 14.5912 24.5819 15.0097V15.9899Z"
                            fill="#898796"
                          />
                        </svg>
                        Create Your Account
                      </span>
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="step" data-target="#step3">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">3</span>
                      <span className="bs-stepper-label">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <circle cx="18" cy="18" r="18" fill="#EEEDF8" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.392 9.666H21.617C24.442 9.666 26.3337 11.6493 26.3337 14.5993V21.4085C26.3337 24.3502 24.442 26.3327 21.617 26.3327H14.392C11.567 26.3327 9.66699 24.3502 9.66699 21.4085V14.5993C9.66699 11.6493 11.567 9.666 14.392 9.666ZM17.992 15.5502C17.6003 15.5502 17.2753 15.2243 17.2753 14.8252C17.2753 14.4168 17.6003 14.0918 18.0087 14.0918C18.4087 14.0918 18.7337 14.4168 18.7337 14.8252C18.7337 15.2243 18.4087 15.5502 17.992 15.5502ZM18.7253 21.1502C18.7253 21.5502 18.4003 21.8752 17.992 21.8752C17.592 21.8752 17.267 21.5502 17.267 21.1502V17.4668C17.267 17.066 17.592 16.7335 17.992 16.7335C18.4003 16.7335 18.7253 17.066 18.7253 17.4668V21.1502Z"
                            fill="#898796"
                          />
                        </svg>
                        Tell Us About You
                      </span>
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="step" data-target="#step4">
                    <button className="step-trigger">
                      <span className="bs-stepper-circle">4</span>
                      <span className="bs-stepper-label">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <circle cx="18" cy="18" r="18" fill="#EEEDF8" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.7738 26.2614C17.866 26.3096 17.9692 26.3341 18.0724 26.3333C18.1756 26.3325 18.278 26.3071 18.3711 26.2581L21.3443 24.6687C22.1875 24.2193 22.8477 23.7167 23.3628 23.1316C24.4828 21.8568 25.0944 20.2298 25.0835 18.5522L25.0483 13.0183C25.0449 12.3809 24.6263 11.8122 24.0071 11.6054L18.476 9.74964C18.1429 9.63687 17.778 9.63932 17.4508 9.75536L11.9406 11.6773C11.3248 11.8923 10.9137 12.4651 10.917 13.1033L10.9523 18.6331C10.9632 20.3132 11.5957 21.9328 12.7342 23.1945C13.2543 23.7715 13.9205 24.2667 14.7728 24.7088L17.7738 26.2614ZM16.9867 19.7574C17.1109 19.8767 17.272 19.9356 17.433 19.934C17.5941 19.9331 17.7544 19.8727 17.8769 19.7517L21.1261 16.5484C21.3702 16.3074 21.3677 15.92 21.1211 15.6822C20.8736 15.4444 20.4751 15.4461 20.2309 15.6871L17.4238 18.4541L16.2745 17.3492C16.027 17.1114 15.6293 17.1139 15.3843 17.355C15.1402 17.596 15.1427 17.9834 15.3902 18.2212L16.9867 19.7574Z"
                            fill="#898796"
                          />
                        </svg>
                        Done!
                      </span>
                    </button>
                  </div>
                </div>
                <div className="bs-stepper-content">
                  <div id="step1" className="content">
                    <Step1 stepper={this.state.stepper} />
                  </div>
                  <div id="step2" className="content">
                    <Step2 stepper={this.state.stepper} />
                  </div>
                  <div id="step3" className="content">
                    <Step3 stepper={this.state.stepper} />
                  </div>
                  <div id="step4" className="content">
                    <Step4 stepper={this.state.stepper} />
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
