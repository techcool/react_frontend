import { DateChart } from "common/src/components/charts/lineChart";
import { SchooldTypes } from "common/src/constants";
import React, { Fragment } from "react";
import Select from "react-select";
import ReportTemplate from "./reportTemplate";

const Filter = ({
  schoolType,
  schoolDistrict,
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
            placeholder="Role"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              { value: "teacher", label: "Teachers" },
              { value: "tutor", label: "Tutors" },
              { value: "student", label: "Students" }
            ] }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "role",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
          />
        </div>

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
        {
          schoolType === "public"
          && <div className="col">

            <input
              id="schoolDistrict"
              value={ schoolDistrict }
              onChange={ handleChanges }
              placeholder="District"
              type="type"
              className="form-control"
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
      </div>
    </form>
  </div>;

const RegistrationsReportPage = ({
  role,
  schoolType,
  schoolDistrict,
  handleChanges,
  startDate,
  endDate,
  handleSubmit,
  registrations,
  total
}) =>
  <ReportTemplate
    { ...{
      role,
      schoolType,
      schoolDistrict,
      handleChanges,
      startDate,
      endDate,
      handleSubmit,
      registrations,
      total,
      Filter,
      TableHeader: () =>
        <tr>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Registrations
          </th>
        </tr>,
      TableBody: () => 
        <Fragment>
          {
            registrations.map((element, index) =>
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
      Chart: () => <DateChart data={ registrations } />
    } }
  />;

export default RegistrationsReportPage;
