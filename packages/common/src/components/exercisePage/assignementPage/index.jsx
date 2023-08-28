import React from 'react';
import { ExercicsePageTemplate } from '../practicePage/pageTemplate/exercicsePageTemplate';
import { ShowExerciseContent } from './showExerciseContent'

const Exercicses = ({
  mode,
  exerciseIndex,
  totalExercises,
  ...methods
}) =>
  <ExercicsePageTemplate
    {...{
      exerciseIndex,
      totalExercises,
      mode,
      ...methods,
    }}
  >
    <ShowExerciseContent
      {...{
        mode, ...methods
      }}
    />
  </ExercicsePageTemplate>

export default Exercicses;
