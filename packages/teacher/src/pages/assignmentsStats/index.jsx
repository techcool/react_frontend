import { DashFooter } from "common/src/components/shared/dashFooter";
import { assignmentList } from "common/src/old-api/classesActions";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AssignmentCard } from "./assignmentCard";

export default function AssignmentStats() {
  const history = useHistory();
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const assignments = await assignmentList({ });
      if (assignments) {
        setList(assignments);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <Row className="card shadow-none border-0  px-3 py-4 mx-0 mb-5">
          <Col className="mb-4">
            <h2 className="card-heading">Assignment Stats</h2>
          </Col>
          <Row sm={ 12 }>
            { list.length > 0 ? (
              list?.map((item,index) => {
                return (
                  <Col key={ index } sm={ 12 } md={ 4 } className="col-xxl-3">
                    <AssignmentCard
                      data={ item }
                    />
                  </Col>
                );
              })
            ) : (
              <Col className="sm-12 text-center align-items-center">
                <h2>No Assignment Found Please Create Assignment</h2>
                <div className="mt-3">
                  <Button
                    onClick={ () => history.push("/teacher/create-assignment") }
                  >
                    Create Assignment
                  </Button>
                </div>
              </Col>
            ) }
          </Row>
        </Row>
      </div>
      <DashFooter />
    </React.Fragment>
  );
}
