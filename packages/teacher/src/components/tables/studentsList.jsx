import React, { useState } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import ListPagination from "common/src/components/shared/pagination";
import org_dots from "common/src/images/org-dots.svg";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "common/src/components/dialogs/confirmDialog";
import apis from "common/src/swr";
import routes from "common/src/constants/routes"
import { unrollStudentFromClass } from "common/src/old-api/classesActions";

const Index = ({ searchPayload={}}) => {
  const [page, setPage] = useState(1);
  const {class_id=null}=searchPayload;
  const { data: list, mutate:mutateStudents } = apis.TEACHER.V0.STUDENTS.useStudentList({page,... searchPayload  });
  const history = useHistory();
  const [
    showDeleteDialogue,
    setShowDeleteDialogue
  ] = useState(false);
  const [
    studentToDelete,
    setStudentToDelete
  ] = useState(null);
  return (
    <>
      <Table hover className="theme-table wsp">
        <thead>
          <tr>
            <th></th>
            <th>No</th>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            list?.docs?.map((s, i) => {
              return (
                <tr key={i}>
                  <td></td>
                  <td>{i + 1}</td>
                  <td className="class-name">
                    {s.username ? `@${s.username}` : "No UserName"}
                  </td>
                  <td className="class-name">{s.firstName}</td>
                  <td className="class-name">{s.lastName}</td>
                  <td>{s.email}</td>
                  <td>
                    {s.isPremiumStudent ? "Premium Student" : "Free Student"}
                  </td>
                  <td>
                    <div className="d-flex">
                      {class_id && (
                        <Button
                          variant="primary"
                          className="ws-nowrap primary-btn orange-btn sm"
                          onClick={() => {
                            history.push(
                              `/teacher/performance/class/${class_id}/student/${s._id}`
                            );
                          }}
                        >
                          Check Progress
                        </Button>
                      )}

                      <Dropdown className="drop-no-btn">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <span className="heart-span position-static">
                            <img src={org_dots} alt="" />
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>history.push( routes.TEACHER.PAGES.STUDENTS.PROFILE(s._id))}
                          >
                            View
                          </Dropdown.Item>
                          {
                            class_id &&
                          <Dropdown.Item
                            onClick={() => {
                              setStudentToDelete(s._id)
                              setShowDeleteDialogue(true)
                            }}
                          >
                            Unroll
                          </Dropdown.Item>
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {list?.docs?.length === 0 && (
        <div className={"text-center"}>
          <h2>No Record Found</h2>
        </div>
      )}
      {list?.docs?.length > 0 && (
        <ListPagination prev={setPage} next={setPage} list={list} />
      )}
      <ConfirmDialog
        show={showDeleteDialogue}
        handleClose={() => {
          setShowDeleteDialogue(false);
        }}
        handleConfirm={async () => {
          await unrollStudentFromClass({classId:class_id,studentId:studentToDelete});
          mutateStudents();
          setShowDeleteDialogue(false);
        }
        }
        title="Confirm unrolling"
        description="The student's record for this class will be permanently deleted"
      />
    </>
  );
};

export default Index;
