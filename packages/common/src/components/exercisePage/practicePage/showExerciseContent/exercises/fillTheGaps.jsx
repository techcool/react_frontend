import React, { Fragment, useState, useEffect } from "react";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
import QuestionTitle from "common/src/components/exercisePage/shared/questionTitle";
import FillTheGapQuestion from "common/src/components/exercisePage/shared/fillTheGapQuestion";
import SpanishKeyboard from "common/src/components/shared/spanishKeyboard";
import QuestionsStepper from "../questionsStepper";

const FillTheGaps = ({
  getVideoDetails,
  getCurrentQuestion,
  getQuestionsCount,
  getCurrentQuestionIndex,
  updateStudentAnswer,
  getStudentAnswer,
  saveNotes,
  deleteVocabulary,
  saveProgress,
}) => {
  const {
    url,
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
  const { t, paragraph } = question;
  const [fisrtParagraphPart, secondParagraphPart] = paragraph.split("____");

  return (
    <Fragment>
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
          level,
          category,
          title,
          description,
          saveNotes,
          language,
          t,
          highlight: [
            {
              time: t,
              text: `Question`,
            },
          ],
          deleteVocabulary,
          showCategory:false,
          showVideoTitleAndDescription:false,
        }}
      />
      <QuestionsStepper
        activeStep={getCurrentQuestionIndex()}
        totalSteps={getQuestionsCount()}
        className="question-stepper"
      />
      {/* <QuestionTitle
      text={`Question ${getCurrentQuestionIndex() + 1} of ${getQuestionsCount()}`}
    /> */}
      <div className="text-center">
        <FillTheGapQuestion
          index={getCurrentQuestionIndex() + 1}
          text1={fisrtParagraphPart}
          text2={secondParagraphPart}
          value={getStudentAnswer() || ""}
          onChange={(e) =>
            updateStudentAnswer({ answer: e.target.value, save: false })
          }
          onBlur={() => saveProgress()}
        />
        <SpanishKeyboard
          onClick={(letter) =>
            updateStudentAnswer({
              answer: `${getStudentAnswer() || ""}${letter}`,
              save:true,
            })
          }
        />
      </div>
    </Fragment>
  );
};

export default FillTheGaps;
