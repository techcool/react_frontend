import { DashFooter } from "common/src/components/shared/dashFooter";
import class_img from "common/src/images/my_classes_ blue.svg";
import { fetchClasses, removeClass } from "common/src/old-api/classesActions";
import React from "react";
import {  Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ClassIndex from "../components/students/classes/index";
import CreateClass from "../components/teachers/dialogs/createClassDialog";
import InviteStudent from "../components/teachers/dialogs/inviteDialog";

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      loading: true,
      showInvite: false,
      classData: {},
      classes: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.getClass = this.getClass.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }
  componentDidMount() {
    this.getClass();
  }
  async getClass() {
    const { accessToken, role } = this.props;
    const data = await fetchClasses({ accessToken, role });
    if (data) {
      this.setState({ classes: data, loading: false });
    }
  }
  async removeClass(class_id) {
    const { accessToken, role } = this.props;
    const removed = await removeClass({ accessToken, role, class_id });
    if (removed) {
      const data = await fetchClasses({ accessToken, role });
      if (data) {
        this.setState({ classes: data });
      }
    }
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
    this.getClass();
  }
  handleInvite(data) {
    this.setState({ showInvite: !this.state.showInvite, classData: data });
  }
  render() {
    const { classes, loading } = this.state;
    const { accessToken, role } = this.props;
    return (
      <React.Fragment>
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
                  <Button
                    className="primary-btn mr-3"
                    variant="success"
                    onClick={ () => {
                      // this.props.history &&
                      //   this.props.history.push("/teacher/classes/new");
                      this.handleShow();
                    } }
                  >
                    Create a Class
                  </Button>

                  <Link
                    variant="primary"
                    className="success-btn"
                    to={ "/teacher/create-assignment" }
                  >
                    Create Assignment
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={ 12 }>
              { loading ? (
                <div className="sm-12 text-center  align-items-center">
                  <h2>Loading...</h2>
                </div>
              ) : (
                <ClassIndex
                  classes={ classes }
                  removeClass={ (class_id) => this.removeClass(class_id) }
                  handleInvite={ this.handleInvite }
                />
              ) }
            </Col>
          </Row>
        </div>
        <DashFooter />
        { /*----------Modals----------*/ }
        <CreateClass
          show={ this.state.show }
          handleClose={ this.handleClose }
          accessToken={ accessToken }
          role={ role }
          fetchClasses={ this.getClass }
        />
        <InviteStudent
          show={ this.state.showInvite }
          handleClose={ this.handleInvite }
          accessToken={ accessToken }
          role={ role }
          fetchClasses={ this.getClass }
          classData={ this.state.classData }
        />

        { /* */ }

        { /* <Modal show={this.state.show} className="class-modal custom-radio" centered onHide={this.handleClose}>
          <Modal.Body >
          
            <div >
              <form >
                <h2 className="content-h2 mb-0">Import With Google Classroom</h2>
                <p className="text-dark mt-0 mb-3">Select classes to import. Note: the import process may take a few minutes to complete.</p>
                <div className="custom-checkbox">
                  <div className="d-flex align-items-start flex-column">
                    <Form.Check
                      inline
                      label="Select All"
                      name="name1"
                      type={'checkbox'}
                      className="mb-2"
                    />
                    <Form.Check
                      inline
                      label="Courtney Henry"
                      name="name1"
                      type={'checkbox'}
                      className="mb-2"
                    />
                    <Form.Check
                      inline
                      label="Floyd Miles"
                      name="name1"
                      type={'checkbox'}
                      className="mb-2"
                    />
                    <Form.Check
                      inline
                      label="Ronald Richards"
                      name="name1"
                      type={'checkbox'}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="btn-wrapper justify-content-start pt-0 mt-4">
                  <Button className="primary-btn-outline mr-3" variant="secondary">
                    Cancel
                  </Button>
                  <Button className="primary-btn w-auto" variant="secondary">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal> */ }
        { /* <Modal show={this.state.show} className="class-modal custom-radio" centered onHide={this.handleClose}>
          <Modal.Body >
            <div >
              <form >
                <h2 className="content-h2 mb-0">Import With Google Classroom</h2>
                <div className="box-complete mt-3">
                  <p className="mb-2">Import complete.</p>
                  <p className="mb-2">1 out of 1 classes Imported.</p>
                  <p className="mb-2">7 out of 7 student class enrollments have been imported.</p>
                </div>
                <div className="btn-wrapper  pt-0 mt-4">
                  <Button className="primary-btn w-100" variant="secondary">
                    Manage Class
                  </Button>

                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal> */ }
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role } = user;
  return {
    accessToken,
    role
  };
};

export default connect(mapStateToProps, null)(Index);
