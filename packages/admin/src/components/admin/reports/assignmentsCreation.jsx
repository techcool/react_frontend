import { DateChart } from "common/src/components/charts/lineChart";
import exportExcel from "common/src/components/helpers/exportExcel";
import { SchooldTypes } from "common/src/constants";
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
            options={ [
              { value: 1, label: "1st" },
              { value: 2, label: "2nd" },
              { value: 3, label: "3rd" },
              { value: 4, label: "4th" },
              { value: 5, label: "5th" },
              { value: 6, label: "6th" },
              { value: 7, label: "7th" },
              { value: 8, label: "8th" },
              { value: 9, label: "9th" },
              { value: 10, label: "10th" },
              { value: 11, label: "11th" },
              { value: 12, label: "12th" },
              { value: -1, label: "Other" }
            ] }
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

const AssignmentCreationReportPage = ({
  schoolType,
  grade,
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  createdAssignments,
  createdAssignmentsDetails,
  teachersDailyStatistics,
  teachersTotalStatistics,
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
      createdAssignments,
      total,
      exportExcel: () => {
        const data = [];
        createdAssignmentsDetails.forEach(detail =>
          (
            detail.assignments.forEach(
              (assignment, index) =>
                data.push({
                  date: index === 0 ? detail.date : "",
                  TeacherName: `${assignment.firstName} ${assignment.lastName}`,
                  Email: assignment.email,
                  ClassName: assignment.className,
                  Grade: assignment.grade,
                  Code: assignment.code
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
            createdAssignments.map((element, index) =>
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
      TableTwoTitle: () =>(
        <h3>
          Active teacher count (Daily) 
        </h3>
      ),
      TableTwoHeader: () =>(
        <tr>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Teachers
          </th>
        </tr>)
      ,
      TableTwoBody: () =>
        <Fragment>
          {
            teachersDailyStatistics.map((element, index) =>
              <tr key={ index }>
                <td>
                  { element.date }
                </td>
                <td>
                  { element.teachersCount }
                </td>
              </tr>
            )
          }
        </Fragment>,
      TableThreeTitle: () =>(
        <h3>
          Active teachers (During the selected period) 
        </h3>
      ),
      TableThreeHeader: () =>(
        <tr>
          <th scope="col">
            First name
          </th>
          <th scope="col">
            Last name
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Count
          </th>
        </tr>)
      ,
      TableThreeBody: () =>
        <Fragment>
          {
            teachersTotalStatistics.sort((a,b)=>b.count-a.count).map((element, index) =>
              <tr key={ index }>
                <td>
                  { element.firstName }
                </td>
                <td>
                  { element.lastName }
                </td>
                <td>
                  { element.email }
                </td>
                <td>
                  { element.count }
                </td>
              </tr>
            )
          }
          <tr>
            <th colSpan="2">
              Total
            </th>
            <th colSpan="2">
              { teachersTotalStatistics.length }
            </th>
          </tr>
        </Fragment>,
      Chart: () => <DateChart isInteractive={ true } data={ createdAssignments } />,
      DetailsTableHeader: () =>
        <tr>
          <th scope="col">
            Date
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
            Class grade
          </th>
          <th scope="col">
            Class code
          </th>
        </tr>
      ,
      DetailsTableBody: () =>
        createdAssignmentsDetails.map(detail =>
          detail.assignments.map((assignment, index) =>
            <tr>
              {
                index === 0 &&
                  <td rowSpan={ detail.assignments.length } >
                    { detail.date }
                  </td>
              }
              <td>{ assignment.firstName } { " " } { assignment.lastName }</td>
              <td>{ assignment.email }</td>
              <td>{ assignment.className }</td>
              <td>{ assignment.grade }</td>
              <td>{ assignment.code }</td>
            </tr>
          )
        )

    } }
  />;

export default AssignmentCreationReportPage;
