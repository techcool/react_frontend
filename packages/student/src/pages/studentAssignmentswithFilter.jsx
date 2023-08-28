import React from "react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { DashFooter } from "common/src/components/shared/dashFooter";
import moment from "moment";
import { fetchPostworks } from "common/src/old-api/postworksActions";
import videoicon from "common/src/images/video-icon.png";
import { assignmentFilter } from 'common/src/components/helpers/assignmentFilter';
const ClassDetails = () => {
  // const { class_id } = useParams();
  const { accessToken, role } = useSelector((state) => state.user);
  
  const [key, setKey] = React.useState("0");
  const [classes, setClasses] = React.useState({});

  const [assignment, setAssignment] = React.useState([]);
  const [filterAssignments, setFilterAssignments] = React.useState([]);

  const [postWork, setPostWork] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      getAssignmentList();
    })();
  }, []);

  const getAssignmentList = async (params) => {
    const response = await fetchPostworks({
      accessToken,
      role,
      filter: params,
    });
    if (response) {

      setAssignment(response);

      let filterdata = assignmentFilter([{filter:'filterBystatus',filterValue:'2'}], response.postworks||[]);
      // setPostWork(response);
      setFilterAssignments(filterdata)
    }
  };
  const onSelectChange = (e) => {
    if(e.target.value){
      let filterdata = assignmentFilter([{filter:'filterBystatus',filterValue:e.target.value}], assignment.postworks||[]);
      setFilterAssignments(filterdata);
    }
  };
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
          <Col className="mb-4">
            <div className="d-flex align-items-center mb-4">
              <h2 className="card-heading">My Assignment</h2>
            </div>
          </Col>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            className="teach-tabs assign-tabs"
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="0" title="Videos" className="p-4">
              <Col sm="12" md="4" lg="3">
                <select
                  onChange={(e) => onSelectChange(e)}
                  className="form-control mt-4 mb-5"
                >
                  <option value="0">All</option>
                  <option value="1">Completed</option>
                  <option value="2" selected>Current</option>
                  <option value="3">Upcoming</option>
                  <option value="4">Past Due</option>
                </select>
              </Col>

              <Assignments assignments={filterAssignments}  />
            </Tab>
            <Tab eventKey="1" title="Storybook" className="p-4">
              <StoryBook />
            </Tab>
          </Tabs>
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
};
export default ClassDetails;

const Assignments = ({ assignments }) => {
  const history = useHistory();
  if (assignments?.length === 0)
    return (
      <div className="card w-100 px-3 py-3">
        <h2>No Result Found</h2>
      </div>
    );

  return (
    <div className="row card-scroll">
      {assignments.map((item, i) => {
        return (
          <div
            className="col-sm-12 col-md-3 col-lg-3  mb-4 px-2"
            key={i + item._id}
          >
            <div
              className="assignment-card card-box-shadow"
              style={{ cursor: "pointer" }}
              onClick={() =>
                history.push(`/student/assignment/${item.postworkId}/show`)
              }
            >
              <h2 className="medium-heading mb-3 d-flex align-items-start">
                <img src={videoicon} className="pr-2" alt="" />

                {/* <img src={video_img} className="mr-2" height="18px" alt="" /> */}
                {item.title ? item.title : item.videoTitle}
              </h2>
              <div className="mb-3">
                <h3 className="d-inline-flex fw-500">
                  {" "}

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
                </h3>
              </div>
              <div className="mb-3">
                <span className="pr-3 fw-500 text-dark"><b>Teacher:</b></span>
                <span className="d-inline-flex">
                 <span className="d-inline-flex fw-500">
                   <b>
                    {item.teacher && item.teacher.firstName ? Capital(item.teacher.firstName) : '-NA-'}
                    {item.teacher && item.teacher.lastName ? ' '+ Capital(item.teacher.lastName) : ''}
                   </b>
                  </span>
                </span>
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

              {/* <Button
            variant="primary"
            className="org-btn-alter sm"
            onClick={() => {
              history && history.push(`/student/classes/${item._id}/show`);
            }}
          >
            View Class Details
          </Button> */}
              {/* <Button
            variant="primary"
            //   disabled={!item.submissionsCount}
            className="primary-btn sm orange-btn"
            onClick={() => {
              return !item.submissionsCount
                ? history.push(`/student/postworks/${item._id}/${class_id}`)
                : null;
            }}
          >
            {!item.submissionsCount ? "See Task" : "See Result"}
          </Button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const Capital = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
const StoryBook = () => {
  return <h2>Coming Soon</h2>;
};
