import convertToRankString from "common/src/components/helpers/convertToRankString";
import copy_icon from "common/src/images/copy_icon.svg";
import org_dots from "common/src/images/org-dots.svg";
import React from "react";
import { Button, Dropdown, Overlay, Table, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";
import DeleteDialog from "../../../components/teachers/dialogs/deleteDialog";

const Index = ({ classes, removeClass, handleInvite, isFrom }) => {
  const history = useHistory();
  const [showDelete, setShowDelete] = React.useState(false);
  const [cid, setCID] = React.useState("");
  const onDelete = (val) => {
    setCID(val);
    setShowDelete(true);
  };

  if (isFrom === "student") {
    return (
      <div className="row">
        <StudentClass
          classes={ classes }
          removeClass={ removeClass }
          handleInvite={ handleInvite }
        />
      </div>
    );
  }
  return (
    <>
      <Table hover className="theme-table">
        <thead>
          <tr>
            <th>Sr.no.</th>
            <th>Class Name</th>
            <th>Grade</th>
            { isFrom != "student" && (
              <React.Fragment>
                <th>No of student</th>
                <th>Assignment</th>
                <th>Class Code</th>
              </React.Fragment>
            ) }
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { classes.length == 0 && (
            <td colSpan="7" className="text-center">
              No Record Found
            </td>
          ) }
          { classes.map((c, index) => {
            return (
              <tr
                // style={{ cursor: "pointer" }}
                key={ c._id }
              >
                <td>{ index + 1 }</td>
                <td className="class-name">
                  <span className="fw-600">{ c.name }</span>
                </td>
                <td>
                  { c.grade === -1 || c.grade == undefined
                    ? "Others"
                    : `${convertToRankString(c.grade) || "No Grade"}` }
                </td>
                { isFrom == "student" && (
                  <td>
                    <Dropdown className="drop-no-btn">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <span className="heart-span position-static">
                          <img src={ org_dots } alt="" />
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={ () => {
                            history &&
                              history.push(`/student/classes/${c._id}/show`);
                          } }
                        >
                          View
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={ () => {
                            onDelete(c._id);
                          } }
                        >
                          Remove
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                ) }
                { isFrom != "student" && (
                  <React.Fragment>
                    <td>{ c?.students?.length }</td>
                    <td>{ c?.assignmentsCount }</td>
                    <td>
                      { " " }
                      <Code c={ c } />
                    </td>
                    <td>
                      { c.code && (
                        <div className="d-flex">
                          <Button
                            variant="primary-btn"
                            className="primary-btn orange-btn sm"
                            onClick={ () => {
                              history &&
                                history.push(
                                  `/teacher/classes/${c._id}/homeworks/new`
                                );
                            } }
                          >
                            Create Assignment
                          </Button>
                          <Dropdown className="drop-no-btn">
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              <span className="heart-span position-static">
                                <img src={ org_dots } alt="" />
                              </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={ () => {
                                  history &&
                                    history.push(
                                      `/teacher/classes/${c._id}/show`
                                    );
                                } }
                              >
                                View
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={ () => {
                                  history &&
                                    history.push(
                                      `/teacher/classes/${c._id}/show`
                                    );
                                } }
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={ () => {
                                  onDelete(c._id);
                                } }
                              >
                                Delete
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={ () => {
                                  handleInvite(c);
                                } }
                              >
                                Invite Student
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      ) }
                    </td>
                  </React.Fragment>
                ) }
              </tr>
            );
          }) }
        </tbody>
      </Table>
      <DeleteDialog
        show={ showDelete }
        isFrom={ isFrom }
        handleClose={ () => {
          setShowDelete(false);
        } }
        handleDelete={ () => {
          removeClass(cid);
          setShowDelete(false);
        } }
      />
    </>
  );
};

export default Index;

const StudentClass = ({ classes }) => {
  const history = useHistory();
  return (
    classes &&
    classes.map((item,index) => {
      return (
        <div
          key={ index } 
          className="assignment-card card-box-shadow col-sm-12 col-md-4 col-lg-3 my-2 mx-2">
          <h3 className="medium-heading mb-3 d-flex align-items-start">
            { /* <img src={video_img} className="mr-2" height="18px" alt="" /> */ }
            { item.name }
          </h3>
          <div className="mb-3">
            <span className="pr-3 fw-500 text-dark">Students:</span>
            <span className="d-inline-flex">
              { " " }
              <span className="d-inline-flex fw-500">
                { " " }
                { item.numberOfStudents || "No Students" }
              </span>
            </span>
          </div>
          <div className="mb-3">
            <span className="pr-3 fw-500 text-dark">Assignments:</span>
            <span className="d-inline-flex">
              { " " }
              <span className="d-inline-flex fw-500">
                { " " }
                { item.numberOfAssignment || "No Assignments" }
              </span>
            </span>
          </div>
          <div className="mb-3">
            { /* <span className="pr-3 fw-600 text-dark">Submitted:</span>
        <span>{data.complete}</span> */ }
          </div>
          <Button
            variant="primary"
            className="org-btn-alter sm"
            onClick={ () => {
              history && history.push(`/student/classes/${item._id}/show`);
            } }
          >
            View Class Details
          </Button>
        </div>
      );
    })
  );
};

export const Code = ({ c }) => {
  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);

  React.useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [show]);
  return (
    <>
      <span className="text-org">{ c.code }</span>
      { c.code && (
        <CopyToClipboard text={ c.code }>
          { /* <Button className="float-right">C</Button> */ }
          <img
            ref={ target }
            src={ copy_icon }
            className="ml-2 "
            style={ { cursor: "pointer" } }
            alt="copy"
            title="Copy Code"
            onClick={ () => setShow(!show) }
          />
        </CopyToClipboard>
      ) }
      <Overlay target={ target.current } show={ show } placement="right">
        { (props) => (
          <Tooltip id="overlay-example" { ...props }>
            Copied..
          </Tooltip>
        ) }
      </Overlay>
    </>
  );
};
