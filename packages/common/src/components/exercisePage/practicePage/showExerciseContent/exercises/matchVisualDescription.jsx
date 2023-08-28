import React, { Fragment } from "react";
import RadioBox from "common/src/components/Forms/radioBox";
import Image from "common/src/components/shared/VideoActiviesImges";
import QuestionTitle from "common/src/components/exercisePage/shared/questionTitle";
import QuestionsStepper from "../questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const MatchVisualDescription = ({
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
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
      />
      <div className="row px-4">
        <div className="col-md-5">
          <Image src={url} imgClass={"w-100"} />
        </div>
        <div className="col-md-7 pl-md-0">
          <div className="my-3 px-4">
            {answers.map((answer, index) => (
              <RadioBox
                onChange={() => updateStudentAnswer({ answer: index })}
                checked={getStudentAnswer() === index}
                label={answer}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MatchVisualDescription;
