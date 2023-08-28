import EvaluateAnswers from './answers/evaluateAnswers'
import FetchProgress from './answers/fetchProgress'
import GetCurrentExerciseAnswers from './answers/getCurrentExerciseAnswers'
import GetCurrentExerciseEvaluation from './answers/getCurrentExerciseEvaluation';
import GetStudentAnswer from './answers/getStudentAnswer'
import ResetProgress from './answers/resetProgress'
import SaveProgress from './answers/saveProgress'
import SubmitAnswers from './answers/submitAnswers'
import SwitchMode from './answers/switchMode'
import UpdateStudentAnswer from './answers/updateStudentAnswer'

import GetCurrentExercise from './exercises/getCurrentExercise'
import GetCurrentExerciseID from './exercises/getCurrentExerciseID'
import GetExercisesIDs from './exercises/getExercisesIDs'
import IsExerciceCompleted from './exercises/isExerciceCompleted'
import SetSelectedExercise from './exercises/setSelectedExercise'
import UpdateCompletion from './exercises/updateCompletion'
import IsCurrentExerciseCompleted from './exercises/isCurrentExerciseCompleted'

import GetCurrentQuestion from './questions/getCurrentQuestion'
import GetCurrentQuestionID from './questions/getCurrentQuestionID'
import GetCurrentQuestionIndex from './questions/getCurrentQuestionIndex'
import GetCurrentQuestions from './questions/getCurrentQuestions'
import GetQuestionsCount from './questions/getQuestionsCount'

import GetProgressPercentage from './template/getProgressPercentage'
import MoveBackward from './template/moveBackward'
import MoveForward from './template/moveForward'

import GetVideoDetails from './others/getVideoDetails';
import SaveNotes from './others/saveNotes';
import GetPronunciation from './language/getPronunciation';
import GetTranslation from './language/getTranslation';
import AddToVocabulary from './language/addToVocabulary';
import DeleteVocabulary from './others/deleteVocabulary';

const methods = (
  {
    evaluateAnswers = EvaluateAnswers,
    fetchProgress = FetchProgress,
    getCurrentExerciseAnswers = GetCurrentExerciseAnswers,
    getCurrentExerciseEvaluation = GetCurrentExerciseEvaluation,
    getStudentAnswer = GetStudentAnswer,
    resetProgress = ResetProgress,
    saveProgress = SaveProgress,
    submitAnswers = SubmitAnswers,
    switchMode = SwitchMode,
    updateStudentAnswer = UpdateStudentAnswer,
    getCurrentExercise = GetCurrentExercise,
    getCurrentExerciseID = GetCurrentExerciseID,
    getExercisesIDs = GetExercisesIDs,
    isExerciceCompleted = IsExerciceCompleted,
    isCurrentExerciseCompleted=IsCurrentExerciseCompleted,
    setSelectedExercise = SetSelectedExercise,
    updateCompletion = UpdateCompletion,
    getCurrentQuestion = GetCurrentQuestion,
    getCurrentQuestionID = GetCurrentQuestionID,
    getCurrentQuestionIndex = GetCurrentQuestionIndex,
    getCurrentQuestions = GetCurrentQuestions,
    getQuestionsCount = GetQuestionsCount,
    getProgressPercentage = GetProgressPercentage,
    moveBackward = MoveBackward,
    moveForward = MoveForward,
    getVideoDetails = GetVideoDetails,
    saveNotes = SaveNotes,
    getPronunciation = GetPronunciation,
    getTranslation=GetTranslation,
    addToVocabulary=AddToVocabulary,
    deleteVocabulary=DeleteVocabulary,
  }
) => {
  return ({
    evaluateAnswers,
    fetchProgress,
    getCurrentExerciseAnswers,
    getCurrentExerciseEvaluation,
    getStudentAnswer,
    resetProgress,
    saveProgress,
    submitAnswers,
    switchMode,
    updateStudentAnswer,
    getCurrentExercise,
    getCurrentExerciseID,
    getExercisesIDs,
    isExerciceCompleted,
    isCurrentExerciseCompleted,
    setSelectedExercise,
    updateCompletion,
    getCurrentQuestion,
    getCurrentQuestionID,
    getCurrentQuestionIndex,
    getCurrentQuestions,
    getQuestionsCount,
    getProgressPercentage,
    moveBackward,
    moveForward,
    getVideoDetails,
    saveNotes,
    getPronunciation,
    getTranslation,
    addToVocabulary,
    deleteVocabulary,
  })
}

export default methods;