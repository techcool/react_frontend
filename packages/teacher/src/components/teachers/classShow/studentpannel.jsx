import all_students from "common/src/images/all_students.svg";
import React, { useEffect, useState } from "react";
import {  Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StudentList from "../../tables/studentsList";

const filteringOptions = [
  {
    label: "Last Name A to Z",
    value: {
      sortBy: "lastName",
      sortOrder: 1
    }
  },
  {
    label: "Last Name Z to A",
    value: {
      sortBy: "lastName",
      sortOrder: -1
    }
  },
  {
    label: "New to Old",
    value: {
      sortBy: "creationDate",
      sortOrder: 1
    }
  },
  {
    label: "Old to New",
    value: {
      sortBy: "creationDate",
      sortOrder: -1
    }
  }
];

const defaultFilteringOption = filteringOptions[0];

const Index = (props)=> {
  const [filtering, setFiltering] = useState(defaultFilteringOption);
  const { value: { 
    sortBy = null,
    sortOrder = null
  } = {} } = filtering;
  const [classId]= useState(props.id);
  const [searchPayload,setSearchPayload]=useState({ class_id:classId, sortBy,sortOrder });
  useEffect(()=>{
    setSearchPayload({ class_id:classId ,sortBy,sortOrder });
  },[ classId,sortBy,sortOrder]);

  return (
    <React.Fragment>
      <Row className="">
        <Col sm={ 12 }>
          <div className="row justify-content-between mb-4 align-items-center">
            <Col xs={ 6 } md={ 6 } lg={ 6 }>
              <h2 className="card-heading">
                <img src={ all_students } className="mr-2" height="22" alt="" />
                Students List
              </h2>
            </Col>
            <Col >
              <Row className="align-items-center justify-content-end">
                <Col xs={ 6 }>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="d-flex align-items-center mb-0"
                  >
                    <Form.Control
                      as="select"
                      className="form-control "
                      style={ { minHeight: "39px" } }
                      onChange={ (e) =>setFiltering( filteringOptions[e.target.value]) }
                    >
                      { filteringOptions?.map((item,index) => {
                        return (
                          <option key={ index } value={ index } className="class-name">
                            { item.label }
                          </option>
                        );
                      }) }
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col >
                  { " " }
                  <Link
                    className="transparent-btn success"
                    to={ "/teacher/invite" }
                  >
                    <span className="plus-span">+</span>Invite Students
                  </Link>
                </Col>
              </Row>
            </Col>
          </div>
        </Col>
        <Col sm={ 12 } className="overflow-auto">
          <StudentList
            searchPayload={ searchPayload }          
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};



export default Index;
