import all_students from "common/src/images/all_students.svg";
import { studentList, unrollStudentFromClass } from "common/src/old-api/classesActions";
import React from "react";
import {  Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import StudentList from "../students/index";

const options = [
  {
    label: "Name A to Z",
    value: {
      sortBy: "firstName",
      sortOrder: 1
    }
  },
  {
    label: "Name Z to A",
    value: {
      sortBy: "firstName",
      sortOrder: -1
    }
  },
  {
    label: "New to Old",
    value: {
      sortBy: "creationDate",
      sortOrder: 1
    }
  },
  {
    label: "Old to New",
    value: {
      sortBy: "creationDate",
      sortOrder: -1
    }
  }
];
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      studentList: [],
      value: {
        label: "Name A to Z",
        value: {
          sortBy: "lastName",
          sortOrder: 1
        }
      }
    };
    this.studentlistFunction = this.studentlistFunction.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }
  async studentlistFunction(value, page) {
    const { accessToken } = this.props;
    if (value && value.value) {
      const studentlist = await studentList({
        accessToken,
        params: {
          sort: value.value.sortBy,
          sortOrder: value.value.sortOrder,
          page: page,
          limit: 10,
          class_id: this.props.id
        }
      });
      this.setState({ studentList: studentlist });
    }else{
      const studentlist = await studentList({
        accessToken,
        params: {
          sort: this.state.value.sortBy,
          sortOrder: this.state.value.sortOrder,
          page: 1,
          limit: 10,
          class_id: this.props.id
        }
      });
      this.setState({ studentList: studentlist });
    }
  }
  async componentDidMount() {
    this.studentlistFunction(this.state.value, 1);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: this.props.id });
      this.studentlistFunction(this.state.value, 1);
    }
    return null;
  }
  async handleChange(value) {
    this.setState({ value: value });
    this.studentlistFunction(value, 1);
  }
  async unrollStudent(studentId){
    const { accessToken,role } = this.props;
    const classId= this.props.id;
    await unrollStudentFromClass({ role,accessToken,classId,studentId });
    this.studentlistFunction(this.state.value, 1);
  }
  goToPage(page) {
    this.studentlistFunction(this.state.value, page);
  }
  render() {
    return (
      <React.Fragment>
        <Row className="">
          <Col sm={ 12 }>
            <div className="row justify-content-between mb-4 align-items-center">
              <Col xs={ 6 } md={ 6 } lg={ 6 }>
                <h2 className="card-heading">
                  <img src={ all_students } className="mr-2" height="22" alt="" />
                  Students List
                </h2>
              </Col>
              <Col >
                <Row className="align-items-center justify-content-end">
                  <Col xs={ 6 }>
                    <ReactSelect
                      className="react-custom-select"
                      isClearable
                      onChange={ (val) => this.handleChange(val) }
                      // onInputChange={this.handleInputChange}
                      options={ options }
                      defaultValue={ {
                        label: "Name A to Z",
                        value: {
                          sortBy: "lastName",
                          sortOrder: 1
                        }
                      } }
                    />
                  </Col>
                  { /* <Col md={1}>
                    {" "}
                    <Button className="transparent-btn">
                      <img src={del_icon} alt="" />
                    </Button>
                  </Col> */ }
                  <Col >
                    { " " }
                    <Link
                      className="transparent-btn success"
                      to={ "/teacher/invite" }
                    >
                      <span className="plus-span">+</span>Invite Students
                    </Link>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
          <Col sm={ 12 } className="overflow-auto">
            <StudentList
              classId={ this.state.id }
              list={ this.state.studentList }
              removeClass={ () => {} }
              unrollStudent={ id=>this.unrollStudent(id) }
              prev={ this.goToPage }
              next={ this.goToPage }
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role } = user;
  return {
    accessToken,
    role
  };
};

export default connect(mapStateToProps, null)(Index);
