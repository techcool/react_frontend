import convertToRankString from "common/src/components/helpers/convertToRankString";
import { DashFooter } from "common/src/components/shared/dashFooter";

import arw_down from "common/src/images/arw_down.svg";
import assignments_icon from "common/src/images/assignment_white.svg";
import class_icon from "common/src/images/classes_blue.svg";
import copy_grey from "common/src/images/copy_icon.svg";
import copy_icon from "common/src/images/copy_white.svg";
import exclaim_icon from "common/src/images/exlaim_org.svg";
import message_icon from "common/src/images/message-hover.svg";
import org_student_icon from "common/src/images/org_student_add.svg";
import question_icon from "common/src/images/question_org.svg";
import { fetchClassDetails, removeClass, updateClass } from "common/src/old-api/classesActions";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  useAccordionToggle
} from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ReactSelect from "react-select";
import { TableData } from "../../../components/teachers/postWorkList/index";
import { Code } from "../../students/classes/index";
import InviteStudent from "../../teachers/dialogs/inviteDialog";
import Assignments from "../../teachers/postWorkList/index";
import StudentPanel from "../classShow/studentpannel";
import DeleteDialog from "../dialogs/deleteDialog";
let classval = {};
export default function ShowClassDetails(props) {
  const {
    classDetails,
    postworks,
    classes,
    removePostwork,
    fetchPostWorkList,
    fetchDetails
  } = props;
  const [key, setKey] = React.useState("home");
  const [showDelete, setShowDelete] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [isInviteDialog, setIsInviteDialog] = React.useState(false);
  const [classId, setClassId] = React.useState(null);
  const [edit, isEdit] = React.useState(false);
  const [assignmentDelete, setAssignmentsDelete] = React.useState(false);
  const [p_id, setP_id] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [inviteClass, setInviteClass] = React.useState(classDetails);
  const { accessToken, role } = props;
  const history = useHistory();

  React.useEffect(() => {
    if (classDetails) {
      setClassId(classDetails._id);
    }
  }, [classDetails]);

  const handleClassOnChange = async (id) => {
    console.log("in house");
    await fetchDetails(id);
    setClassId(id);
  };
  const handleDelete = async (id) => {
    const removed = await removeClass({ accessToken, role, class_id: id });
    if (removed) {
      setShowDelete(false);
      history.push("/teacher/home");
    }
  };
  const handleAssignmentDelete = () => {
    removePostwork(p_id, classId);
    setAssignmentsDelete(false);
  };
  const updateClasses = async () => {
    const name = className ? className : classDetails.name;
    const grad = grade ? grade : classDetails.grade;
    const result = await updateClass({
      accessToken,
      role,
      class_id: classId,
      data: {
        name: name.toLowerCase(),
        grade: grad
      }
    });
    if (result) {
      history.push("/teacher/classes");
    }
  };
  const handleDateChange = (val, type) => {
    if (val) {
      if(type == "due"){
        setDueDate(val);
      }
      const setStartDateVal = (val) => {
        setStartDate(val);
        fetchPostWorkList(moment(val).format("YYYY-MM-DD"));
      };
      return (
        {
          start: setStartDateVal(val),
          due: fetchPostWorkList(
            moment(startDate).format("YYYY-MM-DD"),
            moment(val).format("YYYY-MM-DD")
          )
        }[type] || null
      );
    } else {
      fetchPostWorkList();
    }
  };
  const Clear = () => {
    setStartDate("");
    setDueDate("");
    fetchPostWorkList();
  };
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row>
          <Col md={ key === "manage" ? "8" : "12" }>
            <Row className="card border-0 shadow-none px-3 py-4 mx-0">
              <Col md={ 12 } className="d-flex justify-content-between">
                <h2 className="card-heading mb-4 d-flex">
                  <img className="pr-2" height="24px" src={ class_icon } alt="" />
                  Class Name: { classDetails.name }
                </h2>
                { key === "manage" && (
                  <Button
                    variant="primary"
                    className="primary-btn-outline"
                    onClick={ () => setShowDelete(true) }
                  >
                    Delete
                  </Button>
                ) }
                { key === "students" && (
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="d-flex align-items-center"
                  >
                    <Form.Label className="font-sm mb-0 fw-600 ws-nowrap pr-2">
                      Class Name
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className="form-control grey-select  border-0"
                      onChange={ (e) => handleClassOnChange(e.target.value) }
                    >
                      { classes &&
                        classes.map((item) => {
                          if (item._id === classId) {
                            return (
                              <option value={ item._id } selected>
                                { item.name }
                              </option>
                            );
                          }
                          return <option value={ item._id }>{ item.name }</option>;
                        }) }
                    </Form.Control>
                  </Form.Group>
                ) }
              </Col>

              <Col>
                <div className="card border-0  br-12 assign-outer classinfo-tab-outer mb-4">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={ key }
                    className="teach-tabs assign-tabs"
                    onSelect={ (k) => { isEdit(false); setKey(k); } }
                  >
                    <Tab eventKey="home" title="Assignments">
                      <div className="row">
                        <Col sm={ 12 } className="mb-3">
                          <Row className="mb-3">
                            <Col xs={ 4 }>
                              { " " }
                              <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={ startDate }
                                onChange={ (e) =>
                                  handleDateChange(e.target.value, "start")
                                }
                                className="date-input w-100"
                                readOnly
                              />
                            </Col>
                            <Col xs={ 4 }>
                              <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={ dueDate }
                                className="date-input w-100"
                                onChange={ (e) =>
                                  handleDateChange(e.target.value, "due")
                                }
                                readOnly
                              />
                            </Col>
                            {
                              (startDate || dueDate) && <Col xs={ 4 }>
                                <span className="text-success mt-2" onClick={ () => Clear() } style={ { cursor: "pointer" } }>
                                  Clear Filter
                                </span>
                              </Col>
                            }
                            <Col xs={ 4 }>
                              { " " }
                              <Button
                                variant=""
                                className={ (startDate || dueDate) ? "px-3 success-btn mt-4" : "mt-1 px-3 success-btn" }
                                onClick={ () =>
                                  history.push("/teacher/create-assignment")
                                }
                              >
                                Create Assignment
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Table className="theme-table mb-1 ">
                              <thead>
                                <tr>
                                  { /* <th></th> */ }
                                  <th>Assignment Name</th>
                                  <th>No of Students</th>
                                  <th>Starting Date</th>
                                  <th>Due Date</th>
                                  <th>Submitted</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <TableData
                                table={ postworks }
                                class_id={ classId }
                                onDelete={ (val) => {
                                  setAssignmentsDelete(true);
                                  setP_id(val);
                                } }
                              />
                            </Table>
                            { /* {postworks.length === 0 && (
                              <div className={"text-center"}>
                                <h2>No Record Found</h2>
                              </div>
                            )} */ }
                          </Row>
                        </Col>
                      </div>
                    </Tab>
                    <Tab eventKey="students" title="Students">
                      { classId && <StudentPanel id={ classId } /> }
                    </Tab>
                    <Tab eventKey="manage" title="Manage Class">
                      <ManageClass
                        setIsInviteDialog={ setIsInviteDialog }
                        setInviteClass={ setInviteClass }
                        classDetails={ classDetails }
                        setClassName={ setClassName }
                        setGrade={ setGrade }
                        edit={ edit }
                        updateClasses={ updateClasses }
                        isEdit={ isEdit }
                      />
                    </Tab>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Col>
          { key === "manage" && (
            <Col md="4">
              <RightSideClassesAccordion
                classes={ classes }
                setIsInviteDialog={ setIsInviteDialog }
                setInviteClass={ setInviteClass }
              />
            </Col>
          ) }
        </Row>
      </div>
      <DashFooter />
      <InviteStudent
        show={ isInviteDialog }
        handleClose={ () => {
          setIsInviteDialog(!isInviteDialog);
        } }
        accessToken={ props.accessToken }
        role={ props.role }
        fetchClasses={ () => { } }
        classData={ inviteClass }
      />
      <DeleteDialog
        show={ showDelete }
        handleClose={ () => {
          setShowDelete(false);
        } }
        handleDelete={ () => handleDelete(classDetails._id) }
      />
      <DeleteDialog
        show={ assignmentDelete }
        handleClose={ () => {
          setAssignmentsDelete(false);
        } }
        handleDelete={ () => handleAssignmentDelete() }
      />
    </React.Fragment>
  );
}
const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <div className="medium-heading" onClick={ decoratedOnClick }>
      { children }
    </div>
  );
};
export const RightSideClassesAccordion = (props) => {
  const { classes, setIsInviteDialog, setInviteClass } = props;
  return (
    <div className="card border-0 shadow-none px-3 py-3 mx-0">
      <h2 className="card-heading mb-4">
        <img className="pr-2" height="24px" src={ class_icon } alt="" />
        My Classes
      </h2>

      <Accordion defaultActiveKey="1">
        { classes &&
          classes.map((item, i) => {
            return (
              <Card className="border-0 mb-3" key={ `card-${i}` }>
                <div className="pointer">
                  <CustomToggle eventKey={ i === 0 ? i - 1 : i }>
                    <div className="d-flex justify-content-between">
                      <span>{ item.name }</span>
                      <span>
                        <img src={ arw_down } alt="" />
                      </span>
                    </div>
                  </CustomToggle>
                </div>
                <Accordion.Collapse eventKey={ i === 0 ? i - 1 : i }>
                  <div className="d-flex justify-content-between mt-3 align-items-center">
                    <button
                      variant="primary"
                      className="primary-btn sm orange-btn"
                      onClick={ () => {
                        setIsInviteDialog(true);
                        setInviteClass(item);
                      } }
                    >
                      Invite Student
                    </button>
                    <span className="text-org text-default">
                      <Code c={ item } />
                    </span>
                  </div>
                </Accordion.Collapse>
              </Card>
            );
          }) }
      </Accordion>
    </div>
  );
};

export const ManageClass = (props) => {
  const {
    setIsInviteDialog,
    setInviteClass,
    classDetails,
    setClassName,
    setGrade,
    edit,
    updateClasses,
    isEdit
  } = props;
  const inviteUrlParts = window.location.href.split("/");
  return (
    <div className="bg-grey p-2 br-12">
      <h2 className="card-heading border-bottom pb-3 mb-3">
        <img className="pr-2" height="20px" src={ org_student_icon } alt="" />
        Add Students
      </h2>
      <div className="mb-4 border-bottom pb-4">
        <h3 className="medium-heading mb-4">
          <img className="pr-2" height="20px" src={ message_icon } alt="" />
          Email Invitations
        </h3>
        <div className="row justify-content-between align-items-center">
          <p className="para col-md-7 col-xxl-8">
            Invite your students via email by selecting contacts from Gmail or
            entering addresses
          </p>
          <div className="col-auto">
            <Button
              variant="primary"
              className="primary-btn"
              onClick={ () => {
                setIsInviteDialog(true);
                setInviteClass(classDetails);
              } }
            >
              Send Invitation
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4 border-bottom pb-4">
        <h3 className="medium-heading mb-4">
          <img className="pr-2" height="20px" src={ question_icon } alt="" />
          Class Code:
        </h3>
        <div className="d-flex justify-content-between align-items-center">
          <p className="para">
            Have students visit{ " " }
            <Link
              to={ "/student/join-a-class?code=" + classDetails.code }
              className="text-dark-blue "
              target="_blank"
              rel="noopener noreferrer"
            >
              { inviteUrlParts[0] +
                "//" +
                inviteUrlParts[2] +
                "/" +
                "student/join-a-class?code=" +
                classDetails.code }
            </Link>{ " " }
            and enter the class code.
          </p>

          { /* <CopyToClipboard text={classDetails.code}>
           
          </CopyToClipboard> */ }
          { /* <Button variant="primary" className="primary-btn">
            
          </Button> */ }
          <Code c={ classDetails } />
        </div>
      </div>
      <div className="mb-4 class-detail">
        <h3 className="medium-heading mb-4">
          <img className="pr-2" height="20px" src={ exclaim_icon } alt="" />
          Class Details
        </h3>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          { edit ? (
            <>
              <div className="d-flex col-md-6 col-lg-6 col-xl-6">
                <ul className="list-unstyled table-list w-100">
                  <li>
                    <h6 className="min-w-100">Class Name</h6>{ " " }
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter ClassName"
                      defaultValue={ classDetails.name }
                      onChange={ (e) => setClassName(e.target.value) }
                    />
                  </li>
                  <li>
                    <h6 className="min-w-100">Grade</h6>{ " " }
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="mb-0 w-100"
                      placeholder="Grade"
                      isClearable={ false }
                      isSearchable={ false }
                      placeholder="Grade"
                      options={ [
                        ...Array(12)
                          .fill(0)
                          .map((v, i) => {
                            return {
                              value: i + 1,
                              label: convertToRankString(i + 1)
                            };
                          }),
                        { value: -1, label: "Other" }
                      ] }
                      defaultValue={ {
                        value: classDetails.grade,
                        label: convertToRankString(classDetails.grade)
                      } }
                      onChange={ (option) => {
                        setGrade(option.value);
                      } }
                    />
                  </li>
                </ul>
              </div>
              <Button
                variant="primary"
                className="primary-btn"
                onClick={ () => {
                  updateClasses();
                } }
              >
                Save
              </Button>
            </>
          ) : (
            <>
              { " " }
              <div className="col-xs-9 col-lg-9 col-xl-6">
                <ul className="list-unstyled table-list w-100">
                  <li>
                    <h6>Class Name</h6> <span>{ classDetails.name }</span>
                  </li>
                  <li>
                    <h6>Grade</h6>{ " " }
                    <span>{ convertToRankString(classDetails.grade) }</span>
                  </li>
                </ul>
              </div>
              <div className="col-xs-3 col-lg-3 col-xl-6">
                <Button
                  variant="primary"
                  className="primary-btn ml-auto"
                  onClick={ () => {
                    isEdit(true);
                  } }
                >
                  Edit
                </Button>
              </div>
            </>
          ) }
        </div>
      </div>
    </div>
  );
};
