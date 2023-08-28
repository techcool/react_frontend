import class_img from "common/src/images/my_classes_ blue.svg";
import { fetchClasses,removeClass } from "common/src/old-api/classesActions";
import React from "react";
import {  Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClassIndex from "../components/students/classes/index";

class Index extends React.Component {

  constructor(){
    super();
    this.state = {
      classes : []
    };
  }

  componentDidMount(){
    this.fetchClassesList();
  }
  
  async removeClass(class_id) {
    const removed = await removeClass({  class_id });
    if (removed) {
      const { fetchClasses } = this.context;
      fetchClasses();
    }
  }

  async fetchClassesList() {
    const classes = await fetchClasses({});
    this.setState({ classes: classes });
  }

  render() {
    // const { classes } = this.context;
    return (
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card shadow-none border-0 px-3 py-4 mx-0">
          <Col sm={ 12 }>
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <div>
                <h2 className="card-heading">
                  <img src={ class_img } className="pr-2" alt="" />
                  My Classes
                </h2>
              </div>
              <div className="d-flex">
                <Link
                  variant="primary"
                  className="primary-btn sm"
                  to={ "/student/classes/new" }
                >
                  + Join a Class
                </Link>
              </div>
            </div>
          </Col>
          <Col sm={ 12 }>
            { this.state.classes.length === 0 ? (
              <Col className="sm-12 text-center  align-items-center mt-4 pt-4 pb-4 mb-4">
                <h2>No Classes Found Please Join a Class</h2>
              </Col>
            ) : (
              <ClassIndex
                classes={ this.state.classes }
                isFrom={ "student" }
                removeClass={ (class_id) => this.removeClass(class_id) }
              />
            ) }
          </Col>
        </Row>
      </div>
    );
  }
}

export default Index;
