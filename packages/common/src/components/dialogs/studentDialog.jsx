import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
/**
 * Summary .(Student list dialog based on class)
 * Description .(Dialog use for select assignment assign of  class )
 * @since X.X
 * @global
 * @parent stepper.js
 * @path src\components\teachers\assignmentsNew\stepper.jsx
 * @param {
 *  show,
 *  handleClose,
 *  student,
 *  list,
 *  handleSelectionStudents,
 *  handleAttempts,
 *  attempt} param
 * @returns
 */
const arrAllAttempt = Array.from({ length: 100 }, (_, index) => index + 1);
export default function StudentDialog({
  show,
  handleClose,
  student,
  list,
  handleSelectionStudents,
  handleAttempts,
  attempt,
  _all,
  _setAll,
}) {
  const [storeStudent, setStoreStudent] = React.useState([]);
  const [attempts, setAttempts] = React.useState(0);
  /**
   * useEffect for storing student list in dialog
   */
  React.useEffect(() => {
    if (list?.length) {
      setStoreStudent(list);
    }
  }, [list]);
  /**
   * set attempt default value from stepper
   */
  React.useEffect(() => {
    setAttempts(attempt);
  }, [attempt]);
  /**
   *  Summary .(Handle Change of form checkbox)
   * @param {*} e  checkbox event
   * @param {*} id  student id
   */
  const handleChange = (e, item) => {
    if (e.target.checked) {
      const temp = JSON.parse(JSON.stringify(storeStudent));
      temp.push({
        _id: item._id,
        attempts: attempt,
        firstName: item.firstName,
        lastName: item.lastName,
      });
      setStoreStudent(temp);
    } else {
      const temp = storeStudent.filter((val) => val._id !== item._id);
      setStoreStudent(temp);
      _setAll(e.target.checked);
    }
  };

  /**
   * Summary .(form handle submit Function)
   * @param {*} e  (Form Event)
   */
  const handleSaveSelection = (e) => {
    e.preventDefault();

    closeDialog();
  };
  const closeDialog = () => {
    setStoreStudent([]);
    setAttempts(1);
    if (storeStudent.length === 0) {
      // const list = student.map((item) => item._id);
      handleSelectionStudents([], attempts);
    } else {
      handleSelectionStudents(storeStudent, attempts);
    }
    handleAttempts(attempts);

    handleClose();
  };

  /**
   * Summary .(Check All students)
   * @param {*} e  (checkbox Event)
   */
  const setAll = (e) => {
    if (e.target.checked) {
      const temp = student.map((item) => {
        return {
          _id: item._id,
          attempts: attempt,
          firstName: item.firstName,
          lastName: item.lastName,
        };
      });
      setStoreStudent(temp);
    } else {
      setStoreStudent([]);
    }
    _setAll(e.target.checked);
  };
  const handleStudentAttempts = (e, item) => {
    const temp = storeStudent.filter((val) => val._id !== item._id);
    temp.push({
      _id: item._id,
      attempts: e.target.value,
      firstName: item.firstName,
      lastName: item.lastName,
    });
    setStoreStudent(temp);
  };
  const handleAllAttempts = (e) => {
    setAttempts(e.target.value);
    const temp = storeStudent.map((item) => {
      return {
        _id: item._id,
        attempts: e.target.value,
        firstName: item.firstName,
        lastName: item.lastName,
      };
    });
    setStoreStudent(temp);
  };

  return (
    <div>
      <Modal show={show} centered className="class-modal" onHide={closeDialog}>
        <Modal.Body>
          <div>
            <button
              type="button"
              className="close"
              onClick={closeDialog}
              title="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="text-center">
            <h3 className="h4 text-dark font-weight-bold mt-4">
              Invite Students
            </h3>
            {student?.length === 0 && (
              <div className="col-sm-12">
                No students have joined this class yet
              </div>
            )}
            {student && student?.length !== 0 && (
              <form onSubmit={handleSaveSelection} className="text-capitalize">
                <div className="d-flex custom-checkbox mt-4 row">
                  <div className="col-auto" style={{ textAlign: "left" }}>
                    <Form.Check
                      inline
                      className="all-students"
                      name="card"
                      checked={
                        storeStudent.length == student.length
                          ? _all?.allStudents
                          : false
                      }
                      type={"checkbox"}
                      label={"All Students"}
                      onChange={(e) => {
                        setAll(e);
                      }}
                    />
                  </div>
                  <div className="col-5 ml-auto">
                    <Form.Control
                      type="number"
                      className="form-control input-bg attempt-input"
                      placeholder="No. Of Attempts"
                      onChange={(e) => {
                        handleAllAttempts(e);
                      }}
                      required
                      size="sm"
                      value={attempts}
                    />
                  </div>

                  {student &&
                    student.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="col-12 px-0 row mx-0 mt-3 align-items-center"
                          style={{ textAlign: "left" }}
                        >
                          <div className="col-auto">
                            <Form.Check
                              inline
                              name="card"
                              checked={
                                storeStudent.some((i) => i._id == item._id)
                              }
                              type={"checkbox"}
                              label={item.firstName + " " + item.lastName}
                              onChange={(e) => {
                                handleChange(e, item);
                              }}
                            />
                          </div>
                          <div className="col-5 ml-auto">
                            {storeStudent.filter(
                              (i) => i._id == item._id
                            )[0] && (
                                <select
                                  className="form-control input-bg attempt-input"
                                  value={
                                    storeStudent.filter(
                                      (i) => i._id == item._id
                                    )[0]?.attempts
                                  }
                                  onChange={(e) => {
                                    handleStudentAttempts(e, item);
                                  }}
                                >
                                  {arrAllAttempt.map((item) => {
                                    return (
                                      <option value={item}>
                                        {item}{" "}
                                        {item !== 1 ? "Attempts" : "Attempt"}
                                      </option>
                                    );
                                  })}
                                </select>
                              )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* <Button
                  variant="primary"
                  className="primary-btn w-100 mt-4"
                  type="submit"
                >
                  Save Selection
                </Button> */}
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
