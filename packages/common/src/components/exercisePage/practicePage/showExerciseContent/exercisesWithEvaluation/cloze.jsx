import React, { Fragment } from 'react';
import Select from 'react-select';
import styledComponents from 'styled-components'
import CompleteActivityButton from 'common/src/components/shared/completeActivityButton';
import { BLUE } from 'common/src/constants';
import { StickyContainer } from 'common/src/components/shared/container';

const Cloze = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getStudentAnswer,
  getCurrentExerciseEvaluation,
  isCurrentExerciseCompleted,
}) => {
  const question = getCurrentQuestion();
  const { phrases, options } = question
  const evaluation = getCurrentExerciseEvaluation();

  let studentAnswers = getStudentAnswer();

  if (!studentAnswers) {
    studentAnswers = Array(options.length).fill(-1);
    updateStudentAnswer({ answer: studentAnswers });
  }
  const updateAnswer = ({ index, value }) => {
    studentAnswers[index] = value
    updateStudentAnswer({ answer: studentAnswers });
  }
  let phrasesCount = phrases.length
  let lastPhrase = phrases[phrasesCount - 1]

  return (
    <div className="d-flex flex-column">
      <div style={{ paddingTop: '20px' }} />
      <div className="form-group my-3 p-4 text-black">
        {
          phrases
            .slice(0, phrasesCount - 1)
            .map(
              (phrase, index) =>
                <Fragment>
                  {phrase.split("\n").length === 1
                  ? phrase
                  : phrase.split("\n").map((p, index) => (
                    <Fragment>
                      {p}
                      {index < phrase.split("\n").length - 1 && <br />}
                    </Fragment>
                  ))}
                  {" "}
                  <SelectContainer
                    {...{
                      options,
                      studentAnswer: studentAnswers[index],
                      updateAnswer: ({ value }) => updateAnswer({ index, value }),
                      right: evaluation && evaluation[index]
                    }}
                  />
                  {" "}
                </Fragment>
            )
        }
        {lastPhrase}
      </div>
      <StickyContainer
        className="d-flex ml-1 px-4"
        style={{zIndex:"0"}}
      >
        <CompleteActivityButton
          onClick={() => updateStudentAnswer({ completed: true })}
          isCompleted={isCurrentExerciseCompleted()}
        />
      </StickyContainer>
    </div>)
}

const Container = styledComponents.div`
width:150px;
display:inline-block;
margin-bottom:3px;
`

const SelectContainer = ({
  options,
  studentAnswer,
  updateAnswer,
  right,
}) =>
  <Container>
    <Select
      classNamePrefix="react-select"
      className="custom-react-select menu-items-select"
      styles={
        {
          container:(base)=>({...base,...(right !== undefined&&{backgroundColor:right? BLUE :'red'}),padding:1,borderRadius:5}),
        }
      }
      isSearchable={false}
      isClearable={false}
      onChange={(option) => updateAnswer({ value: parseInt(option.value) })}
      placeholder='...'
      value={
        (studentAnswer === -1)
          ? null
          : { value: studentAnswer, label: options[studentAnswer] }
      }
      options={options.map((option, index) => ({ value: index, label: option }))}
    />

    {/* <select
      className={classnames({ 'bg-info': right }, { 'bg-danger': right !== undefined && !right })}
      onChange={(e) => updateAnswer({ value: parseInt(e.target.value) })}
    >
      <option
        value={-1}
        selected={studentAnswer === -1}
      >
      </option>
      {
        options.map(((option, index) =>
          <option
            value={index}
            selected={index === studentAnswer}
          >
            {option}
          </option>
        ))
      }
    </select> */}
  </Container>

export default Cloze;
