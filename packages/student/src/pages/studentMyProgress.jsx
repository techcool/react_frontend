import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import joined_classes from "common/src/images/joined_classes.svg";
import assignments_org from "common/src/images/assignments_org.svg";
import time_schedule from "common/src/images/time_schedule.svg";
import profile from "common/src/images/profile.svg";
import person from "common/src/images/person2.svg";
import { fetchMyAccountDetails } from "common/src/old-api/usersActions";
import { fetchPostworks } from "common/src/old-api/postworksActions";
import ListPagination from "common/src/components/shared/pagination";
import { AssignmentTable } from "./studentClassDetailsAll";
import PieChart from "common/src/components/charts/pieChart";
import { assignmentFilter } from 'common/src/components/helpers/assignmentFilter';
const _ = require("lodash");
const limit = 10;
export default function StudentMyProgress() {
  const [type, setType] = React.useState('');
  const [date, setDate] = React.useState('');
  const [student, setStudent] = React.useState({});
  const [userQuery, setUserQuery] = React.useState('');
  const [assignments, setAssignments] = React.useState({});
  const { accessToken, role } = useSelector((state) => state.user);
  const [filterAssignments, setFilterAssignments] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await fetchMyAccountDetails({ accessToken, role });
      if (res) {
        setStudent(res);
        getPostworks({ limit: limit, page: 1 });
      }
    })();
  }, []);

  const getPostworks = async (params) => {
    const res = await fetchPostworks({ accessToken, role, filter: params });
    if (res) {
      setAssignments(res);
      setFilterAssignments(res.postworks?res.postworks:[])
    }
  };


  const handleAssignmentFilter = async (filter, filterValue) => {


    let tempFilter = filters.filter((item) => item.filter != filter);
    
    if(filterValue){
      tempFilter.push({
        'filter' : filter, 
        filterValue : filterValue
      });
    }

    setFilters(tempFilter);

    let filterdata = await assignmentFilter(tempFilter, assignments.postworks || []);

    setFilterAssignments(filterdata); 
  }
  

  const onSelectChange = async (e) => {

    setType(e.target.value);
    
    handleAssignmentFilter('filterBystatus',e.target.value);
    
    // getPostworks({
    //   limit: limit,
    //   page: 1,
    //   type: e.target.value ? e.target.value : null,
    //   searchText: userQuery,
    //   dateFilter: date,
    // });
  };

  // const updatePostwork = () => {
  //   getPostworks({
  //     limit: limit,
  //     page: 1,
  //     searchText: userQuery,
  //     dateFilter: date,
  //     type: type,
  //   });
  // };

  // const delayedQuery = React.useCallback(_.debounce(updatePostwork, 500), [
  //   userQuery,
  // ]);

  const onChange = (e) => {
    setUserQuery(e.target.value);
    handleAssignmentFilter('searchByName',e.target.value);
  };

  // React.useEffect(() => {
  //   delayedQuery();
  //   return delayedQuery.cancel;
  // }, [userQuery, delayedQuery]);

  const onDateChange = (e) => {
    if(e?.target?.value){
      setDate(e.target.value);
      handleAssignmentFilter('filterByDate',e.target.value);
    }else{
      setDate('');
      handleAssignmentFilter('filterByDate','');
    }
    
   
   
    // getPostworks({
    //   limit: limit,
    //   dateFilter: e.target.value,
    //   page: 1,
    //   searchText: userQuery,
    //   type: type,
    // });
  };

  const Clear = () => {
    setDate("");
    setUserQuery("");
    setType(0);
    setFilters([]);
    setFilterAssignments(assignments.postworks);
  };
  return (
    <div className="px-4 py-5 main-section top-zero">
      <Row className="card border-0 shadow-none px-3 py-4 mx-0 mb-5">
        <Col>
          <div className="d-flex align-items-center mb-4">
            <h2 className="card-heading">My Progress</h2>
          </div>
        </Col>
        <Row className="mb-5 justify-content-center">
          <Col xs={12} md="4">
            <div className="dash-card progress-card justify-content-start">
              {/* <div className="check-round bg-grey">
                <img
                  src={
                    student.profileImage && student?.profileImage?.length
                      ? student.profileImage
                      : profile
                  }
                  height="50"
                  width="50"
                  alt=""
                  style={{ borderRadius: "500px" }}
                />
              </div> */}
              <div className="d-flex flex-column align-items-start pl-3">
                <h4 className="medium-heading">{`${
                  student.firstName || "----"
                } ${student.lastName || "----"}`}</h4>
                <label className="text-grey font-xs">@{student.username}</label>
                <label className="badge badge-inverse text-white">
                  {student.isPremiumStudent ? "Premium" : "Free"}
                </label>
              </div>
            </div>
          </Col>
          <Col xs={12} md="4">
            <div className="dash-card progress-card justify-content-start">
              <div className="check-round ">
                <img src={joined_classes} height="30" alt="" />
              </div>
              <div className="d-flex flex-column align-items-start pl-3">
                <h4 className="medium-heading">Joined Classes</h4>
                <h3 className="h3 text-dark fw-700 my-0">
                  {student?.joinedClasses}
                </h3>
              </div>
            </div>
          </Col>
          <Col xs={12} md="4">
            <div className="dash-card progress-card justify-content-start">
              <div className="check-round bg-light-org">
                <img src={assignments_org} height="30" alt="" />
              </div>
              <div className="d-flex flex-column align-items-start pl-3">
                <h4 className="medium-heading">Assignments</h4>
                <h3 className="h3 text-dark fw-700 my-0">
                  {student?.noOfassignments}
                </h3>
              </div>
            </div>
          </Col>
          {
            false &&
            <Col xs={12} md="3">
              <div className="dash-card progress-card justify-content-start">
                <div className="check-round">
                  <img src={time_schedule} height="30" alt="" />
                </div>
                <div className="d-flex flex-column align-items-start pl-3">
                  <h4 className="medium-heading">1 of 1 Tutoring Schedule</h4>
                  <h3 className="h3 text-dark fw-700 my-0">0</h3>
                </div>
              </div>
            </Col>
          }
        </Row>

        <Row>
          <Col sm="12" md="4">
            <Form.Control
              type="text"
              className="form-control mt-4 mb-5 input-bg"
              size="md"
              placeholder="Search By Assignment Name"
              value={userQuery}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </Col>
          <Col sm="12" md="4">
            <select
              onChange={(e) => onSelectChange(e)}
              className="form-control mt-4 mb-5 input-bg"
              style={{ height: "52px" }}
              value={type}
            >
              <option value="">Select Status</option>
              {/* <option value="0">All</option> */}
              <option value="1">Completed</option>
              <option value="2">Current</option>
              <option value="3">Upcoming</option>
              <option value="4">Past Due</option>
            </select>
          </Col>
          <Col sm="12" md="4" className="d-flex">
           
              <input
                type="date"
                id="startDate"
                name="startDate"
                placeholder="Due Date"
                className={date ? "date-input input-bg w-100 mt-4 mb-5 date-filter-width": "date-input input-bg w-100 mt-4 mb-5"}
                // value={this.state.startDate}
                onChange={(e) => {
                  onDateChange(e);
                }}
                value={date}
              ></input>
            
              {date && <div className="mt-4 mb-5">
                <span className="date-calender-clear-filter" onClick={() => onDateChange()} title="Clear Date Filter">X</span></div>}
            
          </Col>
          
          {
            filters.length > 0 && <Col xs={3} style={{ marginTop: "-30px" }}>
            <span className="text-success" onClick={() => Clear()} style={{cursor:'pointer'}}>
              Clear Filter
            </span>
          </Col>
          }
          
          <Col
            sm={12}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <PieChart score={assignments?.overallScore?.toFixed(2) || 0} />
              <div className="text-center font-weight-bold col-sm-12">
                Overall Performance
              </div>
            </div>
          </Col>
          <AssignmentTable assignments={filterAssignments} />
        </Row>
        {/* <Row>
          <div className="pagination-full">
            <ListPagination
              list={assignments?.paginationData}
              prev={(page) =>
                getPostworks({
                  limit: 10,
                  page: page,
                })
              }
              next={(page) =>
                getPostworks({
                  limit: 10,
                  page: page,
                })
              }
            />
          </div>
        </Row> */}
      </Row>{" "}
    </div>
  );
}
