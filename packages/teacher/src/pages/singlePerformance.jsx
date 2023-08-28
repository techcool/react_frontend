import React from "react";
import moment from "moment";
import classnames from "classnames";
import hashString from "hash-string";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styledComponents from 'styled-components'
import videoicon from "common/src/images/video-icon.png";
// import { Link } from "react-router-dom";
import { Row, Col, Form, Table, ProgressBar, Button } from "react-bootstrap";
import { connect } from "react-redux";
import ReactSelect from "react-select";
// import Assignments from "../../components/teachers/postWorkList/index";
import { DashFooter } from "common/src/components/shared/dashFooter";
// import ListPagination from "common/src/components/shared/pagination";
import { Card } from "common/src/components/shared/card";
import { fetchClassDetails } from "common/src/old-api/classesActions";
// import { fetchVideoDetails } from "common/src/old-api/videosActions";
import {
  BLUE,
  EXERCISE_READ,
  EXERCISES_IDS,
  EXERCISE_CLOZE,
  EXERCISE_LISTEN,
  EXERCISE_TRUE_FALSE,
  EXERCISE_CHUNK_STORY,
  GRADED_EXERCISES_IDS,
  EXERCISE_WRITE_STORY,
  EXERCISE_LONG_ANSWER,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_FILL_THE_BLANK,
  EXERCICES_TITLES_OBJECT,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
} from "common/src/constants";
import {
  fetchPostwork,
  fetchStudentPostworkAssignmentForAllClass,
  fetchStudentPracticeAssignmentForAllClass,
} from "common/src/old-api/postworksActions";
import {
  // fetchStudentPracticeProgress,
  // fetchStudentProgress,
  updateStudentProgressEvaluation
} from "common/src/old-api/progressActions";

// import { ApplicationLayoutContext } from "../../context";
import { Tabs, Tab } from "react-bootstrap";
// import moment from "moment";
import green_check from "common/src/images/green_check.svg";
import cross_icon from "common/src/images/round_cross.svg";
import drag_icon from "common/src/images/drag_icon.svg";

const Container = styledComponents.div`
&.wrong{
  color:#f00;
}
&.correct{
  color:${BLUE};
}
`;

class SinglePerformance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "home",
      classDetails: {},
      studentDetails: {},
      postWorkList: {},
      practiceList: [],
      checked: false,
      evaluation: [],
      studentAnswers: [],
      result: [],
      TableResult: [],
      averageScore: 0,
      overall: 0,
      postworkId: "",
      SingleResult: [],
      SingleExerciseResult: -1,
      isExcerciseSelected: false,
      isAssignmentSelected: false,
      isPracticesSelected: false,
      selectedAssignmentId: '',
      selectedPracticeId: '',
      postworkDetails: {},
      practiceDetails: {},
      videoDetails: {},
      isExerciseCompleted: true,
      isGradedExercise: false,
      review:'',
      oldReview:'',
      reviewError:false,
      reviewingActivity:false,
    };
  }
  async componentDidMount() {
    const { class_id, student_id } = this.props.match.params;
    const { accessToken, role } = this.props;
    this.getPostworks(1);
    this.getPractice(1);
    const details = await fetchClassDetails({ accessToken, role, class_id });
    if (details) {
      const student = details.students.filter(
        (item) => item._id === student_id
      );

      this.setState({ classDetails: details, studentDetails: student[0] });
    }
  }
  getPostworks = async (page) => {
    const { accessToken, role } = this.props;
    const { class_id, student_id } = this.props.match.params;
    const postwork = await fetchStudentPostworkAssignmentForAllClass({
      accessToken,
      role,
      params: {
        class_id: class_id,
        student_id: student_id,
        limit: 8,
        page: page,
      },
    });
    if (postwork) {
      this.setState({ postWorkList: postwork });
    }
  };

  getPractice = async (page) => {
    const { accessToken, role } = this.props;
    const { class_id, student_id } = this.props.match.params;
    const res = await fetchStudentPracticeAssignmentForAllClass({
      accessToken,
      role,
      params: {
        class_id: class_id,
        student_id: student_id,
        limit: 8,
        page: page,
      },
    });
    if (res) {
      this.setState({ practiceList: res });
    }
  };
  resetState = () => {
    this.setState({
      result: [],
      averageScore: 0,
      overall: 0,
      score: 0,
      isExerciseCompleted: true,
      key: "home",
      SingleResult: [],
      TableResult: [],
      postworkDetails: {},
      review : '',
      oldReview: '',
      reviewError : false,
      reviewingActivity: '',
      isGradedExercise: false,
    });
  }
  onReviewChange = (e) => {
    if (e.target.value) {
      this.setState({ review: e.target.value, reviewError: false })
    }else{
      this.setState({ review: '', reviewError: true })
    }
  }

  onSubmitReview = async () => {
    if(this.state.review){

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

      this.getPostworks(this.state.postworkDetails.postworkId);

      this.setState({SingleExerciseResult : this.state.review + '%'});
    }else{
      this.setState({ reviewError: true });
    }
  }

  postworkTable = async (value) => {

    this.resetState();

    const { accessToken, role } = this.props;
    const { student_id } = this.props.match.params;

    let postworkData = this.state.postWorkList && this.state.postWorkList.postworks ? this.state.postWorkList.postworks.filter((item) => item.postworkId == value) : [];
    if (postworkData.length > 0) {
      if (postworkData[0]['submissionsCount'] > 0) {
        this.setState({ postworkId: value, isAssignmentSelected: true, selectedAssignmentId: value, postworkDetails: postworkData[0] });
        this.tableDetails(postworkData[0]);
      } else {
        this.setState({ isAssignmentSelected: true, selectedAssignmentId: value });
      }
    }

  };


  practiceTable = async (value) => {

    this.resetState();
    const { accessToken, role } = this.props;
    const { student_id } = this.props.match.params;


    let practiceData = this.state.practiceList ? this.state.practiceList.filter((item) => item.video._id == value) : [];


    if (practiceData.length > 0) {
      if (practiceData[0]['submissionsCount'] > 0) {

        this.setState({ isPracticesSelected: true, selectedPracticeId: value, practiceDetails: practiceData, postworkDetails: practiceData[0] });
        this.tableDetails(practiceData[0]);
      } else {
        this.setState({ isPracticesSelected: true, selectedPracticeId: value });
      }
    }

    // let postworkData = this.state.postWorkList && this.state.postWorkList.postworks ? this.state.postWorkList.postworks.filter((item) => item.postworkId == value) : [];

    // if (postworkData.length > 0) {
    //   this.setState({ postworkId: value, isAssignmentSelected: true, selectedAssignmentId: value, postworkDetails: postworkData });
    //   this.tableDetails(postworkData[0]);
    // }


    // const res = await fetchStudentPracticeProgress({
    //   accessToken,
    //   role,
    //   video_id: value,
    //   student_id: student_id,
    // });
    // if (res) {
    //   this.setTableValue(res, value);
    // }
    // this.setState({ postworkId: value, isPracticesSelected: true });

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
          if (this.state.isAssignmentSelected) {
            if (!GRADED_EXERCISES_IDS.includes(exercise.id)) {
              performance = 0 + '%';
              performanceColorClass = 'badge-md badge-red';
            } else {
              performance = 'Not Reviewed';
            }
          }
        }
      }

      let progressOfExercise = progressByActivityPercentage[exercise.id] ? progressByActivityPercentage[exercise.id] : 0;

      if (GRADED_EXERCISES_IDS.includes(exercise.id) && completedActitiviesList.includes(exercise.id.toString())) {
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

  //       let isCompletedTemp = true; 

  //       if (this.state.isPracticesSelected) {
       
  //         if(!this.state.postworkDetails['scoreByActivity'].hasOwnProperty(exerciseId)){

  //           if(GRADED_EXERCISES_IDS.includes(exerciseId)){
            
  //             if(!this.state.postworkDetails['completedActitiviesList'].includes(exerciseId.toString())){
              
  //               isCompletedTemp= false;
              
  //             } 
  //           }else{
  //             isCompletedTemp= false;
            
  //           }
  //         }

  //       } else {
  //         isCompletedTemp= true;
  //       }

  //       if(isCompletedTemp){

  //         this.setState({ 'isExerciseCompleted': true });

  //         let questions = [];

  //         if (this.state.postworkDetails && this.state.postworkDetails.scoreByActivity && this.state.postworkDetails.scoreByActivity[exerciseId]) {

  //           exerciseScore = this.state.postworkDetails.scoreByActivity[exerciseId];

  //           exerciseScore = exerciseScore + '%';

  //         }

  //         switch (parseInt(exerciseDetails[0].id)) {

  //           case EXERCISE_CLOZE:
  //           case EXERCISE_CHUNK_STORY:

  //             let phrasesCount = exerciseDetails[0]?.phrases?.length;

  //             resultForIndividualReview.push(
  //               {
  //                 id: exerciseId,
  //                 phrases: exerciseDetails[0].phrases,
  //                 options: exerciseDetails[0].options,
  //                 phrasesCount: phrasesCount,
  //                 lastPhrase: exerciseDetails[0].phrases[phrasesCount - 1],
  //                 studentAnswers: this.state.postworkDetails && this.state.postworkDetails.studentAnswers[exerciseId] ?
  //                   this.state.postworkDetails.studentAnswers[exerciseId][0] : [],
  //                 correctAnwsers: exerciseDetails[0].rightOrder
  //               }
  //             )
  //             break;

  //           case EXERCISE_MATCH_VISUAL_DESCRIPTION:
  //           case EXERCISE_TRUE_FALSE:
  //           case EXERCISE_MATCH_AUDIO_DESCRIPTION:
  //           case EXERCISE_FILL_THE_BLANK:
  //           case EXERCISE_FILL_THE_GAPS:


  //             for (let temp = 0; temp < exerciseDetails[0].questions.length; temp++) {

  //               let tempQuestion = exerciseDetails[0].questions[temp].paragraph ? exerciseDetails[0].questions[temp].paragraph : exerciseDetails[0].questions[temp].url ? exerciseDetails[0].questions[temp].url : '';


  //               let actualRightAnswer = '';


  //               if ((exerciseDetails[0].questions[temp].rightAnswer || exerciseDetails[0].questions[temp].rightAnswer == 0) &&
  //                 exerciseDetails[0].questions[temp].answers
  //               ) {
  //                 actualRightAnswer = exerciseDetails[0].questions[temp].answers[exerciseDetails[0].questions[temp].rightAnswer];
  //               } else if (!exerciseDetails[0].questions[temp].answers) {
  //                 actualRightAnswer = exerciseDetails[0].questions[temp].rightAnswer;
  //               }


  //               let actualStubentAnsText = '';


  //               let tempStudentAnswer = this.state.postworkDetails.studentAnswers[exerciseId] ? this.state.postworkDetails.studentAnswers[exerciseId][exerciseDetails[0].questions[temp].id]
  //                 : '';

  //               if ([EXERCISE_MATCH_AUDIO_DESCRIPTION, EXERCISE_FILL_THE_BLANK, EXERCISE_MATCH_VISUAL_DESCRIPTION].includes(exerciseId)) {
  //                 if (tempStudentAnswer || tempStudentAnswer == 0) {
  //                   actualStubentAnsText = exerciseDetails[0].questions[temp].answers[tempStudentAnswer];
  //                 } else {
  //                   actualStubentAnsText = 'No Answer';
  //                 }
  //               } else {

  //                 actualStubentAnsText = tempStudentAnswer != '' || tempStudentAnswer == true || tempStudentAnswer == false ? tempStudentAnswer : 'NO Answer';

  //               }


  //               questions.push({

  //                 id: exerciseId,

  //                 questionId: exerciseDetails[0].questions[temp].id,

  //                 question: tempQuestion,

  //                 studentAnswer: typeof actualStubentAnsText == 'boolean' ? actualStubentAnsText.toString() : actualStubentAnsText,

  //                 rightAnswer: typeof actualRightAnswer == 'boolean' ? this.Capital(actualRightAnswer.toString()) : actualRightAnswer,

  //                 attempt: this.state.postworkDetails.studentAnswers[exerciseId] && this.state.postworkDetails.studentAnswers[exerciseId][exerciseDetails[0].questions[temp].id] != undefined ? true : '',

  //                 isCorrect: this.state.postworkDetails && this.state.postworkDetails.evaluation && this.state.postworkDetails.evaluation[exerciseId] &&
  //                   this.state.postworkDetails.evaluation[exerciseId][exerciseDetails[0].questions[temp].id] !== undefined ? this.state.postworkDetails.evaluation[exerciseId][exerciseDetails[0].questions[temp].id] : ''

  //               });

  //             }

  //             break;

  //           case EXERCISE_RECORD_RETELL_STORY:
  //           case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
  //           case EXERCISE_WRITE_STORY:
  //           case EXERCISE_READ:
  //           case EXERCISE_SHORT_ANSWER:
  //           case EXERCISE_LONG_ANSWER:

  //             if (exerciseDetails[0].hasOwnProperty("note")) {
  //               questions.push({
  //                 id: exerciseId,
  //                 questionId: 0,
  //                 question: exerciseDetails[0].note,
  //                 attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
  //                 isCorrect: '',
  //               });
  //             }

  //             if (exerciseDetails[0].hasOwnProperty("notes")) {
  //               if (Array.isArray(exerciseDetails[0].notes)) {
  //                 questions.push({
  //                   id: exerciseId,
  //                   questionId: exerciseId == EXERCISE_WRITE_STORY ? 0 : exerciseDetails[0].selected,
  //                   question: exerciseDetails[0].notes[exerciseDetails[0].selected],
  //                   attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
  //                   isCorrect: '',
  //                 });
  //               }
  //             }

  //             if (exerciseDetails[0].hasOwnProperty("questions")) {
  //               if (Array.isArray(exerciseDetails[0].questions)) {
  //                 for (let j = 0; j < exerciseDetails[0].questions.length; j++) {
  //                   questions.push({
  //                     id: exerciseId,
  //                     questionId: exerciseDetails[0].questions[j].id,
  //                     question: exerciseDetails[0].questions[j].paragraph,
  //                     attempt: this.state.postworkDetails.studentAnswers[exerciseId] ? true : '',
  //                     isCorrect: '',
  //                   });
  //                 }
  //               }
  //             }

  //             // performance for the exercise
  //             if (this.state.postworkDetails && this.state.postworkDetails.scoreByActivity && this.state.postworkDetails.scoreByActivity[exerciseId] && typeof this.state.postworkDetails.scoreByActivity[exerciseId] === "number") {
  //               exerciseScore = this.state.postworkDetails.scoreByActivity[exerciseId] + '%';
  //             } else {
  //               exerciseScore = this.state.postworkDetails.studentAnswers && this.state.postworkDetails.studentAnswers[exerciseId] ? 'Not Reviewed' : '';
  //             }

  //             break;

  //           default:
  //             break;
  //         }

  //         if (questions.length > 0) {
  //           for (let index = 0; index < questions.length; index++) {
  //             resultForIndividualReview.push({
  //               id: exerciseId,
  //               questionId: questions[index].questionId,
  //               question: questions[index].question ? questions[index].question : 'Question ' + parseInt(index + 1),
  //               studentAnswer: questions[index].studentAnswer ? questions[index].studentAnswer :
  //                 (this.state.postworkDetails && this.state.postworkDetails.studentAnswers && this.state.postworkDetails.studentAnswers[exerciseId] && this.state.postworkDetails.studentAnswers[exerciseId][questions[index].questionId]) ? this.state.postworkDetails.studentAnswers[exerciseId][questions[index].questionId] : 'No Answered',
  //               rightAnswer: questions[index].rightAnswer != '' ? questions[index].rightAnswer : '',
  //               attempt: questions[index]['attempt'],
  //               isCorrect: questions[index]['isCorrect']
  //             });
  //           }
  //         }
  //       }else{

  //         this.setState({ 'isExerciseCompleted': false });
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

  Capital = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  onDragEnd = () => { };


  render() {
    // const [key, setKey] = useState('home');

    const {
      classDetails,
      studentDetails,
      postWorkList,
      practiceList,
      checked,
      // postworkId,
      SingleResult,
      isExerciseCompleted
    } = this.state;
    const { accessToken, role } = this.props;
    return (
      <React.Fragment>
        <div className="px-4 py-5 main-section top-zero">
          <Row className="card px-3 py-5 mx-0 mb-5">
            <Col>
              <h2 className="card-heading  d-flex my-4">
                Student Name:{" "}
                {studentDetails?.firstName + " " + studentDetails?.lastName}
              </h2>
              <h5 className="medium-heading my-4">
                Class Name: {classDetails?.name}
              </h5>
            </Col>
            <Col>
              <Row className="justify-content-between align-items-center">
                <Col md={6}>
                  <Form.Check
                    inline
                    label="Practice"
                    checked={!checked}
                    name="haveAccount"
                    onChange={() => {
                      this.setState({ checked: !this.state.checked, isPracticesSelected: false, isAssignmentSelected: false, TableResult: [] });
                    }}
                    type={"radio"}
                    className="custom-radio"
                  />
                  <Form.Check
                    inline
                    label="Assignment"
                    checked={checked}
                    onChange={() => {
                      this.setState({ checked: !this.state.checked, isPracticesSelected: false, isAssignmentSelected: false, selectedAssignmentId: '', TableResult: [] });
                    }}
                    name="haveAccount"
                    type={"radio"}
                    className="custom-radio"
                  />
                </Col>
                <Col md={4}>
                  {/* <ReactSelect
                    id={"posttype"}
                    className="lit-react-select grey"
                    placeholder="Videos"
                    isClearable
                    options={[
                      {
                        label: "Videos",
                        value: "videos",
                      },
                      {
                        label: "News",
                        value: "news",
                      },
                    ]}
                  /> */}
                </Col>
              </Row>
            </Col>
            {!checked ? (
              <div className="mt-5 card-scroll">
                <Row>
                  {practiceList &&
                    practiceList.map((item) => {
                      return (
                        <Col md="4" onClick={() => {
                          this.setState({ selectedPracticeId: item.video._id });
                          this.practiceTable(item.video._id)
                        }}>
                          <div className={this.state.isPracticesSelected && this.state.selectedPracticeId == item.video._id ? 'card-highlight mb-4' : 'mb-4 card-border-transparent'}>

                            <Card
                              data={item.video}
                              favorites={[]}
                              tick={false}
                              accessToken={accessToken}
                              role={role}
                              from="studentStats"
                              refetch={() => {
                                return true;
                              }}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  {practiceList && practiceList.length == 0 && <div className="card border-0 custom-card assign-outer text-center mt-4 classinfo-tab-outer mb-4">
                    <h1>No Record Found</h1>
                  </div>
                  }
                </Row>
                {/* <ListPagination
                  list={practiceList[0]?.paginationData}
                  prev={(val) => this.getPractice(val)}
                  next={(val) => this.getPractice(val)}
                /> */}
              </div>
            ) : (
              <div className="mt-5 card-scroll">
                <Row>
                  {postWorkList.postworks &&
                    postWorkList?.postworks?.map((item) => {
                      return (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => this.postworkTable(item.postworkId)}
                          className="col-sm-12 col-md-3 col-lg-3  mb-4"
                        >
                          <div className={this.state.selectedAssignmentId == item.postworkId ? 'card-highlight assignment-card card-box-shadow' : 'assignment-card card-box-shadow card-border-transparent'}>
                            <h2 className="medium-heading mb-3 d-flex align-items-start">
                              <img src={videoicon} className="pr-2" alt="" />

                              {/* <img src={video_img} className="mr-2" height="18px" alt="" /> */}

                              {item.title ? item.title : item.videoTitle}
                            </h2>
                            <div className="mb-3">
                              <h3 className="d-inline-flex fw-500">
                                {" "}
                                {item.submissionsCount > 0 ? (
                                  <span className="text-green"> &#9679; Completed</span>
                                ) : item.submissionsCount === 0 &&
                                  new Date(item.dueDate) >=
                                  new Date(new Date().setHours(0, 0, 0, 0)) &&
                                  new Date(item.startDate) >=
                                  new Date(new Date().setHours(0, 0, 0, 0)) ? (
                                  <span className="text-org"> &#9679; Upcoming</span>
                                ) : item.submissionsCount === 0 &&
                                  new Date(item.dueDate) < Date.now() &&
                                  new Date(item.startDate) < Date.now() ? (
                                  <span className="text-red"> &#9679; Past Due</span>
                                ) : (
                                  <></>
                                )}
                              </h3>
                            </div>
                            <div className="mb-3">
                              <span className="pr-3 fw-500 text-dark">Start Date:</span>
                              <span className="d-inline-flex">
                                {" "}
                                <span className="d-inline-flex fw-500">
                                  {" "}
                                  {item.startDate
                                    ? moment(item.startDate).format("DD-MMM-YYYY")
                                    : "----------"}
                                </span>
                              </span>
                            </div>
                            <div className="mb-3">
                              <span className="pr-3 fw-500 text-dark">Due Date:</span>
                              <span className="d-inline-flex">
                                {" "}
                                <span className="d-inline-flex fw-500">
                                  {" "}
                                  {item.dueDate
                                    ? moment(item.dueDate).format("DD-MMM-YYYY")
                                    : "----------"}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                      );
                    })}
                  {postWorkList.postworks && postWorkList.postworks.length == 0 && <div className="card border-0 custom-card assign-outer text-center mt-4 classinfo-tab-outer mb-4">
                    <h1>No Record Found</h1>
                  </div>
                  }
                </Row>
                {/* <ListPagination
                  list={postWorkList}
                  prev={(val) => this.getPostworks(val)}
                  next={(val) => this.getPostworks(val)}
                /> */}
              </div>
            )}
            {this.state.TableResult?.length > 0 &&
              this.state.TableResult?.filter((task) => task !== undefined)?.length ? (
              <Col className="mt-5">
                <div className="card border-0  assign-outer classinfo-tab-outer mb-5">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    className="teach-tabs assign-tabs"
                    onSelect={(k) => this.setState({ key: k })}
                  >
                    <Tab eventKey="home" title="Overall Performance">
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
                                    isExerciseCompleted: true,
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
                          {!isExerciseCompleted &&
                            <p>Student didn't complete this exercises when he submitted</p>}
                          {isExerciseCompleted && SingleResult?.map((result, resultIndex) => {

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
                                      {result.id == EXERCISE_RECORD_RETELL_STORY && result.studentAnswer &&
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
                                    />
                                    {
                                      this.state.reviewError && <span className="error" style={{ color: "#ff0000" }}>Please enter the grade points
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
                          {
                            isExerciseCompleted && SingleResult.length > 0 && <div className="col-auto ml-auto">
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

              (this.state.isPracticesSelected == true || this.state.isAssignmentSelected == true) && (
                <div className="card border-0 custom-card assign-outer text-center mt-4 classinfo-tab-outer mb-4">
                  <h1>Student did not submit this assignment</h1>
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
