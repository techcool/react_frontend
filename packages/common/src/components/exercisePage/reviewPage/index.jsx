import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { ExercicsePageTemplate } from '../practicePage/pageTemplate/exercicsePageTemplate';
import ShowExerciseContent from './showExerciseContent'

const Exercicses = ({
  exerciseIndex,
  totalExercises,
  student_id,
  ...methods
}) =>
  <Fragment>
    <ShowStudentName
      {...{
        student_id,
        ...methods
      }}
    />
    <ExercicsePageTemplate
      {...{
        exerciseIndex,
        totalExercises,
        ...methods,
        AdditionalPanelItems: AdditionalPanelItems({ ...methods }),
      }}
    >
      <ShowExerciseContent
        {...{
          ...methods
        }}
      />
    </ExercicsePageTemplate>
  </Fragment>

const ShowStudentName = ({ student_id, getStudentName }) => {
 
  const { firstName = '', lastName = '' } = getStudentName();
  let studentName = Capital(firstName) + ' ' + Capital(lastName);
  return (
    <div className="mx-2" style={{ marginTop: '-40px', marginBottom: '40px' }}>
      <span className="font-weight-bold">Student's name : </span>
      <Link to={`/teacher/student/${student_id}`} title={studentName}>{studentName}</Link>
    </div>
  )
}
const Capital = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
const AdditionalPanelItems = ({ submitReview }) => () =>
  <Fragment>
    <div
      className="btn primary-btn mt-4"
      style={{ maxWidth: '100%' }}
      onClick={() => submitReview()}
    >
      Submit the review
    </div>
  </Fragment>

export default Exercicses