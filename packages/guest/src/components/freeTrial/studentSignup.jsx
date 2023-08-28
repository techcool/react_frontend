import React, { Component } from 'react';
import StudentSignupHtml from '../joinAClassWithSignup/steps/step3';
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

export default class StudentSignup extends Component {
    constructor(props) {
        super(props);
        let isRedirect = false;
        if (!props.location || !props.location.state || !props.location.state.isValid) {
            isRedirect = true;
        }
        this.state = {
            isRedirect: isRedirect
        }
    }
    render() {
        if (this.state.isRedirect) {
            return <Redirect to="/" />
        }
        return (
            <Container className="h-100 studentsignup-header justify-content-center d-flex curve-shape stepper-wrapper">
                <Row>
                    <Col xs={12}>
                        <div className="bs-stepper-content">
                            <div className="content">
                                <StudentSignupHtml isFromFreeTrial={true} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        )
    }
}
