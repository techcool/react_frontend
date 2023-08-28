import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Table,
  ProgressBar,
  Tabs,
  Tab,
  Card,
  Accordion,
  useAccordionToggle
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { DashFooter } from "common/src/components/shared/dashFooter";
import { fetchVideoDetails } from "common/src/old-api/videosActions";
import PieChart from "common/src/components/charts/pieChart";
// import VideoPlayer from "common/src/components/videoPlayer/videoPlayer";
// import chart_img2 from "common/src/images/chart-img2.svg";
import edit_grey from "common/src/images/arw_down2.svg";
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

export default function VideoStats() {
  const { accessToken, role } = useSelector((state) => state.user);
  const [key, setKey] = React.useState("all");
  const [count, setCount] = React.useState(0);
  const [t, setT] = useState(0);
  const history = useHistory();
  const { id } = useParams();
  const [video, setVideo] = React.useState({});
  const [vidData, setVidData] = React.useState("");
  React.useEffect(() => {
    (async () => {
      fetchDetails();
      const res = await fetchVideoDetails({
        accessToken,
        role,
        video_id: id,
      });
      if (res) {
        setVidData(res);
      }
    })();
  }, []);

  const fetchDetails = async (params) => {
    const res = await fetchVideoDetails({
      accessToken,
      role,
      video_id: id,
      isStats: true,
      params,
    });
    if (res) {
      let count = 0;
      res.students &&
        res.students.forEach((item) => {
          if (item.submissionsCount) {
            count += 1;
          }
        });
      setCount(count);
      setVideo(res);
    }
  };
  const onTabChange = (key) => {
    setKey(key);
    return (
      {
        all: fetchDetails(),
        current: fetchDetails({ current: true }),
      }[key] || null
    );
  };
  const PerformanceCount = (student) => {
    let score = 0;
    if (student?.length) {
      student.forEach((item) => {
        score += item.score;
      });
      return score / student.length;
    }
    return 0;
  };
  const TableData = ({ data }) => {
    if (!data) return <></>;
    return (
      <Table hover className="theme-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Student Name</th>
            <th>Class Name</th>
            <th>Assignment Name</th>
            <th>Stats</th>
            <th>Progress</th>
            <th>Performance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, key) => {
            return (
              <tr>
                <td>{key + 1}</td>
                <td className="class-name">
                  {item.firstName + " " + item.lastName}
                </td>
                <td className="class-name">{item.class_name}</td>
                <td className="class-name">{item.postwork_name}</td>
                <td>
                  {item.submissionsCount > 0 ? (
                    <span className="text-green">Completed</span>
                  ) : item.isLate ? (
                    <span className="text-org">Pending</span>
                  ) : !item.isLate && item.submissionsCount < 1 ? (
                    <span className="text-blue">To Do</span>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  <ProgressBar
                    variant="success"
                    className="green-progress progress-lg"
                    label={`${item.score}%`}
                    now={item.score}
                  />
                </td>
                <td>{item.score ? item.score + "%" : "Not Graded"}</td>
                <td>
                  <Button
                    variant="primary"
                    disabled={!item.score}
                    className="primary-btn sm orange-btn"
                    onClick={() => {
                      history.push(
                        `/teacher/progress/${item.postwork_id}/students/${item._id}`
                      );
                    }}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <div className="card py-4 px-4 h-100">
          <Row>
            <Col className="mb-4 col-12">
              <h2 className="medium-heading text-black mb-4">Video Stats</h2>
              <Accordion defaultActiveKey="" className="w-100 px-2" style={{ cursor: 'pointer' }}>
                <Card className="mb-3 p-3 rounded bg-white" style={{ border: '1px solid #e7eaec' }}>
                  <CustomToggle eventKey="0">
                    <div className="pointer d-flex">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="font-sm text-grey fw-500">
                          {vidData.title ? vidData.title : "Video Details"}
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
                      <div className="card-img mb-3 col-md-8 px-0 br-12 overflow-hidden">
                        {/* <img src={video_img} className="w-100" alt="" /> */}
                        {vidData.url && <video
                          height="500"
                          controls
                          controlsList="nodownload"
                        >
                          <source src={vidData.url} />
                          Your browser does not support the video tag.
                        </video>}

                        {/* <VideoPlayer
                          url={vidData.url || ""}
                          onSeekOrPause={(progress) => setT(Math.floor(progress))}
                          videoHeight="500px"
                        /> */}
                      </div>
                      <div className="mb-3">
                        <span className="pr-3 fw-600 text-dark">Assigned to:</span>
                        <span className="d-inline-flex">{video.totalStudents}</span>
                      </div>
                      <div className="mb-3">
                        <span className="pr-3 fw-600 text-dark">Submitted:</span>
                        <span>{count}</span>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col sm={12} className="mb-4 col-12">
              <div className="row mb-4">
                <div className="col-sm-12 col-md-3"></div>
                <div className="col-sm-12 col-md-3">
                  <PieChart
                    score={PerformanceCount(video.students)}
                    pieTitle=""
                  />
                </div>
                <div className="col-sm-12 col-md-3">
                  <PieChart
                    score={PerformanceCount(video.students)}
                    pieTitle=""
                  />
                </div>
                <div className="col-sm-12 col-md-3"></div>
              </div>
              <div className="row text-center">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  className="stats-tabs mb-3 mt-4 w-100"
                  onSelect={(k) => onTabChange(k)}
                  style={{ margin: "0 auto" }}
                >
                  <Tab eventKey="all" title="All">
                    <div className="w-100">
                      <TableData data={video.students} />
                    </div>
                  </Tab>
                  <Tab eventKey="current" title="Current">
                    <div className="w-100">
                      <TableData data={video.students} />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <DashFooter />
    </React.Fragment>
  );
}
