/* eslint-disable eqeqeq */
import Exercises from "common/src/components/dialogs/exercise";
import GrammarBank from "common/src/components/dialogs/grammerBank";
import Vocabulary from "common/src/components/dialogs/vocabulary";
import { durationTime } from "common/src/components/helpers/utils";
import { EXERCICES_TITLES_OBJECT } from "common/src/constants";
import edit_grey from "common/src/images/arw_down2.svg";
import calendar_blue from "common/src/images/calendar_blue.svg";
import video_white from "common/src/images/video_white.svg";
import { studentList } from "common/src/old-api/classesActions";
import {
  fetchPracticeExercises,
  fetchSuggestedExercises
} from "common/src/old-api/videosActions";
import moment from "moment";
import React, { useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function SelectClassAndStudent(props) {
  const history = useHistory();
  const { accessToken, role } = useSelector((state) => state.user);
  const [exercises, setExercises] = React.useState([]);
  const [startDate, setStartDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [error, setError] = React.useState("");
  const [view, setView] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [grammarBank, setGrammarBank] = React.useState(false);
  const [vocabulary, setVocabulary] = React.useState(false);
  const [exerciseDialog, setExercisesDialog] = React.useState([]);
  const [classId, setClassId] = React.useState([]);
  const [c_id, setC_ID] = React.useState("");
  const [answer, setAnswer] = React.useState([]);
  const [titleFor, setTitleFor] = React.useState(props.title);
  React.useEffect(() => {
    if (props.data) {
      (async function () {
        const res = await fetchPracticeExercises({
          accessToken,
          role,
          video_id: props.data._id
        });
        if (res) {
          setExercises(res);
          if (props.exercises?.length === 0) {
            setList(res);
          }

          const ans = await fetchSuggestedExercises({
            accessToken,
            role,
            video_id: props.data._id
          });
          if (ans) {
            setAnswer(ans);
          }
        }
      })();
    }
  }, [props.data]);
  React.useEffect(() => {
    if (props.exercises) {
      const { exercises } = props;
      setList(exercises);
    }
  }, [props.exercises]);

  React.useEffect(() => {
    if (props.startDate) {
      setStartDate(props.startDate);
    }
  }, [props.startDate, props.endDate, props.title]);
  React.useEffect(() => {
    if (props.endDate) {
      setEndDate(props.endDate);
    }
  }, [props.endDate]);
  React.useEffect(() => {
    if (props.classId) {
      setClassId(props.classId);
    }
  }, [props.classId]);
  const onChange = (e, id) => {
    if (e.target.checked) {
      const temp = JSON.parse(JSON.stringify(list));
      temp.push(id);
      setList(temp);
    } else {
      const temp = list.filter((item) => item.id !== id.id);
      setList(temp);
    }
  };
  const onDueDate = (e) => {
    if (moment(startDate).isBefore(e.target.value)) {
      setEndDate(e.target.value);
    }
  };
  const onStartDate = (e) => {
    if (
      moment(moment(new Date()).format("YYYY-MM-DD")).isBefore(e.target.value)
    ) {
      setStartDate(e.target.value);
      setEndDate(e.target.value);
    }
  };
  const onTitleChange = (title) => {
    setTitleFor(title);
  };
  const onSubmit = () => {
    props.setExercises(list);
    props.setEndDate(endDate);
    props.setStartDate(startDate);
    if (titleFor) {
      // props.setStep(3);
      props.handleSubmit(list, startDate, endDate, classId, titleFor);
    } else {
      setError("Please Enter Assignment Title");
      return;
    }
  };
  const ExerciseDialog = (data) => {
    setExercisesDialog(data);
    setView(true);
  };
  const setDialogData = (res) => {
    setView(false);
    const dialogIndex = list.findIndex((item) => item.id == res.id);
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[dialogIndex] = res;
    setList(tempList);
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
  const handleStudents = async (class_id) => {
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
  const onPreview = () => {
    props.setExercises(list);
    props.setEndDate(endDate);
    props.setStartDate(startDate);
    props.setClassId(classId);
    if (titleFor) {
      props.handleSetTitle(titleFor);
    }
    props.setStep(1);
  };

  return (
    <div>
      <Row className="card border-0">
        <Col className="mb-4 d-flex justify-content-between align-items-center">
          <h2 className="card-heading">
            <img src={ calendar_blue } className="pr-2" height="18px" alt="" />{ " " }
            Select Activities or Date
          </h2>
        </Col>
        <Col>
          <Row>
            <Col md={ 5 } lg={ 5 } className="col-xxl-5">
              <div className="assign-vid-img">
                <img src={ props.data.thumbnail } alt={ props.data.title } />
                <span className="vid-time">
                  <img src={ video_white } className="pr-2" alt="" />
                  { durationTime(props.data.duration) }
                </span>
              </div>
            </Col>
            <Col md={ 7 } lg={ 7 } className="col-xxl-4">
              <div className="assign-list">
                <ul className="list-unstyled d-flex flex-wrap">
                  { exercises &&
                    exercises.map((item, i) => {
                      return (
                        <li key={ i }>
                          <Form.Check
                            inline
                            name="card"
                            type={ "checkbox" }
                            className="custom-checkbox"
                            checked={
                              list.filter((id) => id.id == item.id)[0] ||
                              list.filter((id) => id.id == item.id)[0] == 0
                            }
                            onChange={ (e) => {
                              onChange(e, item);
                            } }
                          />
                          { EXERCICES_TITLES_OBJECT[item.id] }
                          { [6, 8, 9, 0].filter((val) => val == item.id)
                            .length === 0 &&
                            (list.filter((id) => id.id == item.id)[0] ||
                              list.filter((id) => id.id == item.id)[0] ==
                              0) && (
                            <img
                                  src={ edit_grey }
                                  className="ml-1"
                                  alt=""
                                  height="7px"
                                  onClick={ () => ExerciseDialog(item) }
                            />
                          ) }
                        </li>
                      );
                    }) }
                </ul>
              </div>
            </Col>
            <Col md={ 12 } lg={ 12 } className="col-xxl-3 mt-4">
              <div className="d-flex flex-row flex-xxl-column align-items-start">
                <Button
                  variant="primary"
                  className="primary-btn-outline mb-3  mr-3 mr-xxl-0"
                  onClick={ () => {
                    setGrammarBank(true);
                  } }
                >
                  Grammar Bank
                </Button>
                <Button
                  variant="primary"
                  className="primary-btn-outline mb-3"
                  onClick={ () => {
                    setVocabulary(true);
                  } }
                >
                  Vocabulary Bank
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <AssignmentTab
        key={ key }
        allData={ props.allData }
        error={ error }
        classId={ classId }
        c_id={ c_id }
        titleFor={ titleFor }
        startDate={ startDate }
        endDate={ endDate }
        handleChange={ handleChange }
        handleStudents={ handleStudents }
        setKey={ setKey }
        setError={ setError }
        onTitleChange={ onTitleChange }
        onStartDate={ onStartDate }
        onDueDate={ onDueDate }
        classes={ props.classes }
        onPreview={ onPreview }
        onSubmit={ onSubmit }
      />
      <Exercises
        show={ view }
        handleClose={ (res) => {
          setDialogData(res);
        } }
        list={ list?.filter((item) => item.id == exerciseDialog.id)[0] }
        setData={ setExercisesDialog }
        data={ answer?.filter((item) => item.id == exerciseDialog.id)[0] }
      />
      <GrammarBank
        grammar={ props.data.grammar }
        title={ props.data.grammarTitle }
        show={ grammarBank }
        handleClose={ () => {
          setGrammarBank(false);
        } }
      />
      <Vocabulary
        vocabulary={ props.data.vocabulary }
        show={ vocabulary }
        handleClose={ () => {
          setVocabulary(false);
        } }
      />
    </div>
  );
}


const AssignmentTab = (props) => {

  const history = useHistory();

  const {
    key,
    error,
    classId,
    c_id,
    titleFor,
    startDate,
    endDate,
    handleChange,
    handleStudents,
    setKey,
    setError,
    onTitleChange,
    onStartDate,
    onDueDate,
    classes,
    onPreview,
    onSubmit
  } = props;

  return (
    <Row className="card border-0 px-3 py-4 mx-0 mt-5">
      <Tabs
        id="controlled-tab-example"
        activeKey={ key }
        className="teach-tabs assign-tabs"
        onSelect={ (k) => setKey(k) }
      >
        <Tab eventKey={ 0 } title="Assign">
          <Row className="my-4 px-4">
            <Col>
              <div className="row mb-4">
                <div className="d-flex col-sm-12 mb-4">
                  <label className="pr-3 fw-600 ws-nowrap">
                    Assignment Name
                  </label>
                  <Form.Control
                    type="text"
                    className="form-control col-sm-12 col-md-3"
                    placeholder="Enter Assignment Name"
                    value={ titleFor }
                    onChange={ (e) => {
                      onTitleChange(e.target.value);
                      setError("");
                    } }
                    required
                  />
                  <span className="error" style={ { color: "red" } }>
                    { error }
                  </span>
                </div>
                <div className="d-flex col-sm-12 mb-4">
                  <div className="d-flex align-items-center mr-3 ">
                    <label className="pr-3 fw-600 ws-nowrap">
                      Starting Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="date-input min-width w-100 input-bg"
                      value={ startDate }
                      onChange={ (e) => {
                        onStartDate(e);
                      } }
                    ></input>
                  </div>
                  <div className="d-flex align-items-center ">
                    <label className="pr-3 fw-600 ws-nowrap">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="date-input min-width w-100 input-bg"
                      value={ endDate }
                      onChange={ (e) => {
                        onDueDate(e);
                      } }
                    ></input>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="row px-4">
            { classes?.length === 0 && (
              <Col className="sm-12 text-center  align-items-center">
                <h2>No Classes Found Please Create Class</h2>

                <Button
                  onClick={ () => history?.push("/teacher/classes/new") }
                  variant="primary"
                // className="primary-btn-outline"
                >
                  Create Class
                </Button>
              </Col>
            ) }
            {
              classes?.map((item) => {

                let selectedStudent = _.find(props.allData, { _id: item._id });
                return (
                  <Col md={ 3 } key={ item._id } className="mb-3">
                    <div
                      className={
                        classId.filter((i) => i._id == item._id)[0]
                          ? "select-class-card select-dark-card select-class-card-border"
                          : "select-class-card"
                      }
                      style={ { position: "relative", cursor: "pointer" } }
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
                        name="card"
                        type={ "checkbox" }
                        checked={
                          c_id === item._id ||
                          classId.filter((i) => i._id == item._id)[0]
                        }
                        onChange={ (e) => handleChange(e, item) }
                        className="new-checkbox-layout custom-checkbox custom-round-checkbox"
                      />
                      <h2 className="medium-heading mb-2">{ item.name }</h2>
                    </div>
                    { (classId.filter((i) => i._id == item._id)[0] ||
                      c_id === item._id) && (
                      <div
                          className={ (selectedStudent && selectedStudent["students"] && selectedStudent["students"].length > 0) ? "font-sm select-student-btn student-selected" : "font-sm select-student-btn" }
                          onClick={ () => handleStudents(item._id) }
                      >Select Student
                        </div>
                    ) }
                  </Col>
                );
              })
            }
            <div className="col-md-12 mt-4 mb-4 px-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <Button
                  variant="primary"
                  className="primary-btn-outline mb-2 full-width-btn"
                  onClick={ () => onPreview() }
                >
                  Previous
                </Button>
                { classId?.length ? (
                  <Button
                    variant="primary"
                    className="primary-btn full-width-btn"
                    onClick={ () => onSubmit() }
                  >
                    Create Assignment
                  </Button>
                ) : null }
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey={ 1 } title="Teacher Resources">
          <Row className="my-4">
            <Col md={ 12 } className="mt-4 mb-4 text-center">
              <h2>Coming Soon</h2>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Row>
  );
};
