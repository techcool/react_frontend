import React, { Fragment } from "react";
import { BLUE } from "common/src/constants";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Cloze = ({
  getCurrentQuestion,
  getStudentAnswer,
  getCurrentExerciseAnswers,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
  getCurrentQuestionIndex,
}) => {
  const question = getCurrentQuestion();
  const { phrases, options } = question;
  const correctAnwsers = getCurrentExerciseAnswers() || [];
  let studentAnswers = getStudentAnswer() || [];
  let phrasesCount = phrases.length;
  let lastPhrase = phrases[phrasesCount - 1];
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
    <div className="d-flex flex-column">
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
      <div style={{ paddingTop: "20px" }} />
      <div className="form-group my-3 p-4">
        {phrases.slice(0, phrasesCount - 1).map((phrase, index) => (
          <Fragment>
            {phrase.split("\n").length === 1
              ? phrase
              : phrase.split("\n").map((p, index) => (
                <Fragment>
                  {p}
                  {index < phrase.split("\n").length - 1 && <br />}
                </Fragment>
              ))}

            {
              <Fragment>
                {" "}
                {studentAnswers[index] !== -1 &&
                  studentAnswers[index] !== correctAnwsers[index] ? (
                  <span
                    style={{ textDecoration: "line-through", color: "#f00" }}
                  >
                    {options[studentAnswers[index]]}
                  </span>
                ) : studentAnswers[index] !== correctAnwsers[index] ? (
                  <span
                    className="font-weight-bold"
                    style={{ textDecoration: "underline", color: "#000" }}
                  >
                    not anwsered
                  </span>
                ) : null}{" "}
              </Fragment>
            }{" "}
            <span
              className="font-weight-bold"
              style={{
                color: BLUE,
              }}
            >
              {options[correctAnwsers[index]]}
            </span>{" "}
          </Fragment>
        ))}
        {lastPhrase}
      </div>
    </div>
  );
};

export default Cloze;
