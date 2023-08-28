import React ,{ useCallback, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./dashboard.css";
import classes_blue from "common/src/images/classes_blue.svg";
import assignments_blue from "common/src/images/assignments_blue.svg";
import students_blue from "common/src/images/students_blue.svg";
import { Link } from "react-router-dom";
import swr from "common/src/swr";

var _ = require("lodash");

const Index = (props) => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const { data: value = {} } = swr.TEACHER.V0.DASHBOARD.useFetchCount({});
  React.useEffect(() => {
    search(searchKeywords);
  }, [searchKeywords]);


  const search = useCallback(
    _.debounce(keyword => {
      props?.onUpdatesearchKeywords?.(keyword);
    }, 200),
    []
  );

  return (
    <div className="">
      <Row>
        <Col xs={ 12 } md="3">
          <Link to="/teacher/classes" className="dash-card">
            <h2>
              <img src={ classes_blue } className="mr-3" height="20" alt="" />
              Classes
            </h2>
            <span>{ value.classes }</span>
          </Link>
        </Col>
        <Col xs={ 12 } md="3">
          <Link className="dash-card" to="/teacher/students">
            <h2>
              <img src={ students_blue } className="mr-3" height="20" alt="" />
              Students
            </h2>
            <span>{ value.students }</span>
          </Link>
        </Col>
        <Col xs={ 12 } md="3">
          <Link className="dash-card" to="/teacher/postwork">
            <h2>
              <img src={ assignments_blue } className="mr-3" height="20" alt="" />
              Assignments
            </h2>
            <span>{ value.assignments }</span>
          </Link>
        </Col>
        <Col xs={ 12 } md="3">
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Search"
            value={ searchKeywords }
            onChange={ (e) => setSearchKeywords(e.target.value) }
          />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
