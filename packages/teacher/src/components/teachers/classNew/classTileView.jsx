import blue_dots from "common/src/images/blue_dots.svg";
import cap_blue from "common/src/images/cap_blue.svg";
import classes_blue from "common/src/images/classes_blue.svg";
import student_group from "common/src/images/student_group_blue.svg";
import React from "react";
// import { Accordion, Card, useAccordionToggle,Button } from "react-bootstrap";
import { Col, Dropdown, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import DeleteDialog from "common/src/components/dialogs/deleteDialog";
class Class extends React.Component {
  constructor() {
    super();
    this.state = {
      cid: "",
      ShowDelete: false
    };
  }

  render() {
    return (
      <div className="card px-4 shadown-none border-0 py-4 mb-5 br-12">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="card-heading">
            { " " }
            <img src={ classes_blue } className="mr-3" height="20" alt="" />
            My Classes
          </h2>
        </div>
        <Row>
          { this.props.classes &&
            this.props.classes.map((item, i) => {
              if (i < 4) {
                return (
                  <Col
                    xs={ 12 }
                    md="6"
                    xl="6"
                    className="col-xxl-3"
                    key={ `${item.id}_${i * i}_class_tile` }
                  >
                    <div className="grey-card">
                      <div className="d-flex justify-content-between mb-2">
                        <h4>{ item.name }</h4>
                        <Dropdown className="drop-no-btn">
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            <span className="heart-span position-static">
                              <img src={ blue_dots } alt="" />
                            </span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <LinkItem item={ item } />
                            <Dropdown.Item
                              onClick={ () => {
                                this.props.onDelete(item._id);
                              } }
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={ () => {
                                this.props.handleInvite(item);
                              } }
                            >
                              Invite Student
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link
                                to={ `/teacher/classes/${item._id}/homeworks/new` }
                              >
                                Create Assignment
                              </Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="d-flex">
                        <p className="pr-3">
                          { " " }
                          <img
                            src={ cap_blue }
                            className="mr-2"
                            height="20"
                            alt=""
                          />
                          Grade { item.grade }
                        </p>
                        <p>
                          <img
                            src={ student_group }
                            className="mr-2"
                            height="20"
                            alt=""
                          />
                          ({ item.students.length }) Students
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              }
              return null;
            }) }
        </Row>
        { this.props.classes?.length > 0 && (
          <Link
            variant="dark"
            className="recommended-btn mt-5"
            to="/teacher/classes/"
          >
            View All
          </Link>
        ) }
      </div>
    );
  }
}

export default Class;

const LinkItem = ({ item }) => {
  const history = useHistory();
  return (
    <>
      <Dropdown.Item
        onClick={ () => history.push(`/teacher/classes/${item._id}/show`) }
      >
        View
      </Dropdown.Item>
      <Dropdown.Item
        // href={`/teacher/classes/${item._id}/show`}
        onClick={ () => history.push(`/teacher/classes/${item._id}/show`) }
      >
        Edit
      </Dropdown.Item>
    </>
  );
};
