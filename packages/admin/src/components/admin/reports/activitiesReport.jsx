import Container, { ContainerWithoutHorizontalSpace } from "common/src/components/shared/container";
import {
  EXERCICES_TITLES_OBJECT,
  EXERCISES_IDS
} from "common/src/constants";
import React from "react";

const ActivitiesReportPage = ({
  date,
  practice,
  assignments,
  handleChanges,
  handleSubmit
}) => {
  let totalPracticeTeachers = 0;
  let totalPracticeStudents = 0;
  let totalAssignments = 0;
  for (let key in practice.teachers)
    totalPracticeTeachers += practice.teachers[key];
  for (let key in practice.students)
    totalPracticeStudents += practice.students[key];
  for (let key in assignments)
    totalAssignments += assignments[key];

  return (
    <Container>
      <div className="mb-4">
        <form onSubmit={ handleSubmit }>
          <div className="form-row">
            <div className="col">
              <input
                id="date"
                type="text"
                placeholder="End date"
                onFocus={ (e) => e.target.type = "date" }
                onBlur={ (e) => (date === "") && (e.target.type = "text") }
                value={ date }
                className="form-control"
                onChange={ handleChanges }
              />
            </div>
            <div className="col">
              <input
                type="submit"
                className="btn button-blue"
                value="Generate report"
              />
            </div>
          </div>
        </form>
      </div>
      <ContainerWithoutHorizontalSpace>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" rowSpan="2">
                Exercise
              </th>
              <th colSpan="3">
                Practice
              </th>
              <th scope="col" rowSpan="2">
                Assignments
              </th>
              <th scope="col" rowSpan="2" className="bg-secondary">
                Total
              </th>
            </tr>
            <tr>
              <th>
                Teachers
              </th>
              <th>
                Students
              </th>
              <th>
                Both (teachers and students)
              </th>
            </tr>
          </thead>
          <tbody>
            {
              EXERCISES_IDS.map((id, index) =>
                <tr key={ index }>
                  <th scope="row">
                    { EXERCICES_TITLES_OBJECT[id] }
                  </th>
                  <td>
                    { practice.teachers[id] || 0 }
                  </td>
                  <td>
                    { practice.students[id] || 0 }
                  </td>
                  <td>
                    {
                      (practice.teachers[id] + practice.students[id])
                      || 0
                    }
                  </td>
                  <td>
                    { assignments[id] || 0 }
                  </td>
                  <td className="bg-secondary">
                    {
                      (
                        assignments[id] +
                        practice.teachers[id] +
                        practice.students[id]
                      ) ||
                      0
                    }
                  </td>
                </tr>
              )
            }
            <tr className="bg-secondary">
              <th scope="row">
                Total
              </th>
              <td>
                { totalPracticeTeachers }
              </td>
              <td>
                { totalPracticeStudents }
              </td>
              <td>
                {
                  totalPracticeTeachers +
                  totalPracticeStudents
                }
              </td>
              <td>
                { totalAssignments }
              </td>
              <td>
                {
                  totalAssignments +
                  totalPracticeTeachers +
                  totalPracticeStudents
                }
              </td>
            </tr>
          </tbody>
        </table>
      </ContainerWithoutHorizontalSpace>
    </Container>
  );
};
export default ActivitiesReportPage;
