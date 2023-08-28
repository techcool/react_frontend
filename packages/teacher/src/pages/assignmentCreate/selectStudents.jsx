import user_blue from "common/src/images/user_blue.svg";
import { fetchClasses, studentList } from "common/src/old-api/classesActions";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

var _ = require("lodash");

export default function SelectStudents(props) {

  const history = useHistory();

  const handleStudents = async (class_id) => {
    if (props.selectedClasses.includes(class_id)) {
      const res = await studentList({
        params: {
          class_id: class_id
        }
      });
      if (res) {
        props.showDialog(res, class_id);
      }
    }
  };

  const onSubmit = () => {
    if (props.attempts) {
      props.setStep(3, props.selectedClasses);
    }
  };

  if (props.selectedClasses.length == 0) {
    return (
      <div>
        <Row className="card px-3 py-4 mx-0 mb-5">
          <Col className="mb-4">
            <h2 className="card-heading d-flex align-items-center">
              Please select atleast one classe
            </h2>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      <Row className="card px-3 py-4 mx-0 mb-5">
        <Col className="mb-4">
          <h2 className="card-heading d-flex align-items-center">
            <img src={ user_blue } className="pr-2" height="18px" alt="" /> Select Students
          </h2>
        </Col>
        <Col>
          <Row className="mb-5">
            { props.classesData?.length > 0 ? (
              props.classesData?.map((item) => {
                if (props.selectedClasses.includes(item._id)) {
                  let selectedStudent  = _.find(props.allData, {_id:item._id});
                  return (
                    
                    <Col md={3} key={item._id} className="mb-5">
                      <div
                        className="select-class-card select-class-card-border select-dark-card"
                        style={ {
                          position: "relative"
                        } }
                      >
                        <div
                          style={ {
                            position: "absolute",
                            zIndex: 0,
                            top: 0,
                            left: 0
                          } }
                          className="w-100 h-100"
                        >
                          { " " }
                        </div>
                        <h2 className="medium-heading sd">{ item.name }</h2>
                      </div>
                      <div
                        className={ (selectedStudent && selectedStudent['students'] &&selectedStudent['students'].length > 0 ) ? "font-sm select-student-btn student-selected" : "font-sm select-student-btn" }
                        onClick={() => handleStudents(item._id)}
                      >Select Student
                      </div>
                    </Col>
                  );
                }
              }
              )
            ) : <></> }
          </Row>
        </Col>
        <Col md={12} className="mt-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <Button
              variant="primary"
              className="primary-btn-outline mb-2 full-width-btn"
              onClick={() => {
                props.setStep(1);
              } }
            >
              Previous
            </Button>
            <Button
              variant="primary"
              className="primary-btn full-width-btn"
              onClick={() => onSubmit()}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
