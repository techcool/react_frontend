import React from "react";
import { connect } from "react-redux";
import Exercicses from "common/src/components/exercisePage/assignementPage";
import { fetchPostwork } from "common/src/old-api/postworksActions";
import { setRedux } from "common/src/old-api/usersActions";
import StartPage from "common/src/components/exercisePage/assignementPage/startPage";
import { fetchVideoDetails } from "common/src/old-api/videosActions"

import { MODE_NORMAL, ACTIVITY_ASSIGNMENT, MODE_VIEW_ANSWERS } from "common/src/constants";

import switchMode from "./switchMode";
import methods from "../practicePage/methods";
import AssignmentDetails from "../assignmentDetails";
import timer from "../practicePage/others/timer";
import audioRecording from "../practicePage/others/audioRecording";
import ConfirmationForStart from "common/src/components/dialogs/confirmationForStart";

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: "",
      exerciseIndex: props.exerciseIndexVal ? props.exerciseIndexVal : 0,
      questionIndex: 0,
      studentAnswers: {},
      mode: MODE_NORMAL,
      evaluation: {},
      assignmentStarted: false,
      exercises: [],
      videoDetails: {},
      submissionsCount: 0,
      attempts: 0,
      activityType: ACTIVITY_ASSIGNMENT,
      showModal: true,
      isThereEndOperation: props.exerciseIndexVal ? true : false,
    };

    Object.assign(this, timer);
    Object.assign(this, audioRecording);
    this.initAudioRecord();
    Object.assign(
      this,
      methods({
        switchMode: switchMode,
      })
    );
  }

  async componentDidMount() {
    let postwork_id, class_id;
    this.props.setRedux({ show: false });
    if (this.props.postwork_id && this.props.class_id) {
      postwork_id = this.props.postwork_id;
      class_id = this.props.class_id;
    } else {
      postwork_id = this.props?.match?.params?.postwork_id;
      class_id = this.props?.match?.params?.class_id;
    }

    this.setState({ id: postwork_id });

    const { accessToken, role, id } = this.props;
    const postwork = await fetchPostwork({ accessToken, role, postwork_id });
    const { video_id, exercises, studentAttempts, videoCaption } = postwork;

    const attempts = this.getAttempt(studentAttempts, class_id);

    const videoDetails = await fetchVideoDetails({
      accessToken,
      role,
      video_id,
    });
    if (!videoCaption) delete videoDetails.captionUrl;

    this.setState({ exercises, attempts: attempts, videoDetails });
    this.fetchProgress({ class_id });
    this.setState({ loading: false });
    if (role === "student") this.startTracking();
  }

  getAttempt = (postwork, class_id) => {
    const { id } = this.props;

    if (postwork) {

      const _class = postwork.filter((c) => c._id === class_id)[0];

      if(_class){

        const student = _class.students.filter((c) => c._id === id)[0];
  
        if(student){
          return student.attempts ? student.attempts :  _class?.attempts;
        }else{
          if (_class?.allStudents) {
            return _class?.attempts;
          }else{
            return null;
          }
        }
      }

      // const _class = postwork.filter((c) => c._id === class_id)[0];

      // if (_class?.allStudents) {
      //   return _class.attempts;
      // } else {
      //   if (_class.students) {
      //     const student = _class.students.filter((c) => c._id === id)[0];
      //     if (student) {
      //       return student.attempts;
      //     }
      //   }
      // }

     // return null;
    }
    return null;
  };

  componentWillUnmount() {
    const { role } = this.props;
    if (role === "student") this.stopTracking();
  }
  ExceriseHtml = () => {
    const {
      mode,
      exerciseIndex,
      exercises,
      questionIndex,
      assignmentStarted,
      attempts,
      submissionsCount,
      loading,
    } = this.state;
    return (
      <Exercicses
        mode={mode}
        isFrom={"student"}
        exerciseIndex={exerciseIndex}
        questionIndex={questionIndex}
        totalExercises={exercises.length}
        totalQuestion={
          this.getCurrentQuestions() ? this.getCurrentQuestions().length : 0
        }
        getVideoDetails={() => this.getVideoDetails()}
        getCurrentExerciseID={() => this.getCurrentExerciseID()}
        getCurrentExercise={() => this.getCurrentExercise()}
        getExercisesIDs={() => this.getExercisesIDs()}
        getProgressPercentage={() => this.getProgressPercentage()}
        isExerciceCompleted={(exerciceID) =>
          this.isExerciceCompleted(exerciceID)
        }
        isCurrentExerciseCompleted={() => this.isCurrentExerciseCompleted()}
        getCurrentQuestion={() => this.getCurrentQuestion()}
        getQuestionsCount={() => this.getQuestionsCount()}
        getCurrentQuestionIndex={() => this.getCurrentQuestionIndex()}
        getCurrentQuestions={() => this.getCurrentQuestions()}
        onBackButtonClick={() => this.moveBackward()}
        onNextButtonClick={() => this.moveForward()}
        onPanelItemClick={({ exerciseIndex, exerciseId }) =>
          (mode === MODE_VIEW_ANSWERS||this.isExerciceCompleted(exerciseId)) &&
          this.setSelectedExercise({ exerciseIndex })
        }
        isPanelItemClickable={(exerciseId) => 
          mode === MODE_VIEW_ANSWERS 
          || this.isExerciceCompleted(exerciseId)
        }
        saveProgress={() => this.saveProgress()}
        updateStudentAnswer={({ answer, completed, question_id, save }) =>
          this.updateStudentAnswer({ answer, completed, question_id, save })
        }
        getStudentAnswer={(...args) => {
          if (args.length === 0) return this.getStudentAnswer({});
          return this.getStudentAnswer(...args);
        }}
        startRecording={() => this.startRecording()}
        stopRecording={() => this.stopRecording()}
        switchMode={(mode) => this.switchMode(mode)}
        getCurrentExerciseEvaluation={() => this.getCurrentExerciseEvaluation()}
        getCurrentExerciseAnswers={() => this.getCurrentExerciseAnswers()}
        getPronunciation={({ word }) => this.getPronunciation({ word })}
        getTranslation={({ word }) => this.getTranslation({ word })}
        addToVocabulary={({ word, definition }) =>
          this.addToVocabulary({ word, definition })
        }
        deleteVocabulary={(word_id) => this.deleteVocabulary(word_id)}
        saveNotes={({ notes }) => this.saveNotes({ notes })}
        getDefinition={({ word }) => this.getDefinition({ word })}
      />
    );
  };
  render() {
    const {
      mode,
      exerciseIndex,
      exercises,
      questionIndex,
      assignmentStarted,
      attempts,
      submissionsCount,
      loading,
    } = this.state;

    if (loading)
      return (
        <div className="spinner-grow text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );

    if (
      !assignmentStarted &&
      !this.props.class_id &&
      this.props.match?.params?.class_id
    )
      return (
        <StartPage
          limit={
            isNaN(attempts - submissionsCount) ? 0 : attempts - submissionsCount
          }
          startPractice={() => this.setState({ assignmentStarted: true })}
        />
      );

    return (
      <>
        {this.props.class_id && this.ExceriseHtml()}

        {!this.props.class_id && this.props.match?.params?.class_id && (
          <AssignmentDetails show={true} setStatus={() => {}}>
            {this.ExceriseHtml()}
          </AssignmentDetails>
        )}

        {!this.props.class_id && mode === MODE_NORMAL && (
          <ConfirmationForStart />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role, id } = user;
  return {
    accessToken,
    role,
    id,
  };
};
export default connect(mapStateToProps, { setRedux })(Assignment);
