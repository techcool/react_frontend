import React from "react";
import { Row, Col, Form, Pagination, Table, Tab, Tabs, Accordion, useAccordionToggle, Card } from "react-bootstrap";
import { connect } from "react-redux";
import ReactSelect from "react-select";
import PieChart from "common/src/components/charts/pieChart";
import { DashFooter } from "common/src/components/shared/dashFooter";
// import { Card as CustomCard } from "common/src/components/shared/card";
import { fetchClasses } from "common/src/old-api/classesActions";
import {
  fetchPostworks,
  fetchPostworksV1,
} from "common/src/old-api/postworksActions";
import moment from "moment";
import stats_icon from "common/src/images/stats_icon.svg";
import videoicon from "common/src/images/video-icon.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import down_arrow from "common/src/images/arw_down2.svg";

const Capital = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

class ClassStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "home",
      classes: [],
      selectedClass: {},
      postWorkList: [],
      postWorkStudent: {},
      postworkDetails: {},
      pagination: {},
      checked: false,
      type: false,
      postworkId: null,
      category: {
        value: null,
        label: "All",
      },
      overallScore: '',
      overallProgress: '',
      activeAccordionItem:'0',
      isAssignmentProgressPanel:false,
      isLoading:true
    };
  }
  async componentDidMount() {
    const { accessToken, role } = this.props;
    const classes = await fetchClasses({ accessToken, role });
    if (classes) {
      const DropdownData = await classes.map((item) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      this.setState({
        classes: DropdownData,
        selectedClass: DropdownData?.[0],
      });
      this.getPostworks(DropdownData?.[0]?.value, undefined, 1);
    }
  }

  getPostworks = async (classId, category, page) => {
    const postworks = await fetchPostworksV1({
      role: "teacher",
      filter: { classId },
    });
    if (postworks) {
      this.setState({ postWorkList: postworks, isLoading: false });
    }
  };


  getPostWorkProgress = async (val) => {
    this.setState({ postworkId: val, postworkDetails: {}, activeAccordionItem:'-1', isAssignmentProgressPanel:true});
    let postworkData = this.state.postWorkList ? this.state.postWorkList.filter((item) => item.postworkId == val) : [];


    if (postworkData.length > 0) {
      this.setState({
        postworkDetails: postworkData[0],
        postWorkStudent: postworkData?.[0]?.assignees,
        overallProgress: postworkData?.[0]?.assignees?.['overallProgress'],
        overallScore: postworkData?.[0]?.assignees?.['overallScore'],
      });
    }

    // const res = await fetchAssigneeProgress({
    //   accessToken,
    //   role,
    //   postwork_id: val,
    // });
    // if (res) {
    //   let count = 0;
    //   res.students &&
    //     res.students.forEach((student) => {
    //       count += student.score;
    //     });

    //   this.setState({
    //     postWorkStudent: res,
    //     count: count > 0 ? count / res.students.length : count,
    //   });
    // }
  };

  handleChange = (val) => {
    this.setState({
      selectedClass: val,
      postWorkStudent: {},
      postworkId: null,
    });
    this.getPostworks(val?.value, 0, 1);
  };

  handleCategoryChange = (val) => {
    this.setState({ category: val });
    this.getPostworks(this.state.selectedClass.value, val.value, 1);
  };

  handlePagination = () => {
    return (
      <div className="col-sm-12">
        <Pagination className="m-auto justify-content-center">
          <Pagination.Prev
            disabled={!this.state.pagination.hasPrevPage}
            onClick={() =>
              this.getPostworks(
                this.state.selectedClass.value,
                this.state.category.value,
                this.state.pagination.prevPage
              )
            }
          >
            Prev
          </Pagination.Prev>
          {this.state.pagination.prevPage && (
            <Pagination.Item
              onClick={() =>
                this.getPostworks(
                  this.state.selectedClass.value,
                  this.state.category.value,
                  this.state.pagination.prevPage
                )
              }
            >
              {this.state.pagination.prevPage}
            </Pagination.Item>
          )}
          <Pagination.Item active>{this.state.pagination.page}</Pagination.Item>
          {this.state.pagination.nextPage && (
            <Pagination.Item
              onClick={() => {
                this.getPostworks(
                  this.state.selectedClass.value,
                  this.state.category.value,
                  this.state.pagination.nextPage
                );
              }}
            >
              {this.state.pagination.nextPage}
            </Pagination.Item>
          )}
          <Pagination.Next
            disabled={!this.state.pagination.hasNextPage}
            onClick={() => {
              this.getPostworks(
                this.state.selectedClass.value,
                this.state.category.value,
                this.state.pagination.nextPage
              );
            }}
          >
            Next
          </Pagination.Next>
        </Pagination>
      </div>
    );
  };
  handleAccordion = () => {
    if(this.state.isAssignmentProgressPanel){
      this.setState({activeAccordionItem : '0', isAssignmentProgressPanel: false});
    }
  }
  render() {
    // const [key, setKey] = useState('home');
    const { postWorkList } = this.state;
    return (
      <React.Fragment>
        <div className="p-4 main-section top-zero">
          <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
            <Col className="d-flex justify-content-between">
              <h2 className="card-heading mb-4 d-flex">
                <img className="pr-2" height="24px" src={stats_icon} alt="" />
                Class Stats
              </h2>
            </Col>
            <Col>
              <div className="mt-4">
                <div className="col-md-4 px-0">
                  <label htmlFor={"posttype"}>Class Name</label>
                  <ReactSelect
                    id={"posttype"}
                    className="lit-react-select grey"
                    placeholder="Classes"
                    isClearable
                    options={this.state.classes}
                    onChange={(val) => {
                      this.handleChange(val);
                    }}
                    value={this.state.selectedClass}
                  />
                </div>
              </div>
              <div className="mt-3">
                {/* <Form.Check
                  inline
                  label="Practice"
                  checked={this.state.type}
                  onChange={() => {
                    this.setState({ type: !this.state.type, postworkId: "" });
                  }}
                  name="haveAccount"
                  type={"radio"}
                  className="custom-radio"
                /> */}
                {/* <Form.Check
                  inline
                  label="Assignment"
                  checked={!this.state.type}
                  onChange={() => {
                    this.setState({ type: !this.state.type, postworkId: "" });
                  }}
                  name="haveAccount"
                  type={"radio"}
                  className="custom-radio"
                /> */}
              </div>
            </Col>
          </Row>
          <Accordion activeKey={this.state.activeAccordionItem} defaultActiveKey={this.state.activeAccordionItem}  className="w-100 px-2" style={{ cursor: 'pointer' }}>
            <Card className="mb-3 p-3 rounded bg-white" style={{ border: '1px solid #e7eaec' }} onClick={this.handleAccordion}>
              <CustomToggle eventKey="0">
                <div className="pointer d-flex">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="font-sm text-grey fw-500">
                      Assignment
                    </span>
                  </div>
                  <div className="ml-auto">
                    <img
                      src={down_arrow}
                      className="ml-1"
                      height="12px"
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </CustomToggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row className="card">
                    {/* <Col className="d-flex mb-4">
                      <Row className="w-100">
                        <div className="col-auto">
                          <h2 className="card-heading">Assignment</h2>
                        </div>
                      </Row>
                    </Col> */}
                    <Col>
                      <div className="card border-0 custom-card assign-outer classinfo-tab-outer mb-4">
                        <Tabs
                          id="controlled-tab-example"
                          activeKey={this.state.key}
                          className="teach-tabs assign-tabs class-stats-tabs"
                          onSelect={(k) => this.setState({ key: k })}
                        >
                          <Tab eventKey="home" title="Video">
                            <div className="row card-scroll m-0">
                              {
                                this.state.isLoading && <div className="col-sm-12 text-center">
                                  Loading...
                                </div>
                              }
                              {postWorkList?.length > 0 ?
                                  (
                                    postWorkList.map((item, i) => {
                                      return (

                                        <div className="col-sm-12 col-md-3 col-lg-3  mb-4 px-2"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => this.getPostWorkProgress(item.postworkId)}
                                          className='col-sm-12 col-md-3 col-lg-3  mb-4'
                                        >
                                          <div className={this.state.postworkId == item.postworkId ? 'card-highlight assignment-card card-box-shadow' : 'assignment-card card-box-shadow card-border-transparent'}>
                                            <h2 className="medium-heading mb-3 d-flex align-items-start">
                                              <img src={videoicon} className="pr-2" alt="" />
                                              {item.title ? item.title : item.videoTitle}
                                            </h2>
                                            <div className="mb-3">
                                              <h3 className="d-inline-flex fw-500">
                                                {" "}
                                                {item.submissionsCount > 0 ? (
                                                  <span className="text-green"> &#9679; Completed</span>
                                                ) : item.submissionsCount === 0 &&
                                                  new Date(item.dueDate) >=
                                                  new Date(new Date().setHours(0, 0, 0, 0)) &&
                                                  new Date(item.startDate) >=
                                                  new Date(new Date().setHours(0, 0, 0, 0)) ? (
                                                  <span className="text-org"> &#9679; Upcoming</span>
                                                ) : item.submissionsCount === 0 &&
                                                  new Date(item.dueDate) < Date.now() &&
                                                  new Date(item.startDate) < Date.now() ? (
                                                  <span className="text-red"> &#9679; Past Due</span>
                                                ) : (
                                                  <></>
                                                )}
                                              </h3>
                                            </div>
                                            <div className="mb-3">
                                              <span className="pr-3 fw-500 text-dark">Start Date:</span>
                                              <span className="d-inline-flex">
                                                {" "}
                                                <span className="d-inline-flex fw-500">
                                                  {" "}
                                                  {item.startDate
                                                    ? moment(item.startDate).format("DD-MMM-YYYY")
                                                    : "----------"}
                                                </span>
                                              </span>
                                            </div>
                                            <div className="mb-3">
                                              <span className="pr-3 fw-500 text-dark">Due Date:</span>
                                              <span className="d-inline-flex">
                                                {" "}
                                                <span className="d-inline-flex fw-500">
                                                  {" "}
                                                  {item.dueDate
                                                    ? moment(item.dueDate).format("DD-MMM-YYYY")
                                                    : "----------"}
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) :
                                  (
                                    !this.state.isLoading && <h3>No Assignment found</h3>
                                  )
                              }
                            </div>
                          </Tab>
                          <Tab eventKey="storybooks" title="Storybooks">
                            <h2> Coming Soon</h2>
                          </Tab>
                        </Tabs>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {this.state.postworkId && (
            <Col className="card border-0 shadow-none px-3 py-4 mx-0 mt-5">
              <div className="row mb-4">
                <div className="col-sm-12 col-md-3"></div>
                <div className="col-sm-12 col-md-3">
                  <PieChart
                    score={
                      this.state.overallProgress ? Number.isInteger(this.state.overallProgress) ?
                        this.state.overallProgress :
                        this.state.overallProgress.toFixed(2) : 0}
                    pieTitle="Overall Progress"
                    isDefault={true}
                    pie={true}
                  />
                </div>
                <div className="col-sm-12 col-md-3">
                  <PieChart
                    score={
                      this.state.overallProgress ? Number.isInteger(this.state.overallScore) ?
                        this.state.overallScore :
                        this.state.overallScore.toFixed(2) : 0}
                    pieTitle="Overall Performance"
                    isDefault={true}
                  />
                </div>
                <div className="col-sm-12 col-md-3"></div>
              </div>

              <div className="card border-0 custom-card assign-outer classinfo-tab-outer mb-4">
                {this.state.type ? (
                  <Table hover className="theme-table alternate">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Numbers of attempt </th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.postWorkStudent &&
                        this.state.postWorkStudent?.students?.map((item, i) => {
                         
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td className="class-name">
                                {item.studentName.firstName + " " + item.studentName.lastName}
                              </td>
                              <td>{item.submissionsCount}</td>
                              <td>
                                {
                                  item.submissionsCount > 0 ?
                                    <span
                                      className="badge-md "
                                      style={{
                                        backgroundColor: "#13bbed",
                                        borderRadius: "0px",
                                        color: "#fff",
                                      }}
                                    >
                                      {item.totalScore}%
                                </span> : '-NA-'
                                }

                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                ) : (
                  <Table hover className="theme-table alternate">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Numbers of attempt </th>
                        <th>Start Date</th>
                        <th>Complete Date</th>
                        <th>status</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.postWorkStudent &&
                      this.state.postWorkStudent['students'] && this.state.postWorkStudent['students'].length > 0 ?
                        this.state.postWorkStudent?.students?.map((item, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>
                                <Link to={`${'/teacher/student/' + item.studentId}`}>{Capital(item?.studentName?.firstName) + " " + Capital(item?.studentName?.lastName)}</Link></td>
                              <td>{item.submissionsCount}</td>
                              <td>
                                {this.state.postworkDetails && this.state.postworkDetails['startDate'] ?
                                  moment(this.state.postworkDetails['startDate']).format("DD/MM/yyyy") : '-NA-'}
                              </td>
                              <td>
                                {item.lastSubmissionDate ?
                                  moment(item.lastSubmissionDate).format(
                                    "DD/MM/yyyy"
                                  ) : 'Not Submitted'}
                              </td>
                              <td>{item.submissionsCount > 0 ? "Completed" : "Pending"}</td>
                              <td>
                                {item.lastSubmissionDate ?
                                  <span className="badge-md ">{item.totalScore}%</span> : '-NA-'}
                              </td>
                            </tr>
                          );
                        })
                      :<tr><td colSpan="7" className="text-center">No Student Found</td></tr>
                      }
                    </tbody>
                  </Table>
                )}
              </div>
            </Col>
          )}{" "}
        </div>

        <DashFooter />
      </React.Fragment >
    );
  }
}

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <div className="medium-heading" onClick={decoratedOnClick}>
      { children}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { accessToken, role },
  } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(ClassStats);
