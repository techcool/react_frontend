import React, { Fragment } from 'react';
import { VideoScreenWithButtons } from 'common/src/components/shared/others/screenWithButtons';
import ActivityEvaluationMsg from 'common/src/components/exercisePage/shared/activityEvaluationMsg.jsx';
import FillTheGapQuestion from 'common/src/components/exercisePage/shared/fillTheGapQuestion';
import SpanishKeyboard from 'common/src/components/shared/spanishKeyboard';
import QuestionsStepper from '../questionsStepper';

const FillTheGaps = ({
  getVideoDetails,
  getCurrentQuestions,
  updateStudentAnswer,
  getStudentAnswer,
  getCurrentExerciseEvaluation,
  saveNotes,
  deleteVocabulary,
  saveProgress,
  getCurrentQuestion,
  getCurrentQuestionIndex,
  getQuestionsCount,

}) => {
  const { url, grammar, vocabulary, notes, captionUrl, language, _id: video_id, level,
    category,
    title,
    description } = getVideoDetails();
  // const questions = getCurrentQuestions();
  const question = getCurrentQuestion();
  const evaluation = getCurrentExerciseEvaluation();

  return <Fragment>
    <VideoScreenWithButtons
      {...{
        url,
        captionUrl,
        grammar,
        vocabulary,
        language,
        notes,
        video_id,
        level,
        category,
        title,
        description,
        saveNotes,
        deleteVocabulary,
        // highlight: questions.map((question, index) => {
        //   return ({
        //     time: question.t,
        //     text: `Question ${index + 1}`
        //   })
        // }),
        highlight: [
          {
            time: question.t,
            text: `Question ${getCurrentQuestionIndex() + 1}`
          }
        ],
        showCategory:false,
        showVideoTitleAndDescription:false,
      }}
    />
    <div className='pt-2'>
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      {/* {
        questions.map(
          (question, index) => */}
      <div className="text-center">
        <Question
          index={getCurrentQuestionIndex() + 1}
          question={question}
          evaluation={evaluation && evaluation[question.id]}
          studentAnswer={getStudentAnswer({ question_id: question.id })||''}
          updateStudentAnswer={({ answer,save=false }) => updateStudentAnswer({
            question_id: question.id,
            answer,
            save,
          })}
          saveProgress={saveProgress}
        />
      </div>
      {/* )
      } */}
    </div>
  </Fragment>
}

const Question = ({
  index,
  question,
  evaluation,
  studentAnswer,
  updateStudentAnswer,
  saveProgress
}) => {
  const [fisrtParagraphPart, secondParagraphPart] = question.paragraph.split('____')
  return (
    <Fragment>
      <FillTheGapQuestion
        index={index}
        text1={fisrtParagraphPart}
        text2={secondParagraphPart}
        value={studentAnswer}
        onChange={(e) => updateStudentAnswer({ answer: e.target.value })}
        onBlur={() => saveProgress()}
      />
      <SpanishKeyboard
        onClick={(letter) => updateStudentAnswer({ 
          answer: `${studentAnswer || ""}${letter}`,
          save:true
        })}
      />

      <ActivityEvaluationMsg evaluation={evaluation} />
    </Fragment>
  )
}
export default FillTheGaps;