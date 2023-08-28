import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateClass from "../components/teachers/dialogs/createClassDialog";

export default function TeacherCreateClasswithClassroom() {
  const { accessToken, role } = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <div className="px-4 py-5 main-section top-zero">
      <Row className="card shadow-none border-0 px-3 py-4 mx-0">
        <Col sm={ 12 } md={ 6 } className="m-auto">
          <CreateClass
            isDialog={ true }
            show={ true }
            handleClose={ () => {
              history.push("/teacher/classes");
            } }
            accessToken={ accessToken }
            role={ role }
            fetchClasses={ () => {} }
          />
        </Col>
      </Row>
    </div>
  );
}
