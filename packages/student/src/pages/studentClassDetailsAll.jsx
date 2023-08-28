/* eslint-disable eqeqeq */
import React from "react";
import {
  Tabs,
  Tab,
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
import ListPagination from "common/src/components/shared/pagination";
import moment from "moment";
import { fetchPostworks } from "common/src/old-api/postworksActions";
import { fetchClass } from "common/src/old-api/classesActions";
import { assignmentFilter } from 'common/src/components/helpers/assignmentFilter';
import styledComponents from "styled-components";
import classnames from "classnames";
const limit = 10;
const ShowButton = styledComponents.div`
  &:hover{
    cursor:pointer;
  }
`;

const ClassDetails = () => {
  const { class_id } = useParams();
  const { accessToken, role } = useSelector((state) => state.user);
  const [key, setKey] = React.useState("0");
  const [classes, setClasses] = React.useState({});
  const [assignment, setAssignment] = React.useState({});
  const [filterAssignments, setFilterAssignments] = React.useState([]);
  React.useEffect(() => {
    if (class_id) {
      (async () => {
        const res = await fetchClass({
          accessToken,
          role,
          class_id: class_id,
        });
        if (res) {
          setClasses(res);
          getAssignmentList({ class_id: class_id, limit: limit, page: 1 });
        }
      })();
    }
  }, [class_id]);

  const getAssignmentList = async (params) => {
    const response = await fetchPostworks({
      accessToken,
      role,
      filter: params,
    });

    if (response) {
      setAssignment(response);
      setFilterAssignments(response.postworks ? response.postworks : []);
    }
  };
  const switchTab = (k) => {
    if (k != key) {
      let filterdata = assignmentFilter([{filter:'filterBystatus',filterValue:k}], assignment.postworks || []);
      setFilterAssignments(filterdata);
      setKey(k);
    }

    // getAssignmentList({
    //   type: k == 0 ? null : k,
    //   class_id: class_id,
    //   limit: limit,
    //   page: 1,
    //  });

  };

  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
          <Col>
            <div className="d-flex align-items-center mb-4">
              <h2 className="card-heading">Class Details</h2>
            </div>
            <div className="d-flex col-md-6 col-lg-6 col-xl-6">
              <ul className="list-unstyled table-list w-100">
                <li>
                  <h6>Class Name:</h6>
                  <span
                    className="class-name"
                    style={{ TextTransform: "capitalize" }}
                  >
                    {classes.name}
                  </span>
                </li>
                <li>
                  <h6>Teacher Name:</h6>
                  <span
                    className="class-name"
                    style={{ TextTransform: "capitalize" }}
                  >
                    {`${classes.teacherFirstName} ${classes.teacherLastName}`}
                  </span>
                </li>
                <li>
                  <h6>Join Date:</h6>
                  <span>
                    {classes.joinDate
                      ? moment(classes.joinDate).format("DD-MMM-YYYY")
                      : "----------"}
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <div className="row mb-4">
            <div className="col-sm-12 col-md-3"></div>
            <div className="col-sm-12 col-md-3">
              <PieChart
                score={assignment?.overallProgress?.toFixed(2) || 0}
                pieTitle="Overall Progress"
                isDefault={true}
                pie={true}
                ownLable={true}
              />
            </div>
            <div className="col-sm-12 col-md-3">
              <PieChart
                score={assignment?.overallScore?.toFixed(2) || 0}
                pieTitle="Overall Performance"
                isDefault={true}
              />
            </div>
            <div className="col-sm-12 col-md-3"></div>
          </div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            className="stats-tabs"
            onSelect={(k) => switchTab(k)}
          >
            <Tab eventKey="0" title="All">
              <AssignmentTable
                assignments={filterAssignments}
              // joinDate={classes.joinDate}
              />
              {/* <ListPagination
                list={assignment?.paginationData}
                prev={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: 10,
                    page: page,
                  })
                }
                next={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: 10,
                    page: page,
                  })
                }
              /> */}
            </Tab>
            <Tab eventKey="1" title="Done">
              <AssignmentTable
                assignments={filterAssignments}
              // joinDate={classes.joinDate}
              />
              {/* <ListPagination
                list={assignment?.paginationData}
                prev={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 1,
                  })
                }
                next={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 1,
                  })
                }
              /> */}
            </Tab>
            <Tab eventKey="2" title="Current">
              <AssignmentTable
                // assignment={assignment?.postworks?.filter(
                //   (postwork) => postwork.submissionsCount > 0 && (
                //     moment(postwork.startDate).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD") &&
                //     moment(new Date()).format("YYYY-MM-DD") <= moment(postwork.dueDate).format("YYYY-MM-DD")
                //   )
                // )}
                assignments={filterAssignments}
              // joinDate={classes.joinDate}
              />
              {/* <ListPagination
                list={assignment?.paginationData}
                prev={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 4,
                  })
                }
                next={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 4,
                  })
                }
              /> */}
            </Tab>
            <Tab eventKey="3" title="Upcoming">
              <AssignmentTable
                // assignment={assignment?.postworks?.filter(
                //   (postwork) =>
                //   (postwork.submissionsCount === 0 &&
                //     (
                //       moment(new Date()).format("YYYY-MM-DD") < moment(postwork.startDate).format("YYYY-MM-DD")
                //       &&
                //       moment(new Date()).format("YYYY-MM-DD") < moment(postwork.dueDate).format("YYYY-MM-DD")
                //     ))
                // )}
                assignments={filterAssignments}
              // joinDate={classes.joinDate}
              />
              {/* <ListPagination
                list={assignment?.paginationData}
                prev={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 2,
                  })
                }
                next={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 2,
                  })
                }
              /> */}
            </Tab>
            <Tab eventKey="4" title="Past Due">
              <AssignmentTable
                // assignment={assignment?.postworks?.filter(
                //   (postwork) =>
                //     postwork.submissionsCount === 0 &&
                //     (moment(postwork.startDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD") &&
                //       moment(postwork.dueDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD"))
                // )}
                assignments={filterAssignments}
              // joinDate={classes.joinDate}
              />
              {/* <ListPagination
                list={assignment?.paginationData}
                prev={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 3,
                  })
                }
                next={(page) =>
                  getAssignmentList({
                    class_id: class_id,
                    limit: limit,
                    page: page,
                    type: 3,
                  })
                }
              /> */}
            </Tab>
          </Tabs>
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
};
export default ClassDetails;

export const AssignmentTable = ({ assignments }) => {

  const history = useHistory();
  const { class_id } = useParams();
  const [note, setNote] = React.useState("");
  if (assignments?.length === 0)
    return (
      <div className="card w-100 px-3 py-3">
        <h2>No Result Found</h2>
      </div>
    );
  return (
    <React.Fragment>
      <Table className="theme-table mt-3 mb-1 ml-3 mr-3">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Type</th>
            <th>Attempts</th>
            <th>Progress</th>
            <th>Teacher’s Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments &&
            assignments.map((item, i) => {

              return (
                <tr>
                  <td className="class-name">{`${item.title}`}</td>
                  <td className="class-name">
                    {" "}
                    {item.startDate
                      ? moment(item.startDate).format("DD-MMM-YYYY")
                      : "----------"}
                  </td>
                  <td className="class-name">
                    {" "}
                    {item.dueDate
                      ? moment(item.dueDate).format("DD-MMM-YYYY")
                      : "----------"}
                  </td>
                  <td>
                    {
                      item.submissionsCount > 0 ?
                        (
                          <span className="text-green"> &#9679; Completed</span>
                        ) :
                        item.submissionsCount === 0 &&
                          (
                            moment(item.startDate).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD") && moment(new Date()).format("YYYY-MM-DD") <= moment(item.dueDate).format("YYYY-MM-DD")
                          ) ?
                          <span className="text-green"> &#9679; Current</span>
                          : item.submissionsCount === 0 &&
                            (
                              moment(item.startDate).format("YYYY-MM-DD") >
                              moment(new Date()).format("YYYY-MM-DD") &&
                              moment(item.dueDate).format("YYYY-MM-DD") >
                              moment(new Date()).format("YYYY-MM-DD")
                            ) ? (
                            <span className="text-org"> &#9679; Upcoming</span>
                          ) : item.submissionsCount === 0 &&
                            moment(item.startDate).format("YYYY-MM-DD") <
                            moment(new Date()).format("YYYY-MM-DD") &&
                            moment(item.dueDate).format("YYYY-MM-DD") <
                            moment(new Date()).format("YYYY-MM-DD") ? (
                            <span className="text-red"> &#9679; Past Due</span>
                          ) : (
                            <></>
                          )
                    }
                  </td>
                  <td>{item.type ? item.type : "No Type Found"}</td>
                  <td className="text-center">{item.submissionsCount ? item.submissionsCount : 0}</td>
                  <td>
                    <ProgressBar
                      variant="success"
                      className="green-progress progress-lg"
                      label={`${Number.isInteger(item.completedActivitiesPercentage) ? item.completedActivitiesPercentage : item.completedActivitiesPercentage.toFixed(2)}%`}
                      now={Number.isInteger(item.completedActivitiesPercentage) ? item.completedActivitiesPercentage : item.completedActivitiesPercentage.toFixed(2)}
                    />
                  </td>
                  <td>
                    <ShowButton
                      className={classnames(
                        "font-weight-bold",
                        { "text-dark-blue": item.teacherNote },
                        { "text-black": !item.teacherNote }
                      )}
                      onClick={() => setNote(item.teacherNote)}
                      data-toggle="modal"
                      data-target="#noteModal"
                    >
                      Show
              </ShowButton>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      disabled={
                        moment(item.startDate).format("YYYY-MM-DD") >
                        moment(new Date()).format("YYYY-MM-DD") &&
                        moment(item.dueDate).format("YYYY-MM-DD") >
                        moment(new Date()).format("YYYY-MM-DD")
                      }
                      className="primary-btn sm orange-btn"
                      onClick={() => {
                        return !item.submissionsCount
                          ? history.push(
                            `/student/postworks/${item.postworkId}/${item.classId}`
                          )
                          : history.push(
                            `/student/assignment/${item.postworkId}/result`
                          );
                      }}
                    >
                      {!item.submissionsCount ? "View Activities" : "View Result"}
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div
        className="modal fade"
        id="noteModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Teacher's Comments
          </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {note ? (
                note.split("\n").map((text) => (
                  <React.Fragment>
                    {text}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <>Teacher didn't comment yet.</>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
          </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
