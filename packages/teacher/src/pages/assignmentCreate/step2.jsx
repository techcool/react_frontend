import user_blue from "common/src/images/user_blue.svg";
import { fetchClasses, studentList } from "common/src/old-api/classesActions";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function Step2(props) {
  const { accessToken, role } = useSelector((state) => state.user);
  const history = useHistory();
  //const [classes, setClasses] = React.useState([]);
  const [c_id, setC_ID] = React.useState("");
  const [classId, setClassId] = React.useState([]);
  const { class_id } = props.match.params;
  React.useEffect(() => {
    (async function () {
      const data = await fetchClasses({  });
      props.setClassesData(data);
    })();
  }, []);
  React.useEffect(() => {
    if (props.classesList?.length > 0) {
      setClassId(
        props.classesList.map((item) => {
          return { _id: item };
        })
      );
    }
  }, [props.classesList]);
  React.useEffect(() => {
    if (props.match.params.class_id) {
      let temp = props.classes.filter(
        (item) => item._id == props.match.params.class_id
      );
      setClassId(temp);
      props.handleAllData(true, props.match.params.class_id);
      if (temp[0]) {
        setC_ID(props.match.params.class_id);
      }

      // setClassId(classId);
    }
  }, [props.match.params, props.classes]);

  React.useEffect(() => {
    if (props.saved_class_id) {
      setC_ID(props.saved_class_id);
    }
  }, [props.saved_class_id]);

  const handleStudents = async (class_id, is) => {
    if (classId.filter((i) => i._id == class_id)[0]) {
      const res = await studentList({
        accessToken,
        role,
        params: {
          class_id: class_id
        }
      });
      if (res) {
        Promise.resolve(res).then((res) => {
          props.showDialog(res, class_id);
        });
      }
    }
  };

  const handleChange = async (e, classes) => {
    if (classes._id) {
      props.handleAllData(e.target.checked, classes._id);
      if (e?.target?.checked) {
        classId.push(classes);
        let temp = JSON.parse(JSON.stringify(classId));
        setClassId(temp);
        setC_ID(classes._id);
        const res = await studentList({
          accessToken,
          role,
          params: {
            class_id: classes._id
          }
        });
        if (res) {
          props.setStudentfromClass(classes._id, res);
        }
      } else {
        if (!classId.some((item) => item._id == classes._id)) {
          classId.push(classes);
          let temp = JSON.parse(JSON.stringify(classId));
          setClassId(temp);
          setC_ID(classes._id);
          const res = await studentList({
            accessToken,
            role,
            params: {
              class_id: classes._id
            }
          });
          if (res) {
            props.setStudentfromClass(classes._id, res);
          }
        } else {
          let temp = classId.filter((item) => item._id !== classes._id);
          setClassId(temp);
          setC_ID("");
          props.setStudentfromClass(classes._id);
        }
      }
    }
  };
  const onSubmit = () => {
    if (props.attempts) {
      const temp = classId.map((item) => item._id);
      props.setClassesList(temp);
      props.handleClasses(c_id);
      props.setStep(2,temp);
    }
  };
  return (
    <div>
      <Row className="card px-3 py-4 mx-0 mb-5">
        <Col className="mb-4">
          <h2 className="card-heading d-flex align-items-center">
            <img src={ user_blue } className="pr-2" height="18px" alt="" /> Select Classes 
          </h2>
        </Col>
        <Col>
          <Row>
            { props.classesData?.length > 0 ? (
              props.classesData?.map((item) => (
                <Col md={ 3 } key={ item._id } className="mb-3">
                  <div
                    className={
                      classId.filter((i) => i._id == item._id)[0]
                        ? "select-class-card select-dark-card "
                        : "select-class-card"
                    }
                    style={ {
                      position: "relative",
                      cursor: "pointer"
                    } }
                  >
                    <div
                      style={ {
                        position: "absolute",
                        zIndex: 0,
                        top: 0,
                        left: 0
                      } }
                      className="w-100 h-100"
                      onClick={ (e) => handleChange(e, item) }
                    >
                      { " " }
                    </div>
                    <Form.Check
                      inline
                      // disabled={class_id ? true : false}
                      name="card"
                      type={ "checkbox" }
                      checked={ classId.filter((i) => i._id == item._id)[0] }
                      onChange={ (e) => handleChange(e, item) }
                      className="new-checkbox-layout"
                    />
                    <h2 className="medium-heading sd">{ item.name }</h2>
                  </div>
                </Col>
              ))
            ) : (
              <Col className="sm-12 text-center  align-items-center">
                <h2>No Classes Found Please Create Class</h2>

                <Button
                  onClick={ () => history.push("/teacher/classes/new") }
                  variant="primary"
                  // className="primary-btn-outline"
                >
                  Create Class
                </Button>
              </Col>
            ) }
          </Row>
        </Col>
        <Col md={ 12 } className="mt-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <Button
              variant="primary"
              className="primary-btn-outline mb-2 full-width-btn"
              onClick={ () => {
                props.setStep(0);
                props.setIsPreviousClick();
              } }
            >
              Previous
            </Button>
            <Button
              disabled={ classId.length < 1 }
              variant="primary"
              className="primary-btn full-width-btn"
              onClick={ () => onSubmit() }
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
