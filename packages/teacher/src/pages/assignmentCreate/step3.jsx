import Exercises from "common/src/components/dialogs/exercise";
import GrammarBank from "common/src/components/dialogs/grammerBank";
import Vocabulary from "common/src/components/dialogs/vocabulary";
import { durationTime } from "common/src/components/helpers/utils";
import { EXERCICES_TITLES_OBJECT } from "common/src/constants";
import edit_grey from "common/src/images/arw_down2.svg";
import calendar_blue from "common/src/images/calendar_blue.svg";
import video_white from "common/src/images/video_white.svg";
import {
  fetchPracticeExercises,
  fetchSuggestedExercises
} from "common/src/old-api/videosActions";
import moment from "moment";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function Step3(props) {
  const [exercises, setExercises] = React.useState([]);
  const [startDate, setStartDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = React.useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [error, setError] = React.useState("");
  const [view, setView] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [grammarBank, setGrammarBank] = React.useState(false);
  const [vocabulary, setVocabulary] = React.useState(false);
  const [exerciseDialog, setExercisesDialog] = React.useState([]);
  const [answer, setAnswer] = React.useState([]);
  // const [subtitle, setSubtitle] = React.useState(props.subTitle);

  React.useEffect(() => {
    if (props.data) {
      (async function () {
        const res = await fetchPracticeExercises({
          video_id: props.data._id,
          context: "assignment"
        });
        if (res) {
          setExercises(res);
          if (props.exercises?.length === 0) {
            setList(res);
          }
          const ans = await fetchSuggestedExercises({
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
    props.setStartDate(startDate);
    props.setEndDate(endDate);
  }, [startDate, endDate]);

  React.useEffect(()=>{
    props.setExercises(list);
  },[list]);
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
  const onSubmit = () => {
    props.setExercises(list);
    props.setEndDate(endDate);
    props.setStartDate(startDate);
    props.handleSetSubTitle(props.subtitle);
    if (props.title?.length) {
      props.handleSetTitle(props.title);
      props.createAssignments();
    } else {
      setError("Please Enter Assignment Title");
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

  const onSubTitleChange = (e) => {
    props.handleSetSubTitle(e.target.checked);
  };

  return (
    <div>
      <Row className="card px-3 py-4 mx-0 mb-5">
        <Col className="mb-4 d-flex justify-content-between align-items-center">
          <h2 className="card-heading">
            <img src={ calendar_blue } className="pr-2" height="18px" alt="" />{ " " }
            Select Postwork Activities and Date
          </h2>
        </Col>
        <Col>
          <div className="row mb-4">
            <div className="d-flex align-items-center col-sm-12 mb-4">
              <label className="pr-3 fw-600 ws-nowrap min-w-150">
                Assignment Name
              </label>
              <div className="w-100">
                <Form.Control
                  type="text"
                  className="form-control col-sm-12 col-md-4"
                  placeholder="Enter Assignment Name"
                  onChange={ (e) => {
                    props.handleSetTitle(e.target.value);
                    setError("");
                  } }
                  defaultValue={ props.title }
                  required
                />
                <span className="error" style={ { color: "red" } }>
                  { error }
                </span>
              </div>
            </div>
            <div className="col-sm-12 mb-4">
              <div className="d-inline-flex align-items-center mr-3 ">
                <label className="pr-3 fw-600 ws-nowrap min-w-150">
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
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="d-inline-flex align-items-center ">
                <label className="pr-3 fw-600 ws-nowrap min-w-150">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="date-input min-width w-100 input-bg"
                  value={ endDate }
                  onChange={ (e) => {
                    onDueDate(e);
                  } }/>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="px-4 py-5 main-section top-zero">
            <Row className="card px-3 py-4 mx-0 mb-5">
              <Col>
                <Row>
                  <Col md={ 12 } lg={ 5 } className="col-xxl-5">
                    <div className="assign-vid-img mb-4">
                      <img src={ props.data.thumbnail } alt={ props.data.title } />
                      <span className="vid-time">
                        <img src={ video_white } className="pr-2" alt="" />
                        { durationTime(props.data.duration) }
                      </span>
                    </div>
                  </Col>
                  <Col md={ 12 } lg={ 7 } className="col-xxl-4">
                    <div className="assign-list">
                      <ul className="list-unstyled d-flex flex-wrap">
                        <li>
                          <Form.Check
                            inline
                            name="subtitle"
                            type={ "checkbox" }
                            className="custom-checkbox"
                            checked={ props.subtitle }
                            onChange={ (e) => {
                              onSubTitleChange(e);
                            } }
                          />
                          Show subtitles
                        </li> 
                        { exercises &&
                          exercises.map((item, index) => {
                            return (
                              <li key={ index }>
                                <Form.Check
                                  inline
                                  name="card"
                                  type={ "checkbox" }
                                  className="custom-checkbox"
                                  checked={
                                    list.filter((id) => id.id == item.id)[0] ||
                                    list.filter((id) => id.id == item.id)[0] ==
                                  0
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
                  <Col md={ 12 } lg={ 12 } className="col-xxl-3">
                    <div className="d-flex flex-row flex-xxl-column align-items-start">
                      <Button
                        variant="primary"
                        className="primary-btn-outline mb-3 mr-3 mr-xxl-0"
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
                  <Col md={ 12 } className="mt-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <Button
                        variant="primary"
                        className="primary-btn-outline mb-2 full-width-btn"
                        onClick={ () => {
                          props.setStep(2,'',true);
                        } }
                      >
                        Previous
                      </Button>
                      <Button
                        variant="primary"
                        className="primary-btn full-width-btn"
                        onClick={ onSubmit }
                      >
                        Create Assignment
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
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
