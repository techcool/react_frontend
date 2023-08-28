/* eslint-disable eqeqeq */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Button, Form, Table, ProgressBar, useAccordionToggle, Accordion, Card } from "react-bootstrap";
import ReactSelect from "react-select";
import { connect } from "react-redux";
import {
  fetchPostwork,
  fetchAssigneeProgress,
  updatePostwork,
} from "common/src/old-api/postworksActions";
import { fetchSuggestedExercises } from "common/src/old-api/videosActions";
import moment from "moment";
import arw_left from "common/src/images/blue_arw_left.svg";
import edit_grey from "common/src/images/arw_down2.svg";
import edit_pencil from "common/src/images/edit_pencil.svg";
import Exercises from "common/src/components/dialogs/exercise";
import GrammarBank from "common/src/components/dialogs/grammerBank";
import Vocabulary from "common/src/components/dialogs/vocabulary";
import { EXERCISES_IDS, EXERCICES_TITLES_OBJECT } from "common/src/constants";

const _ = require("lodash");

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sr_no: 0,
      key: "home",
      classesData: [], // containg complete class response object
      classes: [], // modified as per react select
      selectedClass: {},
      studentsAsPerClass: [],
      postwork_id: '',
      postwork: {},
      postWorkStudent: [],
      filtertedPostWorkStudent: [],
      exercises: [],
      t: "",
      id: "",
      GrammarBank: false,
      Vocabulary: false,
      isDisabled: false,
      show: false,
      exerciseData: {},
      GlobalExercise: [],
      videoUrl: ''
    };
    this.handleExercisesData = this.handleExercisesData.bind(this);
  }

  async componentDidMount() {
    this.fetchPostworkData();
  }

  isClassFilterClear = () => {
    this.setState({ filteredPostWorkStudent: this.state.postWorkStudent['students'] });
  }

  handleFilerStudents = async (data, isupdate = false) => {

    let tempStudentsAsPerClass = [];

    if (data && data['students'] && data['students'].length > 0) {

      tempStudentsAsPerClass = await data['students'].map((item) => {
        return item._id
      });

    }

    if (isupdate && tempStudentsAsPerClass.length > 0) {

      let stuAsPerClasses = await this.state.postWorkStudent['students'].filter((item) => {
        if (tempStudentsAsPerClass.includes(item.studentId)) {
          return item;
        }
      });
      this.setState({ filteredPostWorkStudent: stuAsPerClasses });
    }

    this.setState({
      studentsAsPerClass: tempStudentsAsPerClass
    });
  }

  fetchPostworkData = async () => {
    const { postwork_id } = this.props.match.params;
    this.setState({ postwork_id: postwork_id })
    const data = await fetchPostwork({ postwork_id });
    if (data) {
      let today = moment(new Date()).format("YYYY-MM-DD");
      let day = moment(data.startDate).format("YYYY-MM-DD");
      let disabled = moment(day).isSameOrBefore(today);
      console.clear();

      // populate class dropdown

      let tempClasses = [];
      if (data.classes) {
        tempClasses = data.classes.map((item) => {
          return {
            value: item._id,
            label: item.name
          }
        });
      }

      if (tempClasses.length > 0) {
        this.handleFilerStudents(data.classes[0]);
      }

      this.setState({
        classesData: data.classes,
        classes: tempClasses,
        selectedClass: tempClasses?.[0],
        postwork: data,
        exercises: data.exercises,
        isDisabled: disabled,
        videoUrl: data?.video?.url?.split(' ').join('%20')
      });

      await this.getPostWorkProgress(postwork_id);
      await this.getGlobalExercises(data.video_id);



    }
  };

  getGlobalExercises = async (id) => {
    const res = await fetchSuggestedExercises({
      video_id: id,
    });
    if (res) {
      this.setState({ GlobalExercise: res });
    }
  };

  getPostWorkProgress = async (val) => {
    this.setState({ postworkId: val });
    const res = await fetchAssigneeProgress({
      postwork_id: val,
    });
    if (res) {

      this.setState({ postWorkStudent: res });

      let filteredStudent = [];

      for (let i = 0; i < res['students'].length; i++) {
        if (this.state.studentsAsPerClass.includes(res['students'][i].studentId)) {
          filteredStudent.push(res['students'][i]);
        }
      }

      console.log('filteredStudent', filteredStudent);

      this.setState({
        filteredPostWorkStudent: filteredStudent,
      });
    }
  };

  handleClose = () => {
    this.setState({ id: "" });
  };
  handleCheck = async (e, item) => {
    let exerciseArr = [];
    if (e.target.checked) {
      const value = this.state.postwork.video.practiceExercises.filter(
        (i) => i.id == item
      );

      const res = [...this.state.exercises, ...value];

      this.setState({ exercises: res });
      // exerciseArr = res;
      //this.handleUpdatePostwork();
    } else {
      const value = this.state.exercises.filter((i) => i.id !== item);
      this.setState({ exercises: value });
      // exerciseArr = value;
      // this.handleUpdatePostwork();
    }
  };
  setExerciseDialog = (id) => {
    const exerciseData = this.state.exercises.filter((item) => item.id === id);
    this.setState({ show: true, exerciseData: exerciseData[0] });
  };
  handleExercisesData = (data) => {
    // const rest = this.state.exercises.filter((item) => item.id !== data.id);
    // const exercises = rest.push(data);
    const dialogIndex = this.state.exercises.findIndex(
      (item) => item.id == data.id
    );
    const tempList = JSON.parse(JSON.stringify(this.state.exercises));
    tempList[dialogIndex] = data;
    this.setState({ exerciseData: tempList });
    this.handleUpdatePostwork(tempList);
  };
  handleUpdatePostwork = async () => {
    const { postwork_id } = this.props.match.params;
    const class_id = this.state.postwork.classes;
    const exerciseArr = this.state.exercises;
    const response = await updatePostwork({
      postwork: {
        classes: class_id,
        postwork_id: postwork_id,
        exercises: exerciseArr,
        allStudents: this.state.postwork.allStudents,
        attempts: this.state.postwork.attempts,
        dueDate: this.state.postwork.dueDate,
        startDate: this.state.postwork.startDate,
        title: this.state.postwork.title,
        students: this.state.postwork.students,
        videoCaption: this.state.postwork.videoCaption
      },
    });
    if (response) {
      setTimeout(() => {
        window.location.href = '/teacher/postwork';
      }, 2000);
    }
  };

  onSubTitleChange = async (e) => {
    let postworkDetails = this.state.postwork;
    postworkDetails['videoCaption'] = e.target.checked;
    this.setState({ postwork: postworkDetails })
  }

  onDueDate = (e) => {
    if (moment(this.state.postwork.startDate).isBefore(e.target.value)) {
      let postworkDetails = this.state.postwork;
      postworkDetails.dueDate = e.target.value;
      this.setState({ postwork: postworkDetails });
    }

  };

  onStartDate = (e) => {
    if (
      moment(moment(new Date()).format("YYYY-MM-DD")).isBefore(e.target.value)
    ) {
      let postworkDetails = this.state.postwork;
      postworkDetails.startDate = e.target.value;
      postworkDetails.dueDate = e.target.value;
      this.setState({ postwork: postworkDetails });
    }
  };

  handleChange = (val) => {

    if (val) {

      let classDetails = this.state.classesData.filter(item => item._id == val.value);
      classDetails.length > 0 ? this.handleFilerStudents(classDetails[0], true) : '';

    } else {
      // on remove class filter 
      this.isClassFilterClear()
    }

    this.setState({
      selectedClass: val ? val : {},
    });
  };

  render() {
    // const [key, setKey] = useState('home');
    const { postwork, postWorkStudent, filteredPostWorkStudent } = this.state;
    const Back = () => {
      const history = useHistory();
      return (
        <Link
          className="text-dark-blue d-flex text-default mb-3 d-block"
          onClick={() => history.goBack()}
        >
          <img src={arw_left} className="pr-2" alt="" />
          back
        </Link>
      );
    };
    return (
      <React.Fragment>
        <div className="px-4 py-5 main-section top-zero">
          <Row className="card px-3 py-4 mx-0 mb-5">
            <Col>
              <Back />
            </Col>
            <Col className="d-flex justify-content-between mb-4 align-items-end border-bottom pb-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-sm-12 mb-4">
                      <div className="d-flex align-items-center mr-3 ">
                        <label className="pr-3 fw-600 ws-nowrap min-w-150">
                          Class Name
                    </label>
                        <ReactSelect
                          id={"posttype"}
                          className="lit-react-select grey w-100"
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
                  </div>
                  <h5 className="h6 text-dark">Assignment: {postwork.title}</h5>
                </div>
                {postwork.startDate && postwork.dueDate &&
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-sm-12 mb-4">
                        <div className="d-inline-flex align-items-center mr-3 ">
                          <label className="pr-3 fw-600 ws-nowrap min-w-150">
                            Starting Date
                        </label>
                          {
                            this.state.isDisabled ?
                              <span>
                                {moment(postwork.startDate).format("DD-MMM-YYYY")}
                              </span>
                              :
                              <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="date-input min-width w-100 input-bg"
                                value={moment(this.state.postwork.startDate).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                  this.onStartDate(e);
                                }}
                              />
                          }

                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="d-inline-flex align-items-center ">
                          <label className="pr-3 fw-600 ws-nowrap min-w-150">
                            Due Date
                        </label>
                          {
                            this.state.isDisabled ?
                              <span>
                                {moment(postwork.dueDate).format("DD-MMM-YYYY")}
                              </span>
                              :
                              <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                className="date-input min-width w-100 input-bg"
                                value={moment(this.state.postwork.dueDate).format("YYYY-MM-DD")}
                                onChange={(e) => {
                                  this.onDueDate(e);
                                }}
                              />
                          }
                        </div>
                      </div>
                      <div className="col-sm-12 mt-4">
                        <div className="d-inline-flex align-items-center ">
                          <label className="pr-3 fw-600 ws-nowrap min-w-150">
                            Subtitle
                        </label>
                          {
                            this.state.isDisabled ? <span>
                              {this.state.postwork.videoCaption ? 'Yes' : 'No'}
                            </span> :
                              <Form.Check
                                inline
                                name="subtitle"
                                type={"checkbox"}
                                className="custom-checkbox"
                                checked={this.state.postwork.videoCaption}
                                onChange={(e) => {
                                  this.onSubTitleChange(e);
                                }}
                              />
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                }
                {/* <div className="d-flex">
                  <div>
                    <label className="pr-2 text-grey">Starting Date:</label>
                    <span>
                      {moment(postwork.startDate).format("DD-MMM-YYYY")}
                    </span>
                  </div>
                  <div className="pl-3">
                    <label className="pr-2 text-grey">Due Date:</label>
                    <span>{moment(postwork.dueDate).format("DD-MMM-YYYY")}</span>
                  </div>
                </div> */}
              </div>
            </Col>
            <Col>
              <Row>
                <Accordion defaultActiveKey="" className="w-100 px-2" style={{ cursor: 'pointer' }}>
                  <Card className="mb-3 p-3 rounded bg-white" style={{ border: '1px solid #e7eaec' }}>
                    <CustomToggle eventKey="0">
                      <div className="pointer d-flex">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="font-sm text-grey fw-500">
                            Assignment Details
                          </span>
                        </div>
                        <div className="ml-auto">
                          <img
                            src={edit_grey}
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
                        <Col>
                          <Row>
                            <Col md={5} lg={5} className="col-xxl-5">
                              <div className="assign-vid-img">
                                {/* <img src={postwork.video?.thumbnail} alt="" />
                    <span className="vid-time">
                      <img src={video_white} className="pr-2" alt="" />
                      {durationTime(postwork.video?.duration)}
                    </span> */}
                                {this.state.videoUrl && this.state.videoUrl != '' &&
                                  <video height="500" controls controlsList="nodownload">
                                    <source src={this.state.videoUrl} />
  Your browser does not support the video tag.
</video>}



                                {/* <VideoPlayer
                                  url={postwork.video?.url || ""}
                                  onSeekOrPause={(progress) =>
                                    this.setState({ t: Math.floor(progress) })
                                  }
                                  videoHeight="500px"
                                /> */}
                              </div>
                            </Col>
                            <Col md={7} lg={7} className="col-xxl-4">
                              <div className="assign-list">
                                <ul className="list-unstyled d-flex flex-wrap">
                                  {Object.values(EXERCISES_IDS)?.map((item) => {
                                    return this.state.isDisabled ? (
                                      <li style={{ color: "#000" }}>
                                        <Form.Check
                                          type="checkbox"
                                          className="custom-checkbox pencil-checkbox"
                                          checked={
                                            this.state.exercises?.filter(
                                              (i) => i.id == item
                                            )[0]
                                          }
                                          disabled={true}
                                        />
                                        {EXERCICES_TITLES_OBJECT[item]}
                                        {[6, 8, 9, 0]?.filter((val) => val == item)
                                          .length === 0 &&
                                          this.state.exercises?.filter(
                                            (val) => val.id === item
                                          )?.length > 0 && (
                                            <img
                                              src={edit_grey}
                                              className="ml-1"
                                              height="7px"
                                              alt=""
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                this.setExerciseDialog(item);
                                              }}
                                            />
                                          )}
                                      </li>
                                    ) : (
                                      <li>
                                        <Form.Check
                                          type="checkbox"
                                          className="custom-checkbox pencil-checkbox"
                                          label={EXERCICES_TITLES_OBJECT[item]}
                                          checked={
                                            this.state.exercises?.filter(
                                              (i) => i.id == item
                                            )[0]
                                          }
                                          onChange={(e) => {
                                            this.handleCheck(e, item);
                                          }}
                                        />
                                        {this.state.exercises?.filter(
                                          (i) => i.id == item
                                        )[0] &&
                                          [6, 8, 9, 0].filter((val) => val == item)
                                            .length === 0 && (
                                            <img
                                              src={edit_pencil}
                                              className="ml-1"
                                              height="12px"
                                              alt=""
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                this.setExerciseDialog(item);
                                              }}
                                            />
                                          )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </Col>
                            <Col md={12} lg={12} className="col-xxl-3">
                              <div className="d-flex flex-row flex-xxl-column justify-content-end align-items-start">
                                <Button
                                  variant="primary"
                                  className="primary-btn-outline mb-3 mr-3 mr-xxl-0"
                                  onClick={() => {
                                    this.setState({ GrammarBank: true });
                                  }}
                                >
                                  Grammar Bank
                    </Button>
                                <Button
                                  variant="primary"
                                  className="primary-btn-outline mb-3"
                                  onClick={() => {
                                    this.setState({ Vocabulary: true });
                                  }}
                                >
                                  Vocabulary Bank
                    </Button>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Row>
            </Col>
            <Col className="mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="medium-heading">All Students</h2>
              </div>
              <Table
                className="theme-table mt-3 mb-1"
                style={
                  !this.state.isDisabled
                    ? { opacity: ".4", pointerEvents: "none" }
                    : { opacity: "1" }
                }
              >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Student Name</th>
                    <th>Assignment Progress</th>
                    <th>Performance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPostWorkStudent &&
                    filteredPostWorkStudent.map((student, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td className="class-name">
                            {student?.studentName?.firstName + " " + student?.studentName?.lastName}
                          </td>
                          <td>
                            <ProgressBar
                              variant="success"
                              className="green-progress progress-lg"
                              label={`${Number.isInteger(student.completedActivitiesPercentage) ? student.completedActivitiesPercentage : student.completedActivitiesPercentage.toFixed()}%`}
                              now={Number.isInteger(student.completedActivitiesPercentage) ? student.completedActivitiesPercentage : student.completedActivitiesPercentage.toFixed()}
                            />
                          </td>
                          <td>
                            <span className="perform-badge">{student.totalScore ? student.totalScore + "%" : "-NA-"}</span></td>
                          <td>
                            {student.submissionsCount > 0 ? (
                              <span className="text-blue">completed</span>
                            ) : (
                              <span className="text-org">Pending</span>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="primary"
                              className={
                                "orange-btn d-inline-flex primary-btn sm"
                              }
                              onClick={() => {
                                this.props.history &&
                                  this.props.history.push(
                                    `/teacher/progress/${this.state.postwork_id}/students/${student.studentId}`
                                  );
                              }}
                              disabled={student.submissionsCount == 0}
                            >
                              Review
                              </Button>
                          </td>
                        </tr>
                      );

                    })}
                </tbody>
              </Table>
            </Col>
            {
              !this.state.isDisabled &&
              <Col className="mt-4">
                <Button
                  variant="primary"
                  className="primary-btn"
                  onClick={() => this.handleUpdatePostwork()}
                  style={{ float: 'right' }}
                >
                  Update Assignment
                </Button>
              </Col>
            }
          </Row>
        </div>
        {/* <TrueFalse
          show={this.state.id === 4}
          handleClose={this.handleClose}
          data={exercises}
        /> */}
        <GrammarBank
          show={this.state.GrammarBank}
          handleClose={() => {
            this.setState({ GrammarBank: false });
          }}
          grammar={postwork.video?.grammar}
          title={postwork.video?.grammarTitle}
        />
        <Vocabulary
          vocabulary={postwork.video?.vocabulary}
          show={this.state.Vocabulary}
          handleClose={() => {
            this.setState({ Vocabulary: false });
          }}
        />
        <Exercises
          show={this.state.show}
          handleClose={() => {
            this.setState({ show: false });
          }}
          list={this.state.exerciseData}
          setData={this.handleExercisesData}
          isDisabled={this.state.isDisabled}
          data={
            this.state.GlobalExercise?.filter(
              // eslint-disable-next-line eqeqeq
              (item) => item.id == this.state.exerciseData?.id
            )[0]
          }
        />
      </React.Fragment>
    );
  }
}

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <div className="medium-heading px-2" onClick={decoratedOnClick}>
      {children}
    </div>
  );
};

export default Index;
