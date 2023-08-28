import React, { Fragment } from "react";
import QuestionTitle from "common/src/components/exercisePage/shared/questionTitle";
import QuestionText from "common/src/components/exercisePage/shared/questionText";
import SpanishKeyboard from "common/src/components/shared/spanishKeyboard";
import QuestionsStepper from "../questionsStepper";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Answer =
  ({ rows }) =>
  ({
    getCurrentQuestion,
    getCurrentQuestionIndex,
    getQuestionsCount,
    getStudentAnswer,
    updateStudentAnswer,
    saveProgress,
    saveNotes,
    deleteVocabulary,
    getVideoDetails,
  }) => {
    const { paragraph } = getCurrentQuestion();
    const {
      url: Url,
      grammar,
      vocabulary,
      notes: Notes,
      captionUrl,
      language,
      _id: video_id,
      level,
      category,
      title,
      description,
    } = getVideoDetails();
    const { t } = getCurrentQuestion();
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
            notes: Notes,
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
        <QuestionText
          index={getCurrentQuestionIndex() + 1}
          paragraph={paragraph}
          className="mt-3"
        />
        <div className="form-group my-3 px-4">
          <textarea
            className="form-control"
            style={{
              resize: "none",
              fontSize: "16px",
              "background-color": "#F5F5F5",
              height: "371px",
              padding: "10px",
            }}
            rows="15"
            value={getStudentAnswer() || ""}
            onChange={(e) =>
              updateStudentAnswer({ answer: e.target.value, save: false })
            }
            onBlur={() => saveProgress()}
            placeholder="Write Your Answer..."
          />
          {/* <SpanishKeyboard
          onClick={(letter) => updateStudentAnswer({ answer: `${getStudentAnswer() || ""}${letter}` })}
        /> */}
        </div>
      </Fragment>
    );
  };

export const ShortAnswer = Answer({ rows: 10 });
export const LongAnswer = Answer({ rows: 15 });
