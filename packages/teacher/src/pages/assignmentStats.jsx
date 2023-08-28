import React from "react";
import {
  Table,
  ProgressBar,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PieChart from "common/src/components/charts/pieChart";
import { DashFooter } from "common/src/components/shared/dashFooter";
import moment from "moment";
import {
  fetchPostwork,
  fetchAssigneeProgress,
} from "common/src/old-api/postworksActions";
const AssignmentStats = () => {
  const { id } = useParams();
  const { accessToken, role } = useSelector((state) => state.user);
  const [key, setKey] = React.useState("0");
  const [postwork, setPostwork] = React.useState({});
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    if (id) {
      (async () => {
        const res = await fetchPostwork({
          postwork_id: id,
        });
        if (res) {
          setPostwork(res);
          getStudentList();
        }
      })();
    }
  }, [id]);

  const getStudentList = async (params) => {
    const response = await fetchAssigneeProgress({
      postwork_id: id,
      params,
    });
    if (response) {
      setStudents(response);
    }
  };
  const switchTab = (k) => {
    const params =
      {
        1: { done: true },
        2: { pending: true },
        3: { toDo: true },
      }[k] || null;
    getStudentList(params);
    setKey(k);
  };
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
          <Col>
            <div className="d-flex align-items-center mb-4">
              <h2 className="card-heading">Assignment Stats</h2>
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
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
          {
            students && <div className="row mb-4">
              <div className="col-sm-12 col-md-3"></div>
              <div className="col-sm-12 col-md-3">
                <PieChart
                  score={Number.isInteger(students.overallProgress) ? students?.overallProgress : students?.overallProgress?.toFixed(2)}
                  pieTitle="Overall Progress"
                  isDefault={true}
                  pie={true}
                />
              </div>
              <div className="col-sm-12 col-md-3">
                <PieChart
                  score={Number.isInteger(students.overallScore) ? students?.overallScore : students?.overallScore?.toFixed(2)}
                  pieTitle="Overall Performance"
                  isDefault={true}
                />
              </div>
              <div className="col-sm-12 col-md-3"></div>
            </div>
          }

          <StudentTable students={students.students} />
          {/* <Tabs
            id="controlled-tab-example"
            activeKey={key}
            className="stats-tabs"
            onSelect={(k) => switchTab(k)}
          >
            <Tab eventKey="0" title="All">
              <StudentTable students={students.students} />
            </Tab>
            <Tab eventKey="1" title="Done">
              <StudentTable students={students.students} />
            </Tab>
            <Tab eventKey="2" title="Pending">
              <StudentTable students={students.students} />
            </Tab>
            <Tab eventKey="3" title="To do">
              <StudentTable students={students.students} />
            </Tab>
          </Tabs> */}
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
};
export default AssignmentStats;

const StudentTable = (students) => {
  const history = useHistory();
  const { id } = useParams();
  if (students?.length === 0) return <></>;
  return (
    <Table className="theme-table mt-3 mb-1">
      <thead>
        <tr>
          <th>No.</th>
          <th>Student Name</th>
          <th>Class Name</th>
          <th>Status</th>
          <th>Progress</th>
          <th>Performance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students?.students?.map((item, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td className="class-name">{`${item?.studentName?.firstName} ${item?.studentName?.lastName}`}</td>
              <td className="class-name">{item.class_name}</td>
              <td>
                {item.submissionsCount > 0 ? (
                  <span className="text-blue">completed</span>
                ) : (
                  <span className="text-org">Pending</span>
                )}
                {/* {item.submissionsCount > 0 ? (
                  <span className="text-green">Completed</span>
                ) : item.isLate ? (
                  <span className="text-org">Pending</span>
                ) : !item.isLate && item.submissionsCount < 1 ? (
                  <span className="text-blue">To Do</span>
                ) : (
                  <></>
                )} */}
              </td>
              <td>
                <ProgressBar
                  variant="success"
                  className="green-progress progress-lg"
                  label={`${Number.isInteger(item.completedActivitiesPercentage) ? item.completedActivitiesPercentage : item.completedActivitiesPercentage.toFixed(2)}%`}
                  now={Number.isInteger(item.completedActivitiesPercentage) ? item.completedActivitiesPercentage : item.completedActivitiesPercentage.toFixed(2)}
                />
              </td>
              <td>{item.totalScore ? item.totalScore + "%" : "Not Graded"}</td>
              <td>
                <Button
                  variant="primary"
                  disabled={!item.submissionsCount}
                  className="primary-btn sm orange-btn"
                  onClick={() => {
                    history.push(
                      `/teacher/progress/${id}/students/${item.studentId}`
                    );
                  }}
                >
                  Grade
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
