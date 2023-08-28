import { DateChart } from "common/src/components/charts/lineChart";
import React, { Fragment } from "react";
import Select from "react-select";
import ReportTemplate from "./reportTemplate";

const statusOptions= [
  { value:"inprogress",label:"In-progress" },
  { value:"completed",label:"Completed" }
];
const Filter = ({
  status,
  startDate,
  endDate,
  handleChanges,
  handleSubmit
}) =>
  <div className="mb-4">
    <form onSubmit={ handleSubmit }>
      <div className="form-row">
        <div className="col">
          <Select
            placeholder="Type"
            classNamePrefix="react-select"
            isClearable={ false }
            isSearchable={ false }
            value={ statusOptions.filter(option=>option.value===status)[0] }
            options={ statusOptions }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "status",
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
        <input
          type="submit"
          className="btn button-blue"
          value="filter"
        />
      </div>
    </form>
  </div>;


const PracticeReport = ({
  status,
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  data,
  total
}) =>
  <ReportTemplate
    { ...{
      status,
      startDate,
      endDate,
      handleChanges,
      handleSubmit,
      data,
      total,
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
            data.map((element, index) =>
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
        data={ data }
      />
    } }
  />;


export default PracticeReport;
