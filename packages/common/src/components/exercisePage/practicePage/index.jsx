import React, { Fragment } from 'react';
import Select from 'react-select';
import classnames from 'classnames'
import { ExercicsePageTemplate } from './pageTemplate/exercicsePageTemplate';
import { ShowExerciseContent } from './showExerciseContent'
import { MODE_VIEW_ANSWERS, MODE_REVIEW_QUESTION, MODE_NORMAL } from 'common/src/constants';
const Exercicses = ({
  mode,
  isFrom,
  ...methods
}) =>
  <ExercicsePageTemplate
    {...{
      ...methods,
      mode,
      isFrom,
      AdditionalPanelItems: AdditionalPanelItems({ ...methods }),
    }}
  >
    <ShowExerciseContent
      {...{
        mode, ...methods
      }}
    />
  </ExercicsePageTemplate>

const AdditionalPanelItems = ({ switchMode }) =>
  class extends React.Component {
    constructor() {
      super();
      this.state = { mode: null }
    }
    render() {
      const { mode } = this.state
      return (
        <Fragment>
          <Select
            className='mb-2 mt-3'
            isClearable={true}
            isSearchable={false}
            placeholder='&nbsp;&nbsp;Action'
            classNamePrefix='react-select'
            options={[
              { value: MODE_REVIEW_QUESTION, label: 'Submit & Check My Answers' },
              { value: MODE_VIEW_ANSWERS, label: 'Submit & Check Correct Answers' },
              { value: MODE_NORMAL, label: 'Redo Postwork' },
            ]}
            onChange={
              (option) => this.setState({
                mode: (!option) ? null : option.value
              })
            }
          />
          <button
            className={
              classnames(
                'btn', 'w-100',
                { 'button-gray': mode === null },
                { 'button-blue': mode !== null },
              )
            }
            style={{ maxWidth: '100%' }}
            onClick={() => {
              if (mode === null) return
              switchMode(mode)
            }}
          >
            Run
          </button>
        </Fragment >
      )
    }
  }

export default Exercicses;
