import React, { useState } from "react";
import moment from "moment";
import BarChart from "common/src/components/charts/barChart";
import { DashFooter } from "common/src/components/shared/dashFooter";
import assignments_blue from "common/src/images/assignments_blue.svg";
import practise_org from "common/src/images/practise_org.svg";
import {
  fetchClasses,
  fetchStudentAssignments,
  fetchStudentPractices,
  studentDetails,
  studentList
} from "common/src/old-api/classesActions";
import {
  fetchStudentPerformanceOnAssignment,
  fetchStudentPerformanceOnClassReport,
  fetchStudentPerformanceOnPracticeReport
} from "common/src/old-api/reportsAction";
import {
  Button,
  Col,
  Pagination,
  ProgressBar,
  Row,
  Tab,
  Table,
  Tabs
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import exportExcel from "common/src/components/helpers/exportExcel";

export default function StudentStats(props) {

  const history = useHistory();
  const [key, setKey] = useState("assignment");
  const [classes, setClasses] = useState([]);
  const [checked, setChecked] = useState(true);
  const [showChartFor, setShowChartFor] = useState("assignment");
  const [s_id, setS_ID] = useState("");
  const [classId, setClassId] = useState("");
  const [startDate, setStartDate] = React.useState(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [studentlist, setStudentList] = useState([]);
  const [student, setStudent] = useState({});
  const [practice, setPractice] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [chartDataRight, setChartDataRight] = useState({});
  const [practicePerformance, setPracticePerformance] = useState({});
  const [practicesChartData, setPracticesChartData] = useState({});
  const [progressChartData, setProgressChartData] = useState({});

  const [practiceReportData, setPracticeReportData] = useState([]);
  const [assignmentReportData, setAssignmentReportData] = useState([]);

  const { accessToken, role } = useSelector((state) => state.user);
  const bgColor = {
    0: {
      label: "Novice",
      color: "rgb(255, 99, 132)"
    },
    1: {
      label: "InterMediate",
      color: "rgb(54, 162, 235)"
    },
    2: {
      label: "Biographies",
      color: "rgb(75, 192, 192)"
    },
    3: {
      label: "Cultural Spotlights",
      color: "rgb(52, 118, 260)"
    }
  };
  const options = {
    legend: {
      labels: {
        boxWidth: 10,
        usePointStyle: true
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    maintainAspectRatio: false
  };
  React.useEffect(() => {
    (async () => {
      const res = await fetchClasses({});
      if (res) {
        setClasses(res);
        if (props?.location?.state) {
          const { class_id } = props?.location?.state;
          if (class_id) {
            setClassId(class_id);
            handleClassSelect(class_id);
          }
        }
        // handleClassSelect(res[0]?._id);
      }
    })();
  }, []);
  React.useEffect(() => {
    if (s_id) {
      handleFetchPostWork(1);
    }
  }, [s_id]);



  const handleClassSelect = async (val) => {
    setStudentList([]);
    if (!val) {
      setClassId("");
      return;
    }
    setStudent({});
    setS_ID();
    setClassId(val);
    const res = await studentList({
      params: { class_id: val }
    });
    if (res) {
      res.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setStudentList(res);
      if (props?.location?.state) {
        const { class_id, student_id } = props?.location?.state;
        if (class_id === val) {
          await getStudentDetails(student_id);
        }
      }
    }
  };

  const Capital = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  const getStudentDetails = async (id) => {
    if (!id) {
      setStudent({});
      return;
    }
    const res = await studentDetails({ accessToken, role, id });
    setS_ID(id);
    if (res) {
      setStudent(res.student);

      fetchLeftSideChartData(id, startDate);
      fetchRightSideChartData(id, startDate);

      const practices = await fetchStudentPractices({
        accessToken,
        role,
        params: { student_id: id }
      });
      if (practices) {
        setPractice(practices);
      }


    }
  };

  const fetchRightSideChartData = async (id, date) => {
    let c_id = classId;
    if (props?.location?.state) {
      const { class_id } = props?.location?.state;
      c_id = class_id;
    }
    const assignmentReport = await fetchStudentPerformanceOnAssignment({
      class_id: c_id,
      student_id: id,
      params: { startDate: date }
    });
    generateAssignmentChartData(assignmentReport);
  };

  const fetchLeftSideChartData = async (id, date) => {
    let c_id = classId;
    if (props?.location?.state) {
      const { class_id, student_id } = props?.location?.state;
      c_id = class_id;
    }

    const practiceReport = await fetchStudentPerformanceOnPracticeReport({
      student_id: id
    });

    setPracticeReportData(practiceReport.completedVideosCounter);

    const assignmentReport = await fetchStudentPerformanceOnClassReport({ class_id: c_id, student_id: id });

    setAssignmentReportData(assignmentReport.completedVideosCounter);

  };

  const generateAssignmentChartData = (res_value) => {
    const { completedPostworks, gradedPostworks, totalPostworks } = res_value;
    const label = [];
    const completedPostworksData = [];
    const gradedPostworksData = [];
    const totalPostworksData = [];

    if (Array.isArray(completedPostworks)) {
      completedPostworks.forEach((item) => {
        label.push(item.x);
        completedPostworksData.push(item.y);
      });
    }
    if (Array.isArray(totalPostworks)) {
      totalPostworks.forEach((item) => {
        const value = label.filter((val) => val == item.x);
        if (value.length > 0) {
          const index = label.indexOf(item.x);
          totalPostworksData[index] = item.y;
        } else {
          label.push(item.x);
          const index = label.indexOf(item.x);
          totalPostworksData[index] = item.y;
        }
      });
    }
    if (Array.isArray(gradedPostworks)) {
      gradedPostworks.forEach((item) => {
        const value = label.filter((val) => val == item.x);
        if (value.length > 0) {
          const index = label.indexOf(item.x);
          gradedPostworksData[index] = item.y;
        } else {
          label.push(item.x);
          const index = label.indexOf(item.x);
          gradedPostworksData[index] = item.y;
        }
      });
    }
    const data = {
      labels: label,
      datasets: [
        {
          label: "Completed PostWorks",
          data: completedPostworksData,
          backgroundColor: "rgb(255, 99, 132)",
          borderRadius: 4
        },
        {
          label: "Graded PostWorks",
          data: gradedPostworksData,
          backgroundColor: "rgb(54, 162, 235)",
          borderRadius: 4
        },
        {
          label: "Total PostWork",
          data: totalPostworksData,
          backgroundColor: "rgb(75, 192, 192)",
          borderRadius: 4
        }
      ]
    };
    setChartDataRight(data);
  };

  const handleFetchPostWork = async (page) => {
    const postworks = await fetchStudentAssignments({
      params: {
        student_id: s_id,
        class_id: classId,
        limit: 5,
        page: page
      }
    });
    if (postworks) {
      setAssignments(postworks);
    }
  };
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    fetchLeftSideChartData(s_id, e.target.value);
    fetchRightSideChartData(s_id, e.target.value);
  };

  const exportDataHandle = () => {
    let sourceDataForexport = [];

    if (key == 'assignment') {
      sourceDataForexport = assignments?.postworks.map((item) => {
        return {
          'Assignment Name': item.title ? item.title : '-',
          'Start Date': item.startDate ? moment(item.startDate).format(
            "DD-MMM-YYYY"
          ) : '-',
          'End Date': item.dueDate ? moment(item.dueDate).format(
            "DD-MMM-YYYY"
          ) : '-',
          'Progress': Number.isInteger(item.completedActivitiesPercentage) ? item.completedActivitiesPercentage + '%' : item.completedActivitiesPercentage.toFixed(2) + '%',
          'Performance': item.totalScore + '%',
        }
      })
    } else if (key == 'practice') {
      sourceDataForexport = practice.map((item) => {
        return {
          'Practice Name': item['video'] && item['video'].title ? item['video'].title : '-',
          'Submission Date': item.lastSubmissionDate &&
            moment(item.lastSubmissionDate).format("DD-MM-YYYY"),
          'Status': item.submitted ? 'Completed' : 'Pending',
          'Performance': Number.isInteger(item.completedActivitiesPercentage) ? item.completedActivitiesPercentage : item.completedActivitiesPercentage.toFixed(2) + '%',
          'Performance': item.totalScore + '%',
        }
      });

      console.log('practice', practice);
    }

    if (sourceDataForexport) {
      exportExcel({ csvData: sourceDataForexport });
    } else {
      return false;
    }

    console.log('sourceDataForexport', sourceDataForexport);
    // 
  }

  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card px-3 py-4 mx-0 mb-5">
          <Col className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="card-heading">Check Progress </h2>
            </div>
          </Col>
          <Col className="row align-items-center mb-4">
            <div className="col-md-3">
              <label className="font-sm fw-600">Select Class</label>
              <select
                className="form-control py-3 h-auto input-bg border-0"
                onChange={(e) => {
                  handleClassSelect(e.target.value);
                }}
                value={classId}
              >
                {classes.map((item, index) => {
                  return (
                    <option key={index} value={item._id} className="class-name">
                      { item.name}
                    </option>
                  );
                })}
                <option value="" className="class-name">
                  Select Class
                </option>
              </select>
            </div>
            {studentlist.length > 0 && (
              <>
                <div className="col-md-3 ">
                  <label className="font-sm fw-600">Select Student</label>
                  <select
                    className="form-control py-3 h-auto input-bg border-0"
                    onChange={(e) => {
                      getStudentDetails(e.target.value);
                    }}
                    value={s_id}
                  >
                    <option value="" className="class-name">
                      Select Student
                    </option>
                    {studentlist.map((students, index) => {
                      return (
                        <option key={index} value={students._id} className="class-name">
                          { students.firstName + " " + students.lastName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}
            {s_id && (
              <div className="col-md-3">
                { " "}
                <label className="font-sm fw-600">Select Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="date-input form-control py-3 h-auto input-bg border-0"
                  value={startDate}
                  format="dd-MM-yyyy"
                  onChange={handleStartDate}
                ></input>
              </div>
            )}

            <div className="d-flex"></div>
          </Col>

          {
            classId
            && student
            && student?.firstName && (<>
              <Col>
                <Row className="mb-5">
                  <Col xs={12} md="4">
                    <div className="dash-card progress-card justify-content-start">
                      <div className="d-flex flex-column align-items-start pl-3">
                        <h4 className="medium-heading">{`${student.firstName || "----"
                          } ${student.lastName || "----"}`}</h4>
                        <label className="text-grey font-xs">
                          {student.username ? "@" + student.username : "No Username"}
                        </label>
                        <label className="badge badge-inverse text-white">
                          {student.isPremiumStudent ? "Premium" : "Free"}
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md="4">
                    <div className="dash-card progress-card justify-content-start">
                      <div className="check-round bg-light-org">
                        <img src={practise_org} height="30" alt="" />
                      </div>
                      <div className="d-flex flex-column align-items-start pl-3">
                        <h4 className="medium-heading">Practice</h4>
                        <h3 className="h3 text-dark fw-700 my-0">
                          {practice.length}
                        </h3>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md="4">
                    <div className="dash-card progress-card justify-content-start">
                      <div className="check-round">
                        <img src={assignments_blue} height="30" alt="" />
                      </div>
                      <div className="d-flex flex-column align-items-start pl-3">
                        <h4 className="medium-heading">Assignments</h4>
                        <h3 className="h3 text-dark fw-700 my-0">
                          {assignments?.postworks?.length}
                        </h3>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row className="mb-5">
                  <Col xs={12} md={12} className="d-flex">
                    <div>Practice</div>

                    <Switch
                      onChange={() => {
                        setChecked(!checked);
                        !checked ? setShowChartFor("assignment") : setShowChartFor("practice");
                      }}
                      checked={checked}
                      checkedIcon={false}
                      uncheckedIcon={false}
                    />
                    <div>Assignment</div>

                    { /* {["radio"].map((type) => (
                      <div key={`inline-${type}`}>
                        <Form.Check
                          inline
                          label="Practice"
                          value="practice"
                          name="charttype"
                          type={type}
                          onChange={(e) => {
                            handleRadio(e);
                          }}
                          checked={showChartFor == 'practice' ? 'checked' : ''}
                          id={`inline-${type}-1`}
                        />

                        <Form.Check
                          inline
                          label="Assignment"
                          value="assignment"
                          name="charttype"
                          type={type}
                          onChange={(e) => {
                            handleRadio(e);
                          }}
                          checked={showChartFor == 'assignment' ? 'checked' : ''}
                          id={`inline-${type}-2`}
                        />
                      </div>
                    ))} */ }
                  </Col>
                  <Col md={6} className="mb-4 mb-md-0">
                    <div className="dash-box h-100">
                      <div className="box-content">
                        {
                          showChartFor == "practice"
                          && practiceReportData.length
                          && <BarChart data={practiceReportData} />
                        }
                        {
                          showChartFor == "assignment"
                          && assignmentReportData.length
                          && <BarChart data={assignmentReportData} />
                        }
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4 mb-md-0">
                    <div className="dash-box h-100">
                      <div className="box-content">
                        <Bar height="280" options={options} data={chartDataRight}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="mt-4">
                <div className="card border-0 custom-card assign-outer classinfo-tab-outer mb-4">
                  
                  {(
                    (key == 'assignment' && assignments['postworks'] && assignments['postworks'].length > 0)
                    ||
                    (key == 'practice' && practice.length > 0)
                  ) &&
                    (
                      <div>
                        <Button
                          className="primary-btn btn primary-btn-outline float-right export-btn"
                          onClick={exportDataHandle}
                        >
                          Export {key.charAt(0).toUpperCase() + key.slice(1)} Data
                        </Button>
                      </div>
                    )
                  }
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    className="custom-tab-style teach-tabs assign-tabs"
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="assignment" title="Assignment">
                      <Table className="theme-table alternate mt-3 mb-1">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Assignment Name</th>
                            <th>Start Date</th>
                            <th>Complete Date</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Performance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignments?.postworks?.map((item, index) => {
                            return (
                              <tr key={index}>
                                { /* <td>{(assignments.page - 1) * 5 + i + 1}</td> */}
                                <td>{parseInt(index) + 1}</td>
                                <td className="class-name">
                                  {item.title || item.videoTitle}
                                </td>
                                <td>
                                  {moment(item.startDate).format(
                                    "DD-MMM-YYYY"
                                  )}
                                </td>
                                <td>
                                  {(item.lastSubmissionDate &&
                                    moment(item.lastSubmissionDate).format(
                                      "DD-MM-YYYY"
                                    )) ||
                                    "------"}
                                </td>
                                <td>
                                  {item.submissionsCount > 0 ? (
                                    <span className="text-green">
                                      Completed
                                    </span>
                                  ) : (
                                    <span className="text-org">
                                      Pending
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <ProgressBar
                                    variant="success"
                                    className="green-progress progress-lg"
                                    label={`${Number.isInteger(item.completedActivitiesPercentage) ?
                                      item.completedActivitiesPercentage
                                      : item.completedActivitiesPercentage.toFixed(2)}%`}
                                    now={
                                      Number.isInteger(item.completedActivitiesPercentage) ?
                                        item.completedActivitiesPercentage
                                        : item.completedActivitiesPercentage.toFixed(2)}
                                  />
                                </td>
                                <td>
                                  <span className="perform-badge">
                                    {item.totalScore}%
                                    </span>
                                </td>
                                <td>
                                  <Button
                                    variant="primary"
                                    disabled={item.submissionsCount == 0}
                                    className="primary-btn sm orange-btn"
                                    onClick={() => {
                                      history.push(
                                        `/teacher/progress/${item.postworkId}/students/${s_id}`
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
                      {assignments.docs && (
                        <Pagination className="float-right">
                          <Pagination.Prev
                            disabled={!assignments.hasPrevPage}
                            onClick={() =>
                              handleFetchPostWork(assignments.prevPage)
                            }
                          >
                            Prev
                          </Pagination.Prev>
                          { assignments.prevPage && (
                            <Pagination.Item
                              onClick={() =>
                                handleFetchPostWork(assignments.prevPage)
                              }
                            >
                              { assignments.prevPage}
                            </Pagination.Item>
                          )}
                          <Pagination.Item active>
                            {assignments.page}
                          </Pagination.Item>
                          { assignments.nextPage && (
                            <Pagination.Item
                              onClick={() => {
                                handleFetchPostWork(assignments.nextPage);
                              }}
                            >
                              { assignments.nextPage}
                            </Pagination.Item>
                          )}
                          <Pagination.Next
                            disabled={!assignments.hasNextPage}
                            onClick={() => {
                              handleFetchPostWork(assignments.nextPage);
                            }}
                          >
                            Next
                          </Pagination.Next>
                        </Pagination>
                      )}
                    </Tab>
                    <Tab eventKey="practice" title="Practice">
                      <div className="d-flex">
                        <h2 className="medium-heading text-dark-1 fw-600">
                          Overall Student Performance
                        </h2>
                      </div>
                      <Table className="theme-table alternate mt-3 mb-1">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Practice Name</th>
                            { /* <th>Start Date</th> */}
                            <th>Submission Date</th>
                            <th>Status</th>
                            { /* <th>Progress</th> */}
                            <th>Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {practice?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="class-name">{item.video.title}</td>
                                { /* <td>
                                    {moment(item.lastSubmissionDate).format(
                                      "DD-MMM-YYYY"
                                    )}
                                  </td> */ }
                                <td>
                                  {item.lastSubmissionDate
                                    ? moment(item.lastSubmissionDate).format(
                                      "DD-MMM-YYYY"
                                    )
                                    : "------"}
                                </td>
                                <td>
                                  {
                                    item.submissionsCount > 0 ?
                                      <span className="text-green">
                                        Completed
                                        </span> :
                                      <span className="text-org">
                                        Pending
                                        </span>
                                  }
                                </td>
                                <td>
                                  {
                                    item.submissionsCount > 0 ?

                                      <span className="perform-badge">
                                        {Number.isInteger(item.totalScore) ?
                                          item.totalScore
                                          : item.totalScore.toFixed(2)}%
                                        </span>
                                      : <span className="perform-badge">-NA-</span>
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>
                </div>
              </Col>
            </>
            )}
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
}
