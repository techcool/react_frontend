/* eslint-disable eqeqeq */
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { ProgressBar, Button, Row, Col, useAccordionToggle, Accordion, Card } from "react-bootstrap";
import edit_grey from "common/src/images/arw_down2.svg";
// import PieChart from "common/src/components/charts/pieChart";
import { DashFooter } from "common/src/components/shared/dashFooter";
import VideoPlayer from "common/src/components/videoPlayer/videoPlayer";
import { fetchPostwork } from "common/src/old-api/postworksActions";
import { fetchProgress } from "common/src/old-api/progressActions";
import { fetchVideoDetails } from "common/src/old-api/videosActions";


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

const AssignmentDetails = (props) => {
  const { postwork_id } = useParams();
  const {
    accessToken,
    role,
    id: student_id,
  } = useSelector((state) => state.user);
  const history = useHistory();
  const [t, setT] = React.useState(0);
  const [classid, setClassId] = React.useState();
  const [postwork, setPostwork] = React.useState({});
  const [video, setVideo] = React.useState({});
  const [attempts, setAttempts] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  // const [studentAnswer, setStudentAnswer] = React.useState({});

  React.useEffect(() => {
    if (postwork_id) {
      (async () => {

        const res = await fetchPostwork({
          accessToken,
          role,
          postwork_id: postwork_id,
        });

        if (res) {
          setPostwork(res);
          props.setPostwork && props.setPostwork(res);
          if (props.show) {
            const status =
              res.attemptsTaken > 0
                ? 0
                : res.attemptsTaken === 0 &&
                  new Date(res.dueDate) > Date.now() &&
                  new Date(res.startDate) > Date.now()
                  ? 1
                  : res.attemptsTaken === 0 &&
                    new Date(res.dueDate) < Date.now() &&
                    new Date(res.startDate) < Date.now()
                    ? 2
                    : null;
            props.setStatus(status);
          }

          getStudentAttempts(res.studentAttempts);

          if (!props.show) {
            const videodetails = await fetchVideoDetails({
              accessToken,
              role,
              video_id: res.video_id,
            });
            if (videodetails) {
              setVideo(videodetails);
            }



            const progressDetails = await fetchProgress({
              accessToken,
              role,
              activityType: "assignment",
              activityID: postwork_id,
            });


            if (progressDetails && progressDetails.completedActivitiesPercentage) {
              setProgress(Number.isInteger(progressDetails.completedActivitiesPercentage) ? progressDetails.completedActivitiesPercentage : progressDetails.completedActivitiesPercentage.toFixed(2));
            }
          }
        }
      })();
    }
  }, [postwork_id]);

  const getStudentAttempts = (data) => {
    if (data) {

      let found = false;

      data.forEach((item) => {

        item.students.forEach((val) => {
          if (val._id === student_id) {
            found = true;
            setAttempts(val.attempts);
            if (classid !== item._id) {
              setClassId(item._id);
              props.setClassIdValue && props.setClassIdValue(item._id);
            }
          }
        });

        if (!found && item.allStudents) {
          setAttempts(item.attempts);
          setClassId(item._id);
          props.setClassIdValue && props.setClassIdValue(item._id);
          props.setPendingAttempts && props.setPendingAttempts(item.attempts);
        }
      });
      // data.forEach((item) => {
      //   if (item.allStudents && item.students.length == 0) {
      //     setAttempts(item.attempts);
      //     setClassId(item._id);
      //     props.setClassIdValue && props.setClassIdValue(item._id);
      //     props.setPendingAttempts && props.setPendingAttempts(item.attempts);
      //   } else {
      //     item.students.forEach((val) => {
      //       if (val._id === student_id) {
      //         setAttempts(val.attempts);
      //         if (classid !== item._id) {
      //           setClassId(item._id);
      //           props.setClassIdValue && props.setClassIdValue(item._id);
      //         }
      //       }
      //     });
      //   }
      // });
    }
  };
  if (role == "teacher") {
    return <>{props.children}</>;
  }
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
          <Col className={"mb-4"}>
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
                    <div className="d-flex row align-items-center mb-4 space-between">
                      {/* <div className="col-sm-12 col-md-6">
                        {" "}
                        <h2 className="card-heading">Assignment Details</h2>{" "}
                      </div> */}
                      {!props.show && (
                        <div className="col-sm-12 row col-md-6 d-flex align-items-center">
                          {" "}
                          <div className="col-sm-12 col-md-6 text-right">
                            {" "}
                            <h3 className="card-heading">Progress</h3>
                          </div>
                          <div className="col-sm-12 col-md-6">
                            {" "}
                            <ProgressBar
                              variant="success"
                              className="green-progress progress-lg"
                              label={`${progress}%`}
                              now={progress || 0}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="d-flex col-md-6 col-lg-6 col-xl-6">
                      <ul className="list-unstyled table-list w-100">
                        <li>
                          <h6>Assignment Name:</h6>
                          <span
                            className="class-name"
                            style={{ TextTransform: "capitalize" }}
                          >
                            {postwork.title}
                          </span>
                        </li>
                        <li>
                          <h6>Starting Date:</h6>
                          <span>
                            {postwork.startDate
                              ? moment(postwork.startDate).format("DD-MMM-YYYY")
                              : "----------"}
                          </span>
                        </li>
                        <li>
                          <h6>Due Date:</h6>
                          <span>
                            {postwork.dueDate
                              ? moment(postwork.dueDate).format("DD-MMM-YYYY")
                              : "----------"}
                          </span>
                        </li>
                        <li>
                          <h6>No of Attempts:</h6>
                          <span
                            className="class-name"
                            style={{ TextTransform: "capitalize" }}
                          >
                            {attempts}
                          </span>
                        </li>
                        <li>
                          <h6>Attempts taken:</h6>
                          <span
                            className="class-name"
                            style={{ TextTransform: "capitalize" }}
                          >
                            {postwork.attemptsTaken}
                          </span>
                        </li>

                        <li>
                          <h6>Status:</h6>
                          <h3 className="d-inline-flex fw-500">
                            {" "}
                            {postwork.attemptsTaken > 0 ? (
                              <span className="text-green"> &#9679; Completed</span>
                            ) : postwork.attemptsTaken === 0 &&
                              new Date(postwork.dueDate) >=
                              new Date(new Date().setHours(0, 0, 0, 0)) &&
                              new Date(postwork.startDate) >=
                              new Date(new Date().setHours(0, 0, 0, 0)) ?
                              (
                                <span className="text-green"> &#9679; Current</span>
                              ) :
                              postwork.attemptsTaken === 0 &&
                                new Date(postwork.dueDate) >
                                new Date(new Date().setHours(0, 0, 0, 0)) &&
                                new Date(postwork.startDate) >
                                new Date(new Date().setHours(0, 0, 0, 0)) ?
                                (
                                  <span className="text-org"> &#9679; Upcoming</span>
                                ) :
                                postwork.attemptsTaken === 0 &&
                                  new Date(postwork.dueDate) < Date.now() &&
                                  new Date(postwork.startDate) < Date.now() ? (
                                  <span className="text-red"> &#9679; Past Due</span>
                                ) : (
                                  <></>
                                )}
                          </h3>
                        </li>
                        {!props.show && (
                          <li>
                            <VideoPlayer
                              url={video?.url || ""}
                              captionUrl={postwork.videoCaption ? video.captionUrl : ''}
                              onSeekOrPause={(progress) => setT(Math.floor(progress))}
                              videoHeight="300px"
                            />
                          </li>
                        )}
                        {!props.show && (
                          <li>

                            {
                              (
                                classid &&
                                attempts > postwork.attemptsTaken
                                &&
                                (
                                  (
                                    moment(postwork.startDate).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD")
                                    &&
                                    moment(new Date()).format("YYYY-MM-DD") <= moment(postwork.dueDate).format("YYYY-MM-DD")
                                  )
                                  ||
                                  moment(postwork.dueDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD")
                                )
                              )

                                ? (
                                  <Button
                                    className="btn btn-primary"
                                    variant="primary"
                                    onClick={() =>
                                      history.push(
                                        `/student/postworks/${postwork_id}/${classid}`
                                      )
                                    }
                                  >
                                    Start
                                  </Button>
                                ) : (
                                  postwork.attemptsTaken > 0 && (
                                    <Button
                                      className="btn btn-primary"
                                      variant="primary"
                                      onClick={() => {
                                        postwork.attemptsTaken &&
                                          history.push(
                                            `/student/assignment/${postwork_id}/result`
                                          );
                                      }}
                                    >
                                      View Result
                                    </Button>
                                  )
                                )}
                          </li>
                        )}
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col sm={12} className="mt-4 mb-5">
            {props.children}
          </Col>
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
};
export default AssignmentDetails;
