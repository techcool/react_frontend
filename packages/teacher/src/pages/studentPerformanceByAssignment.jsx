import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Table,
  Accordion,
  useAccordionToggle,
  ProgressBar
} from "react-bootstrap";
import { connect } from "react-redux";
import ReactSelect from "react-select";
import hashString from "hash-string";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  EXERCISE_LISTEN,
  EXERCISES_IDS,
  EXERCISES_IDS_SCORED,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_TRUE_FALSE, EXERCISE_FILL_THE_GAPS, EXERCISE_SHORT_ANSWER, EXERCISE_LONG_ANSWER, EXERCICES_TITLES_OBJECT, EXERCISE_CLOZE, EXERCISE_CHUNK_STORY, EXERCISE_READ, BLUE, EXERCISE_REWRITE_THE_STORY_IN_ENGLISH, EXERCISE_WRITE_STORY, EXERCISE_RECORD_RETELL_STORY, GRADED_EXERCISES_IDS
} from "common/src/constants";
import PieCharts from "common/src/components/charts/pieChart";
import { DashFooter } from "common/src/components/shared/dashFooter";
import { fetchClassDetails } from "common/src/old-api/classesActions";
import { fetchStudentPostworkAssignmentForAllClass } from "common/src/old-api/postworksActions";
import { 
  // fetchStudentProgress,
   updateStudentProgressEvaluation
   } from "common/src/old-api/progressActions";
import { Tabs, Tab } from "react-bootstrap";
import green_check from "common/src/images/green_check.svg";
import cross_icon from "common/src/images/round_cross.svg";
import drag_icon from "common/src/images/drag_icon.svg";
let classval = {};
class SinglePerformance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "home",
      isSubmittedAssignment: false,
      classDetails: {},
      studentDetails: {},
      postWorkList: [],
      assignmentsDropDown: [],
      defaultValue: {},
      evaluation: [],
      studentAnswers: [],
      result: [],
      TableResult: [],
      overallScore: '',
      overallProgress: '',
      SingleResult: [],
      SingleExerciseResult: "",
      postworkDetails: {},
      selectedAssignmentId: '',
      loading: true,
      isGradedExercise: false,
      review:'',
      oldReview:'',
      reviewError:false,
      reviewInvaildError: false,
      reviewingActivity:false,
    };
  }

  async componentDidMount() {
    const { class_id, student_id } = this.props.match.params;
    const { accessToken, role } = this.props;
    await this.getPostworks(class_id, student_id);
    const details = await fetchClassDetails({ accessToken, role, class_id });
    if (details) {
      const student = details.students.filter(
        (item) => item._id === student_id
      );

      this.setState({ classDetails: details, studentDetails: student[0] });
    }
    this.setState({ loading: false })
  }

  resetState = () => {
    this.setState({
      overallScore: '',
      overallProgress: '',
      key: "home",
      SingleResult: [],
      TableResult: [],
      postworkDetails: {},
      review : '',
      oldReview: '',
      reviewError : false,
      reviewInvaildError: false,
      reviewingActivity: '',
      isGradedExercise: false,
      SingleExerciseResult : '',
    });
  }

  getPostworks = async (page, isNeedToReset = true) => {
    const { accessToken, role } = this.props;
    const { class_id, student_id } = this.props.match.params;
    const postworksData = await fetchStudentPostworkAssignmentForAllClass({
      accessToken,
      role,
      params: {
        class_id: class_id,
        student_id: student_id,
        limit: 8,
        page: page,
      },
    });
    if (postworksData) {

      let list = postworksData.postworks.map((item) => {
        return {
          label: item.title || "No Title",
          value: item.postworkId,
        };
      });

      this.setState({ postWorkList: postworksData, assignmentsDropDown: list });

      if (list.length > 0) {
        this.postworkTable(list?.[0]?.value, isNeedToReset);
      }
    }
  };

  onDragEnd = () => { };

  onReviewChange = (e) => {
    if (e.target.value) {
      this.setState({ review: e.target.value, reviewError: false });
      if(e.target.value >= 0 && e.target.value < 100){
        this.setState({ reviewInvaildError: false });
      }else{
        this.setState({ reviewInvaildError: true });
      }
    }else{
      this.setState({ review: '', reviewError: true })
    }
  }

  onSubmitReview = async () => {
    if(this.state.review){

      if(this.state.review < 0 || this.state.review > 100){
        this.setState({ reviewInvaildError: true, reviewError: false });
      }else{

        const { accessToken, role } = this.props;
        const { student_id } = this.props.match.params;
  
        await updateStudentProgressEvaluation({
          accessToken,
          role,
          postwork_id: this.state.postworkDetails.postworkId,
          student_id,
          evaluation: {
            [this.state.reviewingActivity] : this.state.review
          },
        });
  
        this.getPostworks(this.state.postworkDetails.postworkId,false);
  
        this.setState({SingleExerciseResult : this.state.review + '%'});
      }
    }else{
      this.setState({ reviewError: true, reviewInvaildError: false });
    }
  }

  Capital = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  postworkTable = async (value, isNeedToReset=true) => {
    
    if(isNeedToReset){
      this.resetState();
    }
    
    let selectedAssignment = this.state.assignmentsDropDown.filter((assignment) => assignment.value == value);
    this.setState({ defaultValue: selectedAssignment?.[0] });

    const { accessToken, role } = this.props;
    const { student_id } = this.props.match.params;

    let postworkData = this.state.postWorkList && this.state.postWorkList.postworks ? this.state.postWorkList.postworks.filter((item) => item.postworkId == value) : [];

    if (postworkData.length > 0 && postworkData[0].submissionsCount > 0) {
      this.setState({
        overallScore: typeof postworkData[0].totalScore === 'number' ?
          postworkData[0].totalScore : 0,
        overallProgress: postworkData[0].completedActivitiesPercentage,
        postworkId: value, selectedAssignmentId: value, postworkDetails: postworkData[0]
      });
      this.tableDetails(postworkData[0]);
    }


  };

  tableDetails = async (res) => {

    const {
      exercises,
      scoreByActivity,
      completedActitiviesList,
      progressByActivityPercentage,
    } = res;


    let tableDetailsResult = exercises.map((exercise) => {

      let performance = 0 + '%';
      let performanceColorClass = 'badge-md badge-red';

      if (parseInt(exercise.id) == parseInt(EXERCISE_LISTEN) || parseInt(exercise.id) == parseInt(EXERCISE_READ)) {
        performance = '-';
        performanceColorClass = '-';
      } else {
        if (scoreByActivity.hasOwnProperty(exercise.id)) {

          performance = scoreByActivity[exercise.id];
          performance = parseInt(performance);

          performanceColorClass = performance > 40 ? 'badge-md badge-green' : 'badge-md badge-red';

          performance = Number.isInteger(performance) ? performance : performance.toFixed(2);

          performance = performance + '%';

        } else {
          performanceColorClass = '';
          performance = '-';
          if (!GRADED_EXERCISES_IDS.includes(exercise.id)) {
            performance = 0 + '%';
            performanceColorClass = 'badge-md badge-red';
          } else {
            performance = 'Not Reviewed';
          }
        }
      }

      let progressOfExercise = progressByActivityPercentage[exercise.id] ? progressByActivityPercentage[exercise.id] : 0;

      if (GRADED_EXERCISES_IDS.includes(exercise.id) && completedActitiviesList[exercise.id.toString()]) {
        progressOfExercise = 100;
      }

      progressOfExercise = Number.isInteger(progressOfExercise) ? progressOfExercise : progressOfExercise.toFixed(2);

      return {
        id: exercise.id,
        progress: progressOfExercise,
        performance: performance,
        performanceColorClass: performanceColorClass,
      };
    });
    this.setState({ TableResult: tableDetailsResult })
  }

  // handleIndividualReview = (exerciseId) => {

  //   let resultForIndividualReview = [];
  //   let exerciseScore = 0 + '%';

    

  //   if (this.state.postworkDetails && this.state.postworkDetails['exercises']) {

  //     let exerciseDetails = this.state.postworkDetails['exercises'].filter((item) => item.id == exerciseId);

  //     if (exerciseDetails.length > 0) {

  //       let questions = [];

  //       if (this.state.postworkDetails && this.state.postworkDetails.scoreByActivity && this.state.postworkDetails.scoreByActivity[exerciseId]) {

  //         exerciseScore = this.state.postworkDetails.scoreByActivity[exerciseId];

  //         exerciseScore = exerciseScore + '%';

  //       }

  //       switch (parseInt(exerciseDetails[0].id)) {

  //         case EXERCISE_CLOZE:
  //         case EXERCISE_CHUNK_STORY:

  //           let phrasesCount = exerciseDetails[0]?.phrases?.length;

  //           resultForIndividualReview.push(
  //             {
  //               id: exerciseId,
  //               phrases: exerciseDetails[0].phrases,
  //               options: exerciseDetails[0].options,
  //               phrasesCount: phrasesCount,
  //               lastPhrase: exerciseDetails[0].phrases[phrasesCount - 1],
  //               studentAnswers: this.state.postworkDetails && this.state.postworkDetails.studentAnswers[exerciseId] ?
  //                 this.state.postworkDetails.studentAnswers[exerciseId][0] : [],
  //               correctAnwsers: exerciseDetails[0].rightOrder
  //             }
  //           )
  //           break;

  //         case EXERCISE_MATCH_VISUAL_DESCRIPTION:
  //         case EXERCISE_TRUE_FALSE:
  //         case EXERCISE_MATCH_AUDIO_DESCRIPTION:
  //         case EXERCISE_FILL_THE_BLANK:
  //         case EXERCISE_FILL_THE_GAPS:


  //           for (let temp = 0; temp < exerciseDetails[0].questions.length; temp++) {

  //             let tempQuestion = exerciseDetails[0].questions[temp].paragraph ? exerciseDetails[0].questions[temp].paragraph : exerciseDetails[0].questions[temp].url ? exerciseDetails[0].questions[temp].url : '';


  //             let actualRightAnswer = '';


  //             if ((exerciseDetails[0].questions[temp].rightAnswer || exerciseDetails[0].questions[temp].rightAnswer == 0) &&
  //               exerciseDetails[0].questions[temp].answers
  //             ) {
  //               actualRightAnswer = exerciseDetails[0].questions[temp].answers[exerciseDetails[0].questions[temp].rightAnswer];
  //             } else if (!exerciseDetails[0].questions[temp].answers) {
  //               actualRightAnswer = exerciseDetails[0].questions[temp].rightAnswer;
  //             }


  //             let actualStubentAnsText = '';


  //             let tempStudentAnswer = this.state.postworkDetails.studentAnswers[exerciseId] ? this.state.postworkDetails.studentAnswers[exerciseId][exerciseDetails[0].questions[temp].id]
  //               : '';

  //             if ([EXERCISE_MATCH_AUDIO_DESCRIPTION, EXERCISE_FILL_THE_BLANK, EXERCISE_MATCH_VISUAL_DESCRIPTION].includes(exerciseId)) {
  //               if (tempStudentAnswer || tempStudentAnswer == 0) {
  //                 actualStubentAnsText = exerciseDetails[0].questions[temp].answers[tempStudentAnswer];
  //               } else {
  //                 actualStubentAnsText = 'No Answer';
  //               }
  //             } else {

  //               actualStubentAnsText = tempStudentAnswer != '' || tempStudentAnswer == true || tempStudentAnswer == false ? tempStudentAnswer : 'NO Answer';

  //             }


  //             questions.push({

  //               id: exerciseId,

  //               questionId: exerciseDetails[0].questions[temp].id,

  //               question: tempQuestion,

  //               studentAnswer: typeof actualStubentAnsText == 'boolean' ? actualStubentAnsText.toString() : actualStubentAnsText,

  //               rightAnswer: typeof actualRightAnswer == 'boolean' ? this.Capital(actualRightAnswer.toString()) : actualRightAnswer,

  //               attempt: this.state.postworkDetails.studentAnswers[exerciseId] && this.state.postworkDetails.studentAnswers[exerciseId][exerciseDetails[0].questions[temp].id] != undefined ? true : '',

  //               isCorrect: this.state.postworkDetails && this.state.postworkDetails.evaluation && this.state.postworkDetails.evaluation[exerciseId] &&
  //                 this.state.postworkDetails.evaluation[exerciseId][exerciseDetails[0].questions[temp].id] !== undefined ? this.state.postworkDetails.evaluation[exerciseId][exerciseDetails[0].questions[temp].id] : ''

  //             });

  //           }

  //           break;

  //         case EXERCISE_RECORD_RETELL_STORY:
  //         case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
  //         case EXERCISE_WRITE_STORY:
  //         case EXERCISE_READ:
  //         case EXERCISE_SHORT_ANSWER:
  //         case EXERCISE_LONG_ANSWER:

  //           if (exerciseDetails[0].hasOwnProperty("note")) {
  //             questions.push({
  //               id: exerciseId,
  //               questionId: 0,
  //               question: exerciseDetails[0].note,
  //               attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
  //               isCorrect: '',
  //             });
  //           }

  //           if (exerciseDetails[0].hasOwnProperty("notes")) {
  //             if (Array.isArray(exerciseDetails[0].notes)) {
  //               questions.push({
  //                 id: exerciseId,
  //                 questionId: exerciseId == EXERCISE_WRITE_STORY ? 0 : exerciseDetails[0].selected,
  //                 question: exerciseDetails[0].notes[exerciseDetails[0].selected],
  //                 attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
  //                 isCorrect: '',
  //               });
  //             }
  //           }

  //           if (exerciseDetails[0].hasOwnProperty("questions")) {
  //             if (Array.isArray(exerciseDetails[0].questions)) {
  //               for (let j = 0; j < exerciseDetails[0].questions.length; j++) {
  //                 questions.push({
  //                   id: exerciseId,
  //                   questionId: exerciseDetails[0].questions[j].id,
  //                   question: exerciseDetails[0].questions[j].paragraph,
  //                   attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
  //                   isCorrect: '',
  //                 });
  //               }
  //             }
  //           }

  //           // performance for the exercise
  //           if (this.state.postworkDetails && this.state.postworkDetails.scoreByActivity && this.state.postworkDetails.scoreByActivity[exerciseId] && typeof this.state.postworkDetails.scoreByActivity[exerciseId] === "number") {
  //             exerciseScore = this.state.postworkDetails.scoreByActivity[exerciseId] + '%';
  //           } else {
  //             exerciseScore = 'Not Reviewed';
  //           }

  //           break;

  //         default:
  //           break;
  //       }

  //       if (questions.length > 0) {
  //         for (let index = 0; index < questions.length; index++) {
  //           resultForIndividualReview.push({
  //             id: exerciseId,
  //             questionId: questions[index].questionId,
  //             question: questions[index].question ? questions[index].question : 'Question ' + parseInt(index + 1),
  //             studentAnswer: questions[index].studentAnswer ? questions[index].studentAnswer :
  //               (this.state.postworkDetails && this.state.postworkDetails.studentAnswers && this.state.postworkDetails.studentAnswers[exerciseId] && this.state.postworkDetails.studentAnswers[exerciseId][questions[index].questionId]) ? this.state.postworkDetails.studentAnswers[exerciseId][questions[index].questionId] : 'No answer',
  //             rightAnswer: questions[index].rightAnswer != '' ? questions[index].rightAnswer : '',
  //             attempt: questions[index]['attempt'],
  //             isCorrect: questions[index]['isCorrect']
  //           });
  //         }
  //       }
  //     }
  //   }

  //   this.setState({ SingleResult: resultForIndividualReview, SingleExerciseResult: exerciseScore });

  // }

  handleIndividualReview = (exerciseId) => {

    let resultForIndividualReview = [];

    let exerciseScore = 0 + '%';

    this.setState({
      review : '',
      oldReview: '',
      reviewError : false,
      reviewInvaildError : false,
      reviewingActivity: '',
      isGradedExercise: false,
      SingleExerciseResult : '',
    })

    if (this.state.postworkDetails && this.state.postworkDetails['exercises']) {


      let exerciseDetails = this.state.postworkDetails['exercises'].filter((item) => item.id == exerciseId);


      if (exerciseDetails.length > 0) {

        let questions = [];

        if (this.state.postworkDetails && this.state.postworkDetails.scoreByActivity && this.state.postworkDetails.scoreByActivity[exerciseId]) {

          exerciseScore = this.state.postworkDetails.scoreByActivity[exerciseId];

          exerciseScore = exerciseScore + '%';

        }

        switch (parseInt(exerciseDetails[0].id)) {

          case EXERCISE_CLOZE:
          case EXERCISE_CHUNK_STORY:

            let phrasesCount = exerciseDetails[0]?.phrases?.length;

            resultForIndividualReview.push(
              {
                id: exerciseId,
                phrases: exerciseDetails[0].phrases,
                options: exerciseDetails[0].options,
                phrasesCount: phrasesCount,
                lastPhrase: exerciseDetails[0].phrases[phrasesCount - 1],
                studentAnswers: this.state.postworkDetails && this.state.postworkDetails.studentAnswers[exerciseId] ?
                  this.state.postworkDetails.studentAnswers[exerciseId][0] : [],
                correctAnwsers: exerciseDetails[0].rightOrder
              }
            )
            break;

          case EXERCISE_MATCH_VISUAL_DESCRIPTION:
          case EXERCISE_TRUE_FALSE:
          case EXERCISE_MATCH_AUDIO_DESCRIPTION:
          case EXERCISE_FILL_THE_BLANK:
          case EXERCISE_FILL_THE_GAPS:


            for (let temp = 0; temp < exerciseDetails[0].questions.length; temp++) {

              let tempQuestion = exerciseDetails[0].questions[temp].paragraph ? exerciseDetails[0].questions[temp].paragraph : exerciseDetails[0].questions[temp].url ? exerciseDetails[0].questions[temp].url : '';


              let actualRightAnswer = '';


              if ((exerciseDetails[0].questions[temp].rightAnswer || exerciseDetails[0].questions[temp].rightAnswer == 0) &&
                exerciseDetails[0].questions[temp].answers
              ) {
                actualRightAnswer = exerciseDetails[0].questions[temp].answers[exerciseDetails[0].questions[temp].rightAnswer];
              } else if (!exerciseDetails[0].questions[temp].answers) {
                actualRightAnswer = exerciseDetails[0].questions[temp].rightAnswer;
              }


              let actualStubentAnsText = '';


              let tempStudentAnswer = this.state.postworkDetails.studentAnswers[exerciseId] ? this.state.postworkDetails.studentAnswers[exerciseId][exerciseDetails[0].questions[temp].id]
                : '';

              if ([EXERCISE_MATCH_AUDIO_DESCRIPTION, EXERCISE_FILL_THE_BLANK, EXERCISE_MATCH_VISUAL_DESCRIPTION].includes(exerciseId)) {
                if (tempStudentAnswer || tempStudentAnswer == 0) {
                  actualStubentAnsText = exerciseDetails[0].questions[temp].answers[tempStudentAnswer];
                } else {
                  actualStubentAnsText = 'No Answer';
                }
              } else {

                actualStubentAnsText = tempStudentAnswer != '' || tempStudentAnswer == true || tempStudentAnswer == false ? tempStudentAnswer : 'NO Answer';

              }

              questions.push({

                id: exerciseId,

                questionId: exerciseDetails[0].questions[temp].id,

                question: tempQuestion,

                studentAnswer: actualStubentAnsText,

                rightAnswer: typeof actualRightAnswer == 'boolean' ? this.Capital(actualRightAnswer.toString()) : actualRightAnswer,

                attempt: this.state.postworkDetails.studentAnswers[exerciseId] && this.state.postworkDetails.studentAnswers[exerciseId][exerciseDetails[0].questions[temp].id] != undefined ? true : '',

                isCorrect: this.state.postworkDetails && this.state.postworkDetails.evaluation && this.state.postworkDetails.evaluation[exerciseId] &&
                  this.state.postworkDetails.evaluation[exerciseId][exerciseDetails[0].questions[temp].id] !== undefined ? this.state.postworkDetails.evaluation[exerciseId][exerciseDetails[0].questions[temp].id] : ''

              });

            }
            break;

          case EXERCISE_RECORD_RETELL_STORY:
          case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
          case EXERCISE_WRITE_STORY:
          case EXERCISE_READ:
          case EXERCISE_SHORT_ANSWER:
          case EXERCISE_LONG_ANSWER:

            if (exerciseDetails[0].hasOwnProperty("note")) {
              questions.push({
                id: exerciseId,
                questionId: 0,
                question: exerciseDetails[0].note,
                attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
                isCorrect: '',
              });
            }

            if (exerciseDetails[0].hasOwnProperty("notes")) {
              if (Array.isArray(exerciseDetails[0].notes)) {
                questions.push({
                  id: exerciseId,
                  questionId: exerciseDetails[0].selected,
                  question: exerciseDetails[0].notes[exerciseDetails[0].selected],
                  attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
                  isCorrect: '',
                });
              }
            }

            if (exerciseDetails[0].hasOwnProperty("questions")) {
              if (Array.isArray(exerciseDetails[0].questions)) {
                for (let j = 0; j < exerciseDetails[0].questions.length; j++) {
                  questions.push({
                    id: exerciseId,
                    questionId: exerciseDetails[0].questions[j].id,
                    question: exerciseDetails[0].questions[j].paragraph,
                    attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
                    isCorrect: '',
                  });
                }
              }
            }

            // performance for the exercise
            if (this.state.postworkDetails && this.state.postworkDetails.scoreByActivity && this.state.postworkDetails.scoreByActivity[exerciseId] && !isNaN(this.state.postworkDetails.scoreByActivity[exerciseId])) {
              exerciseScore = this.state.postworkDetails.scoreByActivity[exerciseId] + '%';
            } else {
              exerciseScore = 'Not Reviewed';
            }

            this.setState({
              isGradedExercise:true,
              review : exerciseScore == 'Not Reviewed' ? '' : this.state.postworkDetails.scoreByActivity[exerciseId],
              oldReview:this.state.postworkDetails.scoreByActivity[exerciseId]
            });

            break;

          default:
            break;
        }
        if (questions.length > 0) {
          for (let index = 0; index < questions.length; index++) {
            resultForIndividualReview.push({
              id: exerciseId,
              questionId: questions[index].questionId,
              question: questions[index].question ? questions[index].question : 'Question ' + parseInt(index + 1),
              studentAnswer: questions[index].studentAnswer ? questions[index].studentAnswer :
                (this.state.postworkDetails && this.state.postworkDetails.studentAnswers && this.state.postworkDetails.studentAnswers[exerciseId] && this.state.postworkDetails.studentAnswers[exerciseId][questions[index].questionId]) ? this.state.postworkDetails.studentAnswers[exerciseId][questions[index].questionId] : 'No answer',
              rightAnswer: questions[index].rightAnswer != '' ? questions[index].rightAnswer : '',
              attempt: questions[index]['attempt'],
              isCorrect: questions[index]['isCorrect']
            });
          }
        }

      }
    }

    this.setState({ SingleResult: resultForIndividualReview, SingleExerciseResult: exerciseScore, reviewingActivity:exerciseId });

  }

  render() {

    // const [key, setKey] = useState('home');
    const {
      classDetails,
      studentDetails,
      postWorkList,
      assignmentsDropDown,
      defaultValue,
      SingleResult,
      overallProgress,
      overallScore
    } = this.state;
    const { accessToken, role } = this.props;
    return (
      <React.Fragment>
        <div className="px-4 py-5 main-section top-zero">
          <Row className="card px-3 py-4 mx-0 mb-5">
            <Col>
              <h2 className="card-heading  d-flex my-2">
                Student Name:{" "}
                {studentDetails.firstName + " " + studentDetails.lastName}
              </h2>
              <h5 className="medium-heading my-2">
                Class Name: {classDetails.name}
              </h5>
            </Col>
            <Col>
              <Row className="justify-content-between align-items-center">
                <Col md={4}>
                  <ReactSelect
                    id={"postwork"}
                    className="lit-react-select grey"
                    placeholder="Postwork"
                    isClearable
                    value={defaultValue}
                    options={assignmentsDropDown}
                    onChange={(val) => val ? this.postworkTable(val.value) : this.setState({
                      SingleResult: []
                    })}
                  />
                </Col>
                <Col md={6}></Col>
              </Row>
            </Col>
            {!this.state.loading && this.state.TableResult?.length > 0 &&
              <Col sm={12}>
                <Row className="justify-content-between align-items-center">
                  <Col sm={4}></Col>
                  <Col sm={4}>
                    <PieCharts
                      isDefault={true}
                      pie={true}
                      pieTitle="Performance"
                      score={overallScore ? Number.isInteger(overallScore) ? overallScore : overallScore.toFixed(2) : 0}
                    />
                  </Col>
                  <Col sm={4}>
                    <PieCharts
                      isDefault={true}
                      pie={true}
                      pieTitle="Progress"
                      score={overallProgress ? Number.isInteger(overallProgress) ? overallProgress : overallProgress.toFixed(2) : 0}
                    />
                  </Col>
                </Row>
              </Col>
            }
            {this.state.loading ?
              (<b>Loading...</b>)
              :
              this.state.TableResult?.length > 0 &&
                this.state.TableResult?.filter((task) => task !== undefined)?.length ?
                (
                  <Col className="mt-5">
                    <div className="card border-0  assign-outer classinfo-tab-outer mb-5">
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.key}
                        className="teach-tabs assign-tabs"
                        onSelect={(k) => this.setState({ key: k })}
                      >
                        <Tab eventKey="home" title="Performance">
                          <Table hover className="theme-table alternate">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Tasks</th>
                                <th>Progress</th>
                                <th>Current Performance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.TableResult
                                ?.filter((task) => task !== undefined)
                                .map((item, i) => {
                                  if (item) {
                                    return (
                                      <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                          {EXERCICES_TITLES_OBJECT[item.id]}
                                        </td>
                                        <td>
                                          <ProgressBar
                                            variant="success"
                                            className="green-progress progress-lg"
                                            label={`${item.progress}%`}
                                            now={`${item.progress}`}
                                          />
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              item.performance != '' ?
                                                item.performanceColorClass : ''
                                            }
                                          >
                                            {item.performance}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  }
                                  return null;
                                })}
                            </tbody>
                          </Table>
                        </Tab>
                        <Tab eventKey="students" title="Individual Review">
                          <div className="my-4">
                            <div className="col-md-4 px-0">
                              <label htmlFor={"posttype"} className="fw-600">
                                Tasks
                          </label>
                              <ReactSelect
                                id={"posttype"}
                                className="lit-react-select"
                                placeholder="Exercises Name"
                                isClearable
                                onChange={
                                  (value) =>
                                    value ? this.handleIndividualReview(value.value) :
                                      this.setState({
                                        SingleResult: []
                                      })

                                }
                                style={{ zIndex: 100 }}
                                options={this.state.TableResult
                                  ?.map((item, i) => {
                                    if (item && item.id != 0 && item.id != EXERCISE_READ) {
                                      return {
                                        value: item.id,
                                        label: EXERCICES_TITLES_OBJECT[item.id],
                                      };
                                    }
                                    return null;
                                  })
                                  .filter((item) => item !== null)}
                              />
                            </div>
                          </div>
                          <div className="bg-white px-5 py-5">
                            <Row className="align-items-center">

                              {SingleResult?.map((result, resultIndex) => {

                                if (result.id == EXERCISE_CLOZE) {
                                  return (
                                    <div className="form-group my-3 p-4" key={`${resultIndex}`}>
                                      {result.phrases.slice(0, result.phrasesCount - 1).map((phrase, index) => (
                                        <React.Fragment>
                                          {phrase.split("\n").length === 1
                                            ? phrase
                                            : phrase.split("\n").map((p, index) => (
                                              <React.Fragment>
                                                {p}
                                                {index < phrase.split("\n").length - 1 && <br />}
                                              </React.Fragment>
                                            ))}

                                          {
                                            <React.Fragment>
                                              {" "}
                                              {result.studentAnswers[index] !== -1 &&
                                                result.studentAnswers[index] !== result.correctAnwsers[index] ? (
                                                <span
                                                  style={{ textDecoration: "line-through", color: "#f00" }}
                                                >
                                                  {result.options[result.studentAnswers[index]]}
                                                </span>
                                              ) : result.studentAnswers[index] !== result.correctAnwsers[index] ? (
                                                <span
                                                  className="font-weight-bold"
                                                  style={{ textDecoration: "underline", color: "#000" }}
                                                >
                                                  not anwsered
                                                </span>
                                              ) : null}{" "}
                                            </React.Fragment>
                                          }{" "}
                                          <span
                                            className="font-weight-bold"
                                            style={{
                                              color: BLUE,
                                            }}
                                          >
                                            {result.options[result.correctAnwsers[index]]}
                                          </span>{" "}
                                        </React.Fragment>
                                      ))}
                                      {result.lastPhrase}
                                    </div>
                                  )
                                } else if (result.id == EXERCISE_CHUNK_STORY) {
                                  return (
                                    <div className="d-flex flex-column w-100">
                                      <div className="form-group my-3 pb-4 pt-4 px-4">
                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                          <DragAndDropPanel
                                            evaluation={result.evaluation}
                                            order={result.studentAnswers}
                                            phrases={result.phrases}
                                          />
                                        </DragDropContext>
                                      </div>
                                      <div className="h3 px-4">The Right anwser</div>
                                      <div className="form-group my-3 pb-4 pt-4 px-4">
                                        <Anwsers order={result.correctAnwsers} phrases={result.phrases} />
                                      </div>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div className="col-md-12 mb-4 question-outline">
                                      <div className="px-2">
                                        <div className="question-wrap d-flex justify-content-between">

                                          <h4 className="medium-heading mt-2">
                                            <span>{resultIndex + 1}. </span>
                                            {
                                              !result.question && 'Question '
                                            }
                                            {
                                              result.id == EXERCISE_MATCH_VISUAL_DESCRIPTION && <img width="100" src={result.question} />
                                            }
                                            {
                                              result.id != EXERCISE_MATCH_VISUAL_DESCRIPTION ?
                                                result.question ? result.question : parseInt(result.id) + parseInt(1) : ''
                                            }

                                          </h4>
                                          {!GRADED_EXERCISES_IDS.includes(result.id) &&
                                            result.attempt != '' &&
                                            result.hasOwnProperty("isCorrect") ?
                                            result.isCorrect ? (
                                              <img src={green_check} alt="" />
                                            ) : (
                                              <img src={cross_icon} alt="" />
                                            ) : ''
                                          }
                                        </div>
                                        <div>
                                          {result.id == EXERCISE_RECORD_RETELL_STORY &&
                                            result.studentAnswer != 'No Answered' &&
                                            <div className="my-3 record-question">
                                              <span className="pr-2 text-dark font-weight-bold fw-600">
                                                Student Answer :
                                          </span>
                                              <audio key={`key-${hashString(result.studentAnswer)}`} controls>
                                                <source src={result.studentAnswer} />
                                              </audio>

                                            </div>

                                          }
                                          {result.id == EXERCISE_RECORD_RETELL_STORY &&
                                            result.studentAnswer == 'No Answered' &&
                                            <div className="mb-3">
                                              <span className="text-dark font-weight-bold">
                                                Student Answer :
                                          </span>
                                              <span className="wrong-answer pl-2"> No Answered </span>
                                            </div>
                                          }
                                          {result.id != EXERCISE_RECORD_RETELL_STORY &&
                                            GRADED_EXERCISES_IDS.includes(result.id) &&
                                            <div className="mb-3">
                                              <div className="my-2">
                                                <span className="text-dark font-weight-bold">
                                                  Student Answer :
                                              </span>
                                                <span className="pl-2">
                                                  {
                                                    result.studentAnswer ? result.studentAnswer : 'No Answered'
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          }
                                          {result.id != EXERCISE_RECORD_RETELL_STORY && GRADED_EXERCISES_IDS.includes(result.id) == false &&
                                            <div className="mb-3">
                                              <div className="my-2">
                                                <span className="text-dark font-weight-bold">
                                                  Student Answer :
                                            </span>
                                                <span className={(result.isCorrect != '' && result.isCorrect) ? 'right-answer pl-2' : 'wrong-answer pl-2'}>
                                                  {
                                                    result.studentAnswer ?
                                                      typeof result.studentAnswer == 'string' ? this.Capital(result.studentAnswer) :
                                                        this.Capital(result.studentAnswer.toString())
                                                      :
                                                      result.attempt != '' ? result.attempt.toString() : 'No Answered'}
                                                </span>
                                              </div>

                                              {
                                                result.attempt != '' &&
                                                  result.hasOwnProperty("isCorrect") ?
                                                  !result.isCorrect ?
                                                    result.rightAnswer ? <div>
                                                      <span className="text-dark font-weight-bold">
                                                        Right Answer :
                                                  </span>
                                                      <span className="right-answer pl-2">
                                                        {typeof result.rightAnswer == 'boolean' ? this.Capital(result.rightAnswer.toString()) : this.Capital(result.rightAnswer)}
                                                      </span>
                                                    </div>
                                                      : ''

                                                    : '' : ''
                                              }
                                            </div>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                              {this.state.isGradedExercise &&
                                <div className="d-flex algin-item-flex-start w-100 mt-3 mb-5 pb-5">
                                  <div className="col-md-6 p-0">
                                    <label className="pr-3 fw-600">
                                      Grade ( Min:0, Max :100 )
                                      </label>
                                    <Form.Control
                                      type="number"
                                      className="py-3"
                                      placeholder="Enter Grade Point"
                                      required
                                      style={{ border: "1px solid #ccc" }}
                                      onChange={(e) => this.onReviewChange(e)}
                                      value={this.state.review?this.state.review:''}
                                      min="0"
                                      max="100"
                                    />
                                    {
                                      this.state.reviewError && <span className="error" style={{ color: "#ff0000" }}>Please enter the grade points
                                      </span>
                                    }
                                    {
                                      this.state.reviewInvaildError && <span className="error" style={{ color: "#ff0000" }}>Grade point should be under 0 to 100
                                      </span>
                                    }
                                    
                                  </div>
                                  <div className="col-md-6">
                                    <Button type="button" className="primary-btn-outline btn btn-primary mt-4 py-3" 
                                    disabled={this.state.review==this.state.oldReview}
                                    onClick={this.onSubmitReview}>
                                      Submit Review
                                      </Button>
                                  </div>
                                </div>
                              }
                              {SingleResult.length > 0 && <div className="col-auto ml-auto">
                                <h2 className="text-dark h2 font-weight-bold">
                                  {this.state.SingleExerciseResult != -1 ?
                                    `${this.state.SingleExerciseResult}` : ''
                                  }
                                </h2>
                              </div>
                              }


                            </Row>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Col>
                ) :

                (
                  <div className="card border-0 custom-card assign-outer text-center mt-4 classinfo-tab-outer mb-4">
                    <h1>{
                      this.state.selectedAssignmentId ? 'Student did not submit this assignment' : 'No Record Found'}</h1>
                  </div>
                )}
          </Row>
        </div>
        <DashFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role } = user;
  return {
    accessToken,
    role,
  };
};


class DragAndDropPanel extends React.Component {
  render() {
    const { phrases, order, evaluation } = this.props;
    return (
      <Droppable droppableId={"droppable-0"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {order.map((i, index) => (
              <Container
                key={index}
                className={classnames(
                  { correct: evaluation !== undefined && evaluation[index] },
                  { wrong: evaluation !== undefined && !evaluation[index] }
                )}
              >
                <Phrase id={`${index}`} index={index} phrase={phrases[i]} />
              </Container>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

class Phrase extends React.Component {
  render() {
    const { phrase } = this.props;
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="border p-2 my-2 bg-white text-black"
          >
            <span>
              <img src={drag_icon} className="px-2" />
            </span>
            {phrase}
          </div>
        )}
      </Draggable>
    );
  }
}
const Anwsers = ({ phrases, order }) =>
  order.map((i, index) => (
    <div key={index} className="border p-2 my-2 bg-white text-black">
      <span>
        <img src={drag_icon} className="px-2" />
      </span>
      {phrases[i]}
    </div>
  ));


export default connect(mapStateToProps, null)(SinglePerformance);
