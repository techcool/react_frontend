import React, { Fragment } from 'react';

import { VideoScreenWithButtons } from 'common/src/components/shared/others/screenWithButtons';
import OptionBox from 'common/src/components/Forms/optionBox';
import QuestionText from 'common/src/components/exercisePage/shared/questionText';
import QuestionTitle from 'common/src/components/exercisePage/shared/questionTitle';
import QuestionsStepper from '../questionsStepper';

const FillTheBlank = ({
  getVideoDetails,
  getCurrentQuestion,
  getQuestionsCount,
  getCurrentQuestionIndex,
  updateStudentAnswer,
  getStudentAnswer,
  saveNotes,
  deleteVocabulary,
}) => {
  const { url, grammar, vocabulary, notes, captionUrl, language, _id: video_id, level, category, title, description, } = getVideoDetails();
  const question = getCurrentQuestion();
  const { t, paragraph, answers } = question
  return <Fragment>
    <VideoScreenWithButtons
      key={`key-${getCurrentQuestionIndex()}`}
      // hide={true}
      {...{
        url,
        captionUrl,
        grammar,
        vocabulary,
        notes,
        video_id,
        saveNotes,
        language,
        level,
        category,
        title,
        description,
        t,
        highlight: [{
          time: t,
          text: `Question`
        }],
        deleteVocabulary,
        showCategory:false,
        showVideoTitleAndDescription:false,
      }}
    />
    <QuestionsStepper
      activeStep={getCurrentQuestionIndex()}
      totalSteps={getQuestionsCount()}
    />
    {/* <QuestionTitle
      text={`Question ${getCurrentQuestionIndex() + 1} of ${getQuestionsCount()}`}
    /> */}
    <QuestionText
      index={getCurrentQuestionIndex() + 1}
      paragraph={paragraph}

    />
    <div className="mt-3 px-4">
      {
        answers.map(
          (answer, index) =>
            <OptionBox
              key={index}
              checked={getStudentAnswer() === index}
              onClick={() => updateStudentAnswer({ answer: index })}
              label={answer}
            />
        )
      }
    </div>
  </Fragment>
}


export default FillTheBlank;