import React from 'react';
import { connect } from 'react-redux';

import ExercisesPage from 'common/src/components/exercisePage/practicePage';
import {
  fetchPracticeExercises,
} from 'common/src/old-api/videosActions';

import { fetchVideoDetails } from 'common/src/old-api/videosActions';

import {
  MODE_NORMAL,
  ACTIVITY_PRACTICE,
} from 'common/src/constants'

import methods from './methods'
import timer from './others/timer';
import audioRecording from './others/audioRecording';

class Practice extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      id: '',
      exerciseIndex: 0,
      questionIndex: 0,
      studentAnswers: {},
      mode: MODE_NORMAL,
      evaluation: {},
      exercises: [],
      videoDetails: {},
      activityType: ACTIVITY_PRACTICE,
    }

    Object.assign(this, timer);
    Object.assign(this,audioRecording);
    this.initAudioRecord();
    Object.assign(this, methods({}));
  }

  async componentDidMount() {
    const { accessToken, role } = this.props
    const { video_id } = this.props.match.params
    this.setState({ id: video_id })

    const videoDetails = await fetchVideoDetails({ accessToken, role, video_id })
    this.setState({ videoDetails })

    const exercises = await fetchPracticeExercises({ accessToken, role, video_id })
    this.setState(
      { exercises },
      this.fetchProgress
    )

    this.setState({ loading: false })

    if (role === 'student')
      this.startTracking()
  }

  componentWillUnmount() {
    const { role } = this.props
    if (role === 'student')
      this.stopTracking()
  }

  render() {
    const { mode,exerciseIndex,questionIndex,exercises,loading } = this.state
    if (loading)
      return (
        <div className="spinner-grow text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    return (
      <ExercisesPage
        mode={mode}
        isFrom='practice'
        exerciseIndex={exerciseIndex}
        questionIndex={questionIndex}
        totalExercises={exercises.length}
        totalQuestion={this.getCurrentQuestions() ? this.getCurrentQuestions().length:0 }
        getVideoDetails={() => this.getVideoDetails()}
        getCurrentExerciseID={() => this.getCurrentExerciseID()}
        getCurrentExercise={() => this.getCurrentExercise()}
        getExercisesIDs={() => this.getExercisesIDs()}
        getProgressPercentage={() => this.getProgressPercentage()}
        isExerciceCompleted={(exerciceID) => this.isExerciceCompleted(exerciceID)}
        isCurrentExerciseCompleted={()=>this.isCurrentExerciseCompleted()}
        getCurrentQuestion={() => this.getCurrentQuestion()}
        getQuestionsCount={() => this.getQuestionsCount()}
        getCurrentQuestionIndex={() => this.getCurrentQuestionIndex()}
        getCurrentQuestions={() => this.getCurrentQuestions()}
        saveProgress={()=> this.saveProgress()}

        onBackButtonClick={() =>
          this.moveBackward()}
        onNextButtonClick={() =>
          this.moveForward()}
        onPanelItemClick={({exerciseIndex}) => this.setSelectedExercise({ exerciseIndex })}
        
        updateStudentAnswer={({ answer, completed, question_id,save }) =>
          this.updateStudentAnswer({ answer, completed, question_id,save })}
        getStudentAnswer={(...args) => {
          if (args.length === 0)
            return this.getStudentAnswer({})
          return this.getStudentAnswer(...args)
        }}

        startRecording={() => this.startRecording()}
        stopRecording={() => this.stopRecording()}

        switchMode={(mode) => this.switchMode(mode)}
        getCurrentExerciseEvaluation={() => this.getCurrentExerciseEvaluation()}
        getCurrentExerciseAnswers={() => this.getCurrentExerciseAnswers()}
        saveNotes={({ notes }) => this.saveNotes({ notes })}
        getPronunciation={({ word }) => this.getPronunciation({ word })}
        getTranslation={({ word }) => this.getTranslation({ word })}
        addToVocabulary={({ word, definition }) => this.addToVocabulary({ word, definition })}
        deleteVocabulary={(word_id) => this.deleteVocabulary(word_id)}
      />
    )
  }
}

const mapStateToProps = state => {
  const { user: { accessToken, role } } = state
  return { accessToken, role, }
}

export default connect(mapStateToProps, null)(Practice)