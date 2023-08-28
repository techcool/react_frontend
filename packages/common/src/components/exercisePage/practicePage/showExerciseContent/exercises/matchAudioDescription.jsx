import React, { Fragment } from "react";
import RadioBox from "common/src/components/Forms/radioBox";
import QuestionTitle from "common/src/components/exercisePage/shared/questionTitle";
import hashString from "hash-string";
import QuestionsStepper from "../questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const MatchAudioDescription = ({
  getVideoDetails,
  getCurrentQuestion,
  getQuestionsCount,
  getCurrentQuestionIndex,
  updateStudentAnswer,
  getStudentAnswer,
  saveNotes,
  deleteVocabulary,
}) => {
  const {
    url: Url,
    grammar,
    vocabulary,
    notes,
    captionUrl,
    language,
    _id: video_id,
    level,
    category,
    title,
    description,
  } = getVideoDetails();
  const question = getCurrentQuestion();
  const { url, answers, t } = question;
  return (
    <Fragment>
      <VideoScreenWithButtons
        key={`key-${getCurrentQuestionIndex()}`}
        hide={true}
        {...{
          url: Url,
          captionUrl,
          grammar,
          vocabulary,
          notes,
          video_id,
          level,
          category,
          title,
          description,
          saveNotes,
          language,
          t,
          highlight: [
            {
              time: t || 0,
              text: `Question`,
            },
          ],
          deleteVocabulary,
        }}
      />
      {/* <QuestionTitle
        style={{
          marginTop: '50px'
        }}
        text={`Question ${getCurrentQuestionIndex() + 1} of ${getQuestionsCount()}`}
      /> */}
      <div className="text-center mt-4 h4 fw-600">Listening Choice </div>
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      <div className="text-center mt-4">
        <audio className="audio" key={`key-${hashString(url)}`} controls>
          <source src={url} />
        </audio>
      </div>
      <div className="my-3 px-4 text-center">
        {answers.map((answer, index) => (
          <RadioBox
            onChange={() => updateStudentAnswer({ answer: index })}
            checked={getStudentAnswer() === index}
            label={answer}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default MatchAudioDescription;
