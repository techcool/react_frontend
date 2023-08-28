import { DateChart } from "common/src/components/charts/lineChart";
import exportExcel from "common/src/components/helpers/exportExcel";
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

const CreatedClassesPage = ({
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  createdClasses,
  createdClassesDetails,
  teachersDailyStatistics,
  teachersTotalStatistics,
  total
}) =>
  <ReportTemplate
    { ...{
      startDate,
      endDate,
      handleChanges,
      handleSubmit,
      exportExcel: () => {
        const data = [];
        createdClassesDetails.forEach(detail =>
          (
            detail.classes.forEach(
              (cls, index) =>
                data.push({
                  date: index === 0 ? detail.date : "",
                  TeacherName: `${cls.firstName} ${cls.lastName}`,
                  email: cls.email,
                  className: cls.name,
                  grade: cls.grade,
                  code: cls.code
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
            Classes
          </th>
          <th scope="col">
            Removed
          </th>
        </tr>
      ,
      TableBody: () =>
        <Fragment>
          {
            createdClasses.map((element, index) =>
              <tr key={ index }>
                <td>
                  { element.x }
                </td>
                <td>
                  { element.y }
                </td>
                <td>
                  { element.deleted }
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
            <td>
              { createdClasses.reduce((sum, current) => sum + current.deleted, 0) }
            </td>
          </tr>
        </Fragment>,
      TableTwoTitle: () => (
        <h3>
          Active teacher count (Daily)
        </h3>
      ),
      TableTwoHeader: () => (
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
      TableThreeTitle: () => (
        <h3>
          Active teachers (During the selected period)
        </h3>
      ),
      TableThreeHeader: () => (
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
            teachersTotalStatistics.sort((a, b) => b.count - a.count).map((element, index) =>
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
      Chart: () => <DateChart data={ createdClasses } />,
      DetailsTableHeader: () =>
        <tr>
          <th scope="row">
            Date
          </th>
          <th scope="row">
            Teacher name
          </th>
          <th scope="row">
            Teacher's email
          </th>
          <th>
            Class name
          </th>
          <th>
            Class grade
          </th>
          <th>
            Class code
          </th>
          <th>
            Is removed ?
          </th>
        </tr>,
      DetailsTableBody: () =>
        createdClassesDetails.map(detail =>
          detail.classes.map((cls, index) =>
            <tr>
              {
                index === 0 &&
                  <td rowSpan={ detail.classes.length } >
                    { detail.date }
                  </td>
              }
              <td>
                { cls.firstName } { " " } { cls.lastName }
              </td>
              <td>
                { cls.email }
              </td>
              <td>
                { cls.name }
              </td>
              <td>
                { cls.grade }
              </td>
              <td>
                { cls.code }
              </td>
              <td>
                { cls.deleted && "removed" }
              </td>
            </tr>
          )
        )
    } }
  />;

export default CreatedClassesPage;
