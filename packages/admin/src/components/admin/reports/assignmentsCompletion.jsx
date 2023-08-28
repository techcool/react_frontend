import { DateChart } from "common/src/components/charts/lineChart";
import exportExcel from "common/src/components/helpers/exportExcel";
import { SchooldTypes, StudentGrades } from "common/src/constants";
import React, { Fragment } from "react";
import Select from "react-select";
import ReportTemplate from "./reportTemplate";

const Filter = ({
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  exportExcel
}) =>
  <div className="mb-4">
    <form onSubmit={ handleSubmit }>
      <div className="form-row">
        <div className="col">
          <Select
            placeholder="Type"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ SchooldTypes }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "schoolType",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
          />
        </div>
        <div className="col">
          <Select
            placeholder="Grade"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ StudentGrades }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "grade",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
          />
        </div>
        <div className="col">
          <input
            id="startDate"
            type="text"
            placeholder="Start date"
            onFocus={ (e) => e.target.type = "date" }
            onBlur={ (e) => (startDate === "") && (e.target.type = "text") }
            value={ startDate }
            className="form-control"
            onChange={ handleChanges }
          />
        </div>
        <div className="col">
          <input
            id="endDate"
            type="text"
            placeholder="Last date"
            onFocus={ (e) => e.target.type = "date" }
            onBlur={ (e) => (endDate === "") && (e.target.type = "text") }
            value={ endDate }
            className="form-control"
            onChange={ handleChanges }
          />
        </div>
        <div className="col">
          <input
            type="submit"
            className="btn button-blue"
            value="filter"
          />
        </div>
        <div className="col">
          <input
            type="button"
            className="btn button-blue"
            value="Export"
            onClick={ () => exportExcel() }
          />
        </div>
      </div>
    </form>
  </div>;

const AssignmentCompletionReportPage = ({
  schoolType,
  grade,
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  completedAssignments,
  completedAssignmentsDetails,
  total
}) =>
  <ReportTemplate
    { ...{
      schoolType,
      grade,
      startDate,
      endDate,
      handleChanges,
      handleSubmit,
      completedAssignments,
      total,
      exportExcel: () => {
        const data = [];
        completedAssignmentsDetails.forEach(detail =>
          (
            detail.assignments.forEach(
              (assignment, index) =>
                data.push({
                  date: index === 0 ? detail.date : "",
                  StudentName: `${assignment.studentFirstName} ${assignment.studentLastName}`,
                  StudentEmail: assignment.studentEmail,
                  TeacherName: `${assignment.teacherFirstName} ${assignment.teacherLastName}`,
                  TeacherEmail: assignment.teacherEmail,
                  ClassName: assignment.className,
                  ClassGrade: assignment.classGrade,
                  ClassCode: assignment.classCode
                })

            )
          )
        );
        exportExcel(
          {
            csvData: data
          }
        );
      },

      Filter,
      TableHeader: () =>
        <tr>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Assignments
          </th>
        </tr>
      ,
      TableBody: () =>
        <Fragment>
          {
            completedAssignments.map((element, index) =>
              <tr key={ index }>
                <td>
                  { element.x }
                </td>
                <td>
                  { element.y }
                </td>
              </tr>
            )
          }
          <tr>
            <th scope="row">
              Total
            </th>
            <td>
              { total }
            </td>
          </tr>
        </Fragment>,
      Chart: () => <DateChart
        isInteractive={ true }
        data={ completedAssignments }
      />,
      DetailsTableHeader: () =>
        <tr>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Student name
          </th>
          <th scope="col">
            Student Email
          </th>
          <th scope="col">
            Teacher name
          </th>
          <th scope="col">
            Teacher email
          </th>
          <th scope="col">
            Class name
          </th>
          <th scope="col">
            Class Grade
          </th>
          <th scope="col">
            Class code
          </th>
        </tr>,
      DetailsTableBody: () =>
        completedAssignmentsDetails.map(detail =>
          detail.assignments.map((assignment, index) =>
            <tr>
              {
                index === 0 &&
                  <td rowSpan={ detail.assignments.length } >
                    { detail.date }
                  </td>
              }
              <td>{ assignment.studentFirstName } { " " } { assignment.studentLastName }</td>
              <td>{ assignment.studentEmail }</td>
              <td>{ assignment.teacherFirstName } { " " } { assignment.teacherLastName }</td>
              <td>{ assignment.teacherEmail }</td>
              <td>{ assignment.className }</td>
              <td>{ assignment.classGrade }</td>
              <td>{ assignment.classCode }</td>
            </tr>
          )
        )
      
    } }
  />;

export default AssignmentCompletionReportPage;
