import org_dots from "common/src/images/org-dots.svg";
import { removePostwork } from "common/src/old-api/postworksActions";
import moment from "moment";
import React, { useContext } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Card,
  Dropdown,
  Table,
  useAccordionToggle
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeleteDialog from "../../../components/teachers/dialogs/deleteDialog";

const Index = ({  current, upcomming, past, class_id }) => {
  const { accessToken, role } = useSelector((state) => state.user);
  const history = useHistory();
  const [showDelete, setShowDelete] = React.useState(false);
  const [cid, setCID] = React.useState("");
  const onDelete = (val) => {
    setCID(val);
    setShowDelete(true);
  };
  const removeAssignment = async (val) => {
    const res = await removePostwork({
      accessToken,
      role,
      postwork_id: val,
      class_id: class_id
    });
    if (res) {
      history.go(0);
    }
  };

  return (
    <>
      { /* <Table className="theme-table mb-1 fixed-table">
        <thead>
                  <tr>
                    <th></th>
                    <th>Assignment Name</th>
                    <th>No of Students</th>
                    <th>Starting Date</th>
                    <th>Due Date</th>
                    <th>Submitted</th>
                    <th></th>
                  </tr>
                </thead>
      </Table> */ }
      <Accordion defaultActiveKey="0" className="border-0 mt-2 table-accord">
        <Card className="border-0 mb-2">
          <div className="accord-head">
            <ContextAwareToggle eventKey="0">
              Current Assignment
            </ContextAwareToggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="overflow-auto">
              <Table
                className="theme-table fixed-table mb-1 mt-3"
                style={ { minHeight: "200px" } }
              >
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
                  table={ current }
                  onDelete={ onDelete }
                  class_id={ class_id }
                />
                { /* {TableData(current)} */ }
              </Table>
            </div>
          </Accordion.Collapse>
        </Card>
        <Card className="border-0 mb-2">
          <div className="accord-head">
            <ContextAwareToggle eventKey="1">
              Upcoming Assignment
            </ContextAwareToggle>
          </div>
          <Accordion.Collapse eventKey="1">
            <div className="overflow-auto">
              <Table
                className="theme-table fixed-table mb-1 mt-3"
                style={ { minHeight: "200px" } }
              >
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
                  table={ upcomming }
                  onDelete={ onDelete }
                  class_id={ class_id }
                />

                { /* {TableData(upcomming)} */ }
              </Table>
            </div>
          </Accordion.Collapse>
        </Card>
        <Card className="border-0 mb-2">
          <div className="accord-head">
            <ContextAwareToggle eventKey="2">
              Past Assignment
            </ContextAwareToggle>
          </div>
          <Accordion.Collapse eventKey="2">
            <div className="overflow-auto">
              <Table
                className="theme-table fixed-table mb-1 mt-3"
                style={ { minHeight: "200px" } }
              >
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
                  table={ past }
                  onDelete={ onDelete }
                  class_id={ class_id }
                />

                { /* {TableData(past)} */ }
              </Table>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <DeleteDialog
        show={ showDelete }
        handleClose={ () => {
          setShowDelete(false);
        } }
        handleDelete={ () => {
          removeAssignment(cid);
          setShowDelete(false);
        } }
        name={ "Assignment" }
      />
    </>
  );
};
export default Index;

const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      style={ { backgroundColor: isCurrentEventKey ? "" : "" } }
      className={ isCurrentEventKey ? "jell" : "dsfd" }
      onClick={ decoratedOnClick }
    >
      { children }
    </button>
  );
};
export const TableData = ({ table, onDelete }) => {
  const history = useHistory();
  if (table.length === 0) {
    return (
      <tr>
        <td colSpan="6">
          { " " }
          <div className="col-sm-12 text-center pt-4">
            <h2>No Data Found</h2>
          </div>
        </td>
      </tr>
    );
  }
  return (
    table &&
    table.length > 0 &&
    table.map((s, i) => {
      return (
        <tbody key={ `${i}___${s._id}` }>
          <tr key={ s._id }>
            <td className="class-name">{ s.title ? s.title : s.videoTitle }</td>
            { /* <td>{s.classes && studentCount(s.classes)}</td> */ }
            <td>{ s.assignedCount }</td>
            <td>{ moment(s.startDate).format("DD-MM-YYYY") }</td>
            <td>{ moment(s.dueDate).format("DD-MM-YYYY") }</td>
            <td>
              { s.submissionsCounter }/{ s.assignedCount }
            </td>
            <td>
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  variant="primary"
                  className="primary-btn btn orange-btn px-2"
                  onClick={ () => {
                    history.push(`/teacher/homework/${s._id}`);
                  } }
                >
                  View Details{ " " }
                </Button>
                <Dropdown className="drop-no-btn pos-dropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <span className="heart-span position-static">
                      <img src={ org_dots } alt="" />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    { /* <Dropdown.Item href="#/action-2">Edit</Dropdown.Item> */ }
                    <Dropdown.Item onClick={ () => onDelete(s._id, 1) }>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item href="/teacher/invite">
                      Invite Student
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </td>
          </tr>
        </tbody>
      );
    })
  );
};
