import { DateChart } from "common/src/components/charts/lineChart";
import exportExcel from "common/src/components/helpers/exportExcel";
import { ACTIVITY_ASSIGNMENT, ACTIVITY_PRACTICE } from "common/src/constants";
import formatDuration from "format-duration";
import humanizeDuration from "humanize-duration";
import React from "react";
import { Fragment } from "react";
import Select from "react-select";
import ReportTemplate from "./reportTemplate";

const activityTypeOptions= [
  { value: ACTIVITY_ASSIGNMENT, label: "Assignments" },
  { value: ACTIVITY_PRACTICE, label: "Practice" }
];
const gradeOptions=[
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
];

const Filter = ({
  activityType,
  grade,
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  totalTime
}) =>
  <div className="mb-4">
    <form onSubmit={ handleSubmit }>
      <div className="form-row">
        <div className="col">
          <Select
            placeholder="Activity type"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            value={ activityTypeOptions.filter(option=>option.value===activityType)[0] }
            options={ activityTypeOptions }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "activityType",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
          />
        </div>
        {
          !!activityType &&
            <div className="col">
              <Select
                placeholder="Grade"
                classNamePrefix="react-select"
                isClearable={ true }
                isSearchable={ false }
                value={ gradeOptions.filter(option=>option.value===grade)[0] }
                options={ gradeOptions }
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
        }
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
        <input
          type="submit"
          className="btn button-blue"
          value="filter"
        />
        <input
          type="button"
          className="btn button-blue ml-1"
          value="Export"
          onClick={ () => {
            const data = [];
            totalTime.forEach((element, index) =>
              data.push({
                date:element.x,
                duration:humanizeDuration(element.y * 1000,{ units: ["h","m","s"] })
              }));
            exportExcel(
              {
                csvData: data
              }
            );
      
          } }
        />
      </div>
    </form>
  </div>;

const TimeReportPage = ({
  activityType,
  grade,
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  totalTime
}) =>
  <ReportTemplate
    { ...{
      Filter: () =>
        <Filter
          { ...{
            activityType,
            grade,
            startDate,
            endDate,
            handleChanges,
            handleSubmit,
            totalTime
          } }
        />,
      TableHeader: () =>
        <tr>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Time
          </th>
        </tr>,
      TableBody: () =>
        <Fragment>
          <tr>
            <td>
              <span>
                total time
              </span>
            </td>
            <td>
              { humanizeDuration(totalTime.map(e=>e.y).reduce((a,b)=>a+b,0) * 1000,{ units: ["h","m","s"] }) }
            </td>
          </tr>
          {
            totalTime.map((element, index) =>
              <tr key={ index }>
                <td>
                  { element.x }
                </td>
                <td>
                  { humanizeDuration(element.y * 1000,{ units: ["h","m","s"] }) }
                </td>
              </tr>)
          }
        </Fragment>
      ,
      Chart: () => <DateChart
        isInteractive={ true }
        axisLeft={ { format: v => `${formatDuration(v * 1000)}` } }
        data={ totalTime }
        tooltip={ ({ point }) => {
          const { xFormatted, yFormatted } = point.data;
          const label =`date : ${xFormatted}, time : ${formatDuration(yFormatted * 1000)}`;
          return (
            <strong>
              { label }
            </strong>
          );
        } }
      />
    } }
  />;

export default TimeReportPage;
