import ChangePassword from "common/src/components/dialogs/changeStudentPassword";
import { DashFooter } from "common/src/components/shared/dashFooter";

import edit_icon from "common/src/images/edit_grey.svg";
import lock_icon from "common/src/images/lock_icon.svg";
import person from "common/src/images/profile.svg";
import {
  canTeacherChangePassword,
  fetchStudentAssignments,
  fetchStudentPractices,
  studentDetails
} from "common/src/old-api/classesActions";
import React from "react";
import {
  Tab, Tabs,
  Button,
  Col,
  Modal,
  ProgressBar,
  Row
} from "react-bootstrap";
import { connect } from "react-redux";

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "home",
      key2: "joined_classes",
      show: false,
      details: {},
      videos: [],
      assignments: [],
      classes: []
    };
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    const data = await studentDetails({id });
    if (data) {
      this.setState({ details: data, classes: data.classes });
      console.clear();
      const videos = await fetchStudentPractices({
        params: { student_id: id }
      });
      this.handleFetchPostWork(1);
      if (videos) {
        this.setState({ videos: videos });
      }
    }
  }
  handleFetchPostWork = async (page) => {
    const id = this.props.match.params.id;
    const postworks = await fetchStudentAssignments({
      params: {
        student_id: id,
        limit: 5,
        page: page
      }
    });
    if (postworks) {
      this.setState({ assignments: postworks });
    }
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleCheckPassword = async () => {
    const canChange = await canTeacherChangePassword({
      params: {
        student_id: this.state.details.student._id
      }
    });
    if (canChange) {
      this.handleShow();
    }
  };

  render() {
    const { details, videos, assignments, classes } = this.state;
    return (
      <React.Fragment>
        <div className="px-4 py-5 main-section top-zero">
          <Row>
            <Col md="12">
              <Row className="card mx-0 border-0 bg-transparent">
                { /* <Col className="d-flex justify-content-between">
                                    <h2 className="card-heading mb-4 d-flex">
                                        <img className="pr-2" height="24px" src={assignments_icon} />
                                        Class Name: English Grammar
                                    </h2>
                                    <Button variant="primary" onClick={this.handleShow} className="primary-btn-outline">Delete</Button>
                                </Col> */ }
                <Col className="px-0">
                  <div className="card border-0 custom-card bg-transparent">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={ this.state.key }
                      className="proper-tabs assign-tabs border-0"
                      onSelect={ (k) => this.setState({ key: k }) }
                    >
                      <Tab eventKey="home" title="Profile">
                        <div className="row">
                          <div className="col-md-4 px-0">
                            <div className="bg-blue-grey text-center h-100">
                              <div className="profile-banner-sm">
                                <div className="profile-img">
                                  <img
                                    height="100%"
                                    src={person}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="profile-footer">
                                <h4 className="medium-heading font-weight-bold">
                                  { details.student?.firstName +
                                    " " +
                                    details.student?.lastName }
                                </h4>
                                <p className="para mb-3">
                                  { details.student?.username ? (
                                    details.student?.username
                                  ) : (
                                    <></>
                                  ) }
                                </p>
                                { details.student?.isPremiumStudent ? (
                                  <span className="badge badge-org badge-small">
                                    Premium
                                  </span>
                                ) : (
                                  <span
                                    className="badge badge-org badge-small "
                                    style={ { background: "#5B5876" } }
                                  >
                                    Free
                                  </span>
                                ) }
                              </div>
                            </div>
                          </div>
                          { details.student?.isPremiumStudent ? (
                            <div className="col-md-8 px-0">
                              <div className="bg-white px-5 py-5 h-100">
                                <h2 className="card-heading mb-3">
                                  Basic Information
                                </h2>
                                <div className="row border-bottom pb-3 mb-4">
                                  <div className="col-md-3">
                                    <h4 className="medium-heading">
                                      Full Name:
                                    </h4>
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex justify-content-between">
                                      <p className="para">
                                        { " " }
                                        { details.student?.firstName +
                                          " " +
                                          details.student?.lastName }
                                      </p>
                                      <span>
                                        <img src={ lock_icon } alt="" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row border-bottom pb-3 mb-4">
                                  <div className="col-md-3">
                                    <h4 className="medium-heading">Email:</h4>
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex justify-content-between">
                                      <p className="para">
                                        { " " }
                                        { details.student?.email
                                          ? details.student?.email
                                          : "Not set yet" }
                                      </p>
                                      <span>
                                        <img src={ lock_icon } alt="" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row border-bottom pb-3 mb-4">
                                  <div className="col-md-3">
                                    <h4 className="medium-heading">
                                      Phone Number
                                    </h4>
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex justify-content-between">
                                      <p className="para">
                                        { " " }
                                        { details.student?.contact
                                          ? details.student?.contact
                                          : "Not set yet" }
                                      </p>
                                      <span>
                                        <img src={ lock_icon } alt="" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pb-3 mb-4">
                                  <div className="col-md-3">
                                    <h4 className="medium-heading">
                                      Joined Classes:
                                    </h4>
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex flex-wrap">
                                        { details.classes &&
                                          details.classes.map((item,index) => {
                                            return (
                                              <Button
                                                key={ index }
                                                variant="primary"
                                                className="primary-btn-outline bg-light-blue rounded-pill mr-3"
                                                onclick={ () => {
                                                  this.props.history &&
                                                    this.props.history.push(
                                                      `/teacher/classes/${item._id}/show`
                                                    );
                                                } }
                                              >
                                                { item.name }
                                              </Button>
                                            );
                                          }) }
                                      </div>
                                      <span>
                                        <img src={ lock_icon } alt="" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-md-8 px-0">
                              <div className="bg-white px-5 py-5 h-100">
                                <h2 className="card-heading mb-3">
                                  Basic Information
                                </h2>
                                <div className="row border-bottom pb-3 mb-4">
                                  <div className="col-md-3">
                                    <h4 className="medium-heading">
                                      Full Name:
                                    </h4>
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex justify-content-between">
                                      <p className="para">
                                        { " " }
                                        { details.student?.firstName +
                                          " " +
                                          details.student?.lastName }
                                      </p>
                                      <span>
                                        <img src={ lock_icon } alt="" />
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="row border-bottom pb-3 mb-4">
                                  <div className="col-md-3">
                                    <h4 className="medium-heading">
                                      Manage Password:
                                    </h4>
                                  </div>
                                  <div className="col-md-9">
                                    <div className="d-flex justify-content-between">
                                      <p className="para">****************</p>
                                      <span>
                                        <img
                                          src={ edit_icon }
                                          alt=""
                                          style={ { cursor: "pointer" } }
                                          onClick={ () => {
                                            this.handleCheckPassword();
                                          } }
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) }
                        </div>
                      </Tab>
                      <Tab eventKey="students" title="Performance">
                        <div className="row">
                          <div className="col-md-4 px-0">
                            <div className="bg-blue-grey text-center h-100">
                              <div className="profile-banner-sm">
                                <div className="profile-img">
                                  <img
                                    height="100%"
                                    src={person}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="py-4 profile-footer">
                                <h4 className="medium-heading font-weight-bold">
                                  { details.student?.firstName +
                                    " " +
                                    details.student?.lastName }
                                </h4>
                                <p className="para mb-3">
                                  { details.student?.username
                                    ? details.student?.username
                                    : "----------" }
                                </p>
                                <span className="badge badge-org badge-small">
                                  { details.student?.isPremiumStudent
                                    ? "Premium"
                                    : "Free" }
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8  px-0">
                            <div className="bg-white px-5 py-5 h-100">
                              <Tabs
                                id="tab-example"
                                activeKey={ this.state.key2 }
                                className="teach-tabs mb-4 perform-tabs assign-tabs border-0"
                                onSelect={ (k) => this.setState({ key2: k }) }
                              >
                                <Tab
                                  eventKey="joined_classes"
                                  title={
                                    <div className="d-flex-between">
                                      <span>Joined Classes</span>{ " " }
                                      <span>{ classes.length }</span>{ " " }
                                    </div>
                                  }
                                >
                                  { classes &&
                                    classes.map((item,index) => {
                                      return (
                                        <div 
                                          key={ index }
                                          className="p-4 bg-grey mb-3 d-flex justify-content-between"
                                        >
                                          <h4 className="medium-heading">
                                            { item.name }
                                          </h4>
                                          { /* item._id */ }
                                          <Button
                                            className="white-btn org"
                                            onClick={ () => {
                                              this.props.history &&
                                                this.props.history.push(
                                                  `/teacher/reports/classes/${item._id}/students/${details.student._id}`
                                                );
                                            } }
                                          >
                                            Check Progress
                                          </Button>
                                        </div>
                                      );
                                    }) }
                                </Tab>
                                <Tab
                                  eventKey="videos"
                                  title={
                                    <div className="d-flex-between">
                                      <span>Videos</span>{ " " }
                                      <span>{ videos.length }</span>{ " " }
                                    </div>
                                  }
                                >
                                  { videos?.map((item,index) => {
                                      return (
                                        <div
                                        key={index} 
                                        className="p-4 bg-grey align-items-center flex-wrap mb-3 d-flex justify-content-between"
                                        >

                                          <div className="col-md-6">
                                            <h4 className="medium-heading">
                                              { item.video.title }
                                            </h4>
                                          </div>
                                          <div className="col-md-6">
                                            <ProgressBar
                                              variant="success"
                                              className="green-progress progress-md"
                                              label={ `${Number.isInteger(item.completedActivitiesPercentage)?item.completedActivitiesPercentage:item.completedActivitiesPercentage.toFixed(2)}%` }
                                              now={ Number.isInteger(item.completedActivitiesPercentage)?item.completedActivitiesPercentage:item.completedActivitiesPercentage.toFixed(2) }
                                            />
                                          </div>
                                        </div>
                                      );
                                    }) }
                                  { videos && videos.length == 0 &&
                                    <div className="text-center mt-4">No Practices</div>
                                  }
                                </Tab>
                                <Tab
                                  eventKey="assignments"
                                  title={
                                    <div className="d-flex-between">
                                      <span>Assignments</span>{ " " }
                                      <span>
                                        { assignments?.postworks?.length }
                                      </span>{ " " }
                                    </div>
                                  }
                                >
                                  { assignments && assignments.postworks && assignments.postworks.length == 0 &&
                                    <div className="text-center mt-4">No Assignments</div>
                                  }
                                  { assignments && assignments.postworks &&
                                    assignments.postworks.map((item) => {
                                      return (
                                        <div className="p-4 bg-grey align-items-center flex-wrap mx-0 mb-3 row justify-content-between">
                                          <h4 className="medium-heading col-md-3">
                                            { item.title }
                                          </h4>
                                          <div className="col-md-6">
                                            <ProgressBar
                                              variant="success"
                                              className="green-progress progress-md"
                                              label={ `${Number.isInteger(item?.completedActivitiesPercentage) ? item?.completedActivitiesPercentage : item?.completedActivitiesPercentage?.toFixed(2)}%` }
                                              now={ Number.isInteger(item?.completedActivitiesPercentage) ? item?.completedActivitiesPercentage : item?.completedActivitiesPercentage?.toFixed(2) }
                                            />
                                          </div>
                                          <div>
                                            <Button
                                              className="primary-btn sm orange-btn"
                                              disabled={ item.submissionsCount == 0 }
                                              onClick = { () => {
                                                this.props.history &&
                                                this.props.history.push(
                                                  `/teacher/progress/${item.postworkId}/students/${this.props.match.params.id}`
                                                );
                                                
                                              } }
                                            >
                                              Review
                                            </Button>

                                          </div>
                                        </div>
                                      );
                                    }) }
                                  { /* <Pagination className="float-right">
                                    <Pagination.Prev
                                      disabled={!assignments.hasPrevPage}
                                      onClick={() =>
                                        this.handleFetchPostWork(
                                          assignments.prevPage
                                        )
                                      }
                                    >
                                      Prev
                                    </Pagination.Prev>
                                    {assignments.prevPage && (
                                      <Pagination.Item
                                        onClick={() =>
                                          this.handleFetchPostWork(
                                            assignments.prevPage
                                          )
                                        }
                                      >
                                        {assignments.prevPage}
                                      </Pagination.Item>
                                    )}
                                    <Pagination.Item active>
                                      {assignments.page}
                                    </Pagination.Item>
                                    {assignments.nextPage && (
                                      <Pagination.Item
                                        onClick={() => {
                                          this.handleFetchPostWork(
                                            assignments.nextPage
                                          );
                                        }}
                                      >
                                        {assignments.nextPage}
                                      </Pagination.Item>
                                    )}
                                    <Pagination.Next
                                      disabled={!assignments.hasNextPage}
                                      onClick={() => {
                                        this.handleFetchPostWork(
                                          assignments.nextPage
                                        );
                                      }}
                                    >
                                      Next
                                    </Pagination.Next>
                                  </Pagination> */ }
                                </Tab>
                              </Tabs>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Modal
          show={ this.state.show }
          className="class-modal"
          onHide={ this.handleClose }
        >
          <Modal.Body>
            <ChangePassword
              handleClose={ this.handleClose }
              id={ this.props.match.params.id }
              accessToken={ this.props.accessToken }
            />
          </Modal.Body>
        </Modal>
        <DashFooter />
      </React.Fragment>
    );
  }
}

export default StudentProfile;
