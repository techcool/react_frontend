import { DashFooter } from "common/src/components/shared/dashFooter";
import routes from "common/src/constants/routes";
import all_students from "common/src/images/all_students.svg";
import apis from "common/src/swr";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StudentList from "../../components/tables/studentsList";

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

const TitleBar = () => {
  return (<Col sm={ 12 } className="mb-4">
    <div className="d-flex justify-content-between mb-4 align-items-center">
      <div>
        <h2 className="card-heading">
          <img src={ all_students } className="mr-2" height="22" alt="" />
          All Students
        </h2>
      </div>
    </div>
  </Col>
  );
};

const Index = () => {
  const [class_id, setClassId] = useState(null);
  const { data: classes } = apis.TEACHER.V0.CLASSES.useMyClasses({});
  const [filtering, setFiltering] = useState(defaultFilteringOption);

  const { value: { 
    sortBy = null,
    sortOrder = null
  } = {} } = filtering;
  const [searchPayload,setSearchPayload]=useState({ class_id, sortBy,sortOrder });
  useEffect(()=>setSearchPayload({ class_id, sortBy,sortOrder }),[class_id, sortBy,sortOrder]);
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card shadow-none border-0 px-3 py-4 mx-0">
          <TitleBar/>
          <Col sm={ 12 } className="mb-3">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h2 className="medium-heading">Student List</h2>
              </div>
              <Form.Group
                controlId="exampleForm.ControlSelect1"
                className="d-flex align-items-center mb-0"
              >
                <Form.Control
                  as="select"
                  className="form-control mr-2 "
                  style={ { minHeight: "39px" } }
                  onChange={ (e) => setClassId(e.target.value === "0" ? null : e.target.value) }
                >
                  { " " }
                  <option value={ 0 }>{ "All Classes" }</option>
                  { classes?.map((item,index) => {
                    return (
                      <option key={ index } value={ item._id } className="class-name">
                        { item.name }
                      </option>
                    );
                  }) }
                </Form.Control>
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
              <div className="col-auto">
                { " " }
                <Link
                  className="transparent-btn success"
                  to={ routes.TEACHER.PAGES.STUDENTS.INVITE }
                >
                  <span className="plus-span">+</span>Invite Students
                </Link>
              </div>
            </div>
          </Col>
          <Col sm={ 12 } className="table-responsive table-scroll-hidden">
            <StudentList searchPayload={ searchPayload }/>
          </Col>
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
};

export default Index;
