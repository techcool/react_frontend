import React from "react";
import { connect } from "react-redux";
import Exercicses from "common/src/components/exercisePage/reviewPage";
import { fetchPostwork } from "common/src/old-api/postworksActions";
import MicRecorder from "mic-recorder-to-mp3";
import {
  fetchStudentProgress,
  updateStudentProgressEvaluation,
  updateStudentProgressEvaluationNote,
} from "common/src/old-api/progressActions";
import { fetchVideoDetails } from "common/src/old-api/videosActions";
import { fetchUserName } from "common/src/old-api/usersActions";

import {
  MODE_VIEW_ANSWERS,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_WRITE_STORY,
  ACTIVITY_ASSIGNMENT,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
} from "common/src/constants";

import methods from "../practicePage/methods";
import getStudentName from "./getStudentName";
import switchMode from '../assignementPage/switchMode'

class Assignment extends React.Component {
  constructor() {
    super();
    const Mp3Recorder = new MicRecorder({ bitRate: 128 });
    this.state = {
      loading: true,
      id: "",
      exerciseIndex: 0,
      questionIndex: 0,
      studentAnswers: {},
      mode: MODE_VIEW_ANSWERS,
      evaluation: {},
      assignmentStarted: false,
      exercises: [],
      videoDetails: {},
      submissionsCount: 0,
      attempts: 0,
      teacherReview: {},
      activityType: ACTIVITY_ASSIGNMENT,
      studentName: {
        firstName: "",
        lastName: "",
      },
    };

    Object.assign(
      this,
      methods({
        evaluateAnswers: () => { },
        resetProgress: () => { },
        saveProgress: () => { },
        submitAnswers: () => { },
        switchMode: switchMode,
        updateCompletion: () => { },
        updateStudentAnswer: () => { },
      })
    );
    Object.assign(this, { getStudentName });
  }

  async componentDidMount() {
    const { accessToken, role } = this.props;
    const { postwork_id, student_id } = this.props.match.params;
    this.setState({ id: postwork_id, student_id });
    const studentName = await fetchUserName({
      accessToken,
      role,
      user_id: student_id,
    });
    if (studentName) {
      this.setState({ studentName });
    }
    const postwork = await fetchPostwork({ accessToken, role, postwork_id });
    const { video_id, exercises } = postwork;
    const videoDetails = await fetchVideoDetails({
      accessToken,
      role,
      video_id,
    });

    this.setState({ exercises, videoDetails });
    const response = await fetchStudentProgress({
      accessToken,
      role,
      postwork_id,
      student_id,
    });
    const { studentAnswers, evaluation } = response;
    const teacherReview = {};
    teacherReview[EXERCISE_REWRITE_THE_STORY_IN_ENGLISH] =
      evaluation[EXERCISE_REWRITE_THE_STORY_IN_ENGLISH];
    teacherReview[EXERCISE_WRITE_STORY] = evaluation[EXERCISE_WRITE_STORY];
    teacherReview[EXERCISE_RECORD_RETELL_STORY] =
      evaluation[EXERCISE_RECORD_RETELL_STORY];
    teacherReview[EXERCISE_SHORT_ANSWER] = evaluation[EXERCISE_SHORT_ANSWER];
    teacherReview[EXERCISE_LONG_ANSWER] = evaluation[EXERCISE_LONG_ANSWER];

    this.setState({ studentAnswers, evaluation, teacherReview });
    this.setState({ loading: false });
  }

  updateTeacherReview({ exercise_id, score }) {
    let { teacherReview } = this.state;
    let newTeacherReviewState;

    if (score === "") {
      newTeacherReviewState = { ...teacherReview };
      delete newTeacherReviewState[exercise_id];
      this.setState({ teacherReview: newTeacherReviewState });
      return;
    }
    if (isNaN(parseInt(score))) return;
    if (parseInt(score) < 0 || 100 < parseInt(score)) return;
    newTeacherReviewState = Object.assign({}, teacherReview, {
      [exercise_id]: parseInt(score),
    });
    this.setState({ teacherReview: newTeacherReviewState });
  }

  getTeacherReview({ exercise_id }) {
    let { teacherReview } = this.state;
    return teacherReview[exercise_id] !== undefined
      ? teacherReview[exercise_id]
      : " ";
  }

  submitReview() {
    const { accessToken, role } = this.props;
    const { teacherReview, id, student_id } = this.state;

    updateStudentProgressEvaluation({
      accessToken,
      role,
      postwork_id: id,
      student_id,
      evaluation: teacherReview,
    });
    this.props.history.goBack();
  }

  getTeacherNote() {
    const { evaluation } = this.state;
    return evaluation.teacherNote;
  }
  updateTeacherNote(text) {
    const { evaluation } = { ...this.state };
    evaluation.teacherNote = text;
    this.setState({
      evaluation,
    });
  }
  async saveTeacherNote() {
    const { evaluation } = this.state;
    const { teacherNote: note } = evaluation;
    const { accessToken, role } = this.props;
    const { id: postwork_id, student_id } = this.state;
    await updateStudentProgressEvaluationNote({
      accessToken,
      role,
      postwork_id,
      student_id,
      note,
    });
  }

  render() {
    const { mode, loading, exerciseIndex, exercises, questionIndex } = this.state;
    if (loading)
      return (
        <div className="spinner-grow text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    return (
      <div className="px-4 py-5 mt-4 main-section bg-transparent top-zero">
        <Exercicses
          mode={mode}
          student_id={this.state.student_id}
          isFrom="teacher"
          exerciseIndex={exerciseIndex}
          questionIndex={questionIndex}
          totalExercises={exercises.length}
          totalQuestion={this.getCurrentQuestions() ? this.getCurrentQuestions().length : 0}
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
          onPanelItemClick={({ exerciseIndex }) =>
            this.setSelectedExercise({ exerciseIndex })
          }
          isTeacherReveiwing={() => true}
          saveProgress={() => this.saveProgress()}
          updateStudentAnswer={({ answer, completed, question_id, save }) =>
            this.updateStudentAnswer({ answer, completed, question_id, save })
          }
          getStudentAnswer={(...args) => {
            if (args.length === 0) return this.getStudentAnswer({});
            return this.getStudentAnswer(...args);
          }}
          switchMode={(mode) => this.switchMode(mode)}
          getCurrentExerciseEvaluation={() => this.getCurrentExerciseEvaluation()}
          getCurrentExerciseAnswers={() => this.getCurrentExerciseAnswers()}
          updateTeacherReview={({ exercise_id, score }) =>
            this.updateTeacherReview({ exercise_id, score })
          }
          getTeacherReview={({ exercise_id }) =>
            this.getTeacherReview({ exercise_id })
          }
          submitReview={() => this.submitReview()}
          saveNotes={({ notes }) => this.saveNotes({ notes })}
          getDefinition={({ word }) => this.getDefinition({ word })}
          getPronunciation={({ word }) => this.getPronunciation({ word })}
          getTranslation={({ word }) => this.getTranslation({ word })}
          addToVocabulary={({ word, definition }) =>
            this.addToVocabulary({ word, definition })
          }
          deleteVocabulary={(word_id) => this.deleteVocabulary(word_id)}
          getTeacherNote={() => this.getTeacherNote()}
          updateTeacherNote={(text) => this.updateTeacherNote(text)}
          saveTeacherNote={() => this.saveTeacherNote()}
          getStudentName={() => this.getStudentName()}
        />
      </div>
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

export default connect(mapStateToProps, null)(Assignment);
