import DeleteDialog from "common/src/components/dialogs/deleteDialog";
import convertToRankString from "common/src/components/helpers/convertToRankString";
import copy_icon from "common/src/images/copy_icon.svg";
import org_dots from "common/src/images/org-dots.svg";
import React from "react";
import { Button, Dropdown, Overlay, Table, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";

const Index = ({ classes, removeClass, handleInvite }) => {
  const history = useHistory();
  const [showDelete, setShowDelete] = React.useState(false);
  const [cid, setCID] = React.useState("");
  const onDelete = (val) => {
    setCID(val);
    setShowDelete(true);
  };

  return (
    <>
      <Table hover className="theme-table">
        <thead>
          <tr>
            <th>Sr.no.</th>
            <th>Class Name</th>
            <th>Grade</th>
            <th>No of student</th>
            <th>Assignment</th>
            <th>Class Code</th>
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
                
              </tr>
            );
          }) }
        </tbody>
      </Table>
      <DeleteDialog
        show={ showDelete }
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
