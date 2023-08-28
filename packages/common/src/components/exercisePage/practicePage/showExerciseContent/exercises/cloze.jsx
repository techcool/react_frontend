import React, { Fragment } from "react";
import Select from "react-select";
import styledComponents from "styled-components";
import CompleteActivityButton from "common/src/components/shared/completeActivityButton";
import { StickyContainer } from "common/src/components/shared/container";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Cloze = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getStudentAnswer,
  isCurrentExerciseCompleted,
  getCurrentQuestionIndex,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
}) => {
  const question = getCurrentQuestion();
  const { phrases, options } = question;

  let studentAnswers = getStudentAnswer();

  if (!studentAnswers) {
    studentAnswers = Array(options.length).fill(-1);
    updateStudentAnswer({ answer: studentAnswers });
  }
  const updateAnswer = ({ index, value }) => {
    studentAnswers[index] = value;
    updateStudentAnswer({ answer: studentAnswers });
  };
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
    <div className="d-flex flex-column px-4">
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
      <div className="form-group my-3 p-4 text-black">
        {
          phrases
            .slice(0, phrasesCount - 1)
            .map((phrase, index) => (
              <Fragment>
                {phrase.split("\n").length === 1
                  ? phrase
                  : phrase.split("\n").map((p, index) => (
                    <Fragment>
                      {p}
                      {index < phrase.split("\n").length - 1 && <br />}
                    </Fragment>
                  ))}{" "}
                <SelectContainer
                  {...{
                    options,
                    studentAnswer: studentAnswers[index],
                    updateAnswer: ({ value }) => updateAnswer({ index, value }),
                  }}
                />{" "}
              </Fragment>
            ))}
        {lastPhrase.split("\n").length === 1
          ? lastPhrase
          : lastPhrase.split("\n").map((p) => (
            <Fragment>
              {p}
              <br />
            </Fragment>
          ))}
      </div>
      <StickyContainer className="d-flex ml-4" style={{ zIndex: "0" }}>
        <CompleteActivityButton
          onClick={() => updateStudentAnswer({ completed: true })}
          isCompleted={isCurrentExerciseCompleted()}
        />
      </StickyContainer>
    </div>
  );
};

const Container = styledComponents.div`
width:150px;
display:inline-block;
margin-bottom:3px;
`;

const SelectContainer = ({ options, studentAnswer, updateAnswer }) => (
  <Container>
    <Select
      classNamePrefix="react-select"
      className="custom-react-select menu-items-select"
      styles={
        {
          container:(base)=>({...base,padding:1,borderRadius:5}),
        }
      }
      isSearchable={false}
      isClearable={false}
      onChange={(option) => updateAnswer({ value: parseInt(option.value) })}
      placeholder="..."
      value={
        studentAnswer === -1
          ? null
          : { value: studentAnswer, label: options[studentAnswer] }
      }
      options={options.map((option, index) => ({
        value: index,
        label: option,
      }))}
    />
  </Container>
);

export default Cloze;
