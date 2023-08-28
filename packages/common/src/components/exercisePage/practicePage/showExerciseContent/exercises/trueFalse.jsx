import React, { Fragment } from "react";
import RadioBox from "common/src/components/Forms/radioBox";
import QuestionTitle from "common/src/components/exercisePage/shared/questionTitle";
import hashString from "hash-string";
import QuestionsStepper from "../questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const TrueFalse = ({
  getCurrentQuestion,
  getQuestionsCount,
  getCurrentQuestionIndex,
  updateStudentAnswer,
  getStudentAnswer,
  getVideoDetails,
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
  const { url, t } = question;
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
      <div className="text-center mt-4 h4 fw-600">True or False</div>
      {/* <QuestionTitle
        style={{
          marginTop: '50px'
        }}
        text={`Question ${getCurrentQuestionIndex() + 1} of ${getQuestionsCount()}`}
      /> */}
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
        className="mb-4"
      />
      <div className="text-center mt-4">
        <audio className="audio" key={`key-${hashString(url)}`} controls>
          <source src={url} />
        </audio>
      </div>
      <div className="my-3 d-flex justify-content-center px-4">
        <RadioBox
          onChange={() => updateStudentAnswer({ answer: true })}
          checked={getStudentAnswer() === true}
          label="True"
        />
        <RadioBox
          onChange={() => updateStudentAnswer({ answer: false })}
          checked={getStudentAnswer() === false}
          label="False"
        />
      </div>
    </Fragment>
  );
};
export default TrueFalse;
