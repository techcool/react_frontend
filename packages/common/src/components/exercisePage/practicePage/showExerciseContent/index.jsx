import React, { Fragment } from 'react';
import ShowExercicesWithoutAnswers from './withoutAnswers'
import ShowExercicesWithEvaluation from './withEvaluation'
import ShowExercicesWithAnswers from './withAnswers'
import {
  MODE_NORMAL,
  MODE_REVIEW_QUESTION,
  MODE_VIEW_ANSWERS,
} from 'common/src/constants'
const ShowExerciseContent = ({
  mode,
  ...methods
}) => {
  switch (mode) {
    case MODE_NORMAL:
      return <ShowExercicesWithoutAnswers
        {...methods}
      />
    case MODE_REVIEW_QUESTION:
      return <ShowExercicesWithEvaluation
        {...methods}
      />
    case MODE_VIEW_ANSWERS:
      return <ShowExercicesWithAnswers
        {...methods}
      />
    default:
      return <Fragment/>;
  }

}


export { ShowExerciseContent }