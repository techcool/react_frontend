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
            placeholder="Role"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              { value: "teacher", label: "Teachers" },
              { value: "tutor", label: "Tutors" },
              { value: "student", label: "Students" }
            ] }
            onChange={ option => {
              handleChanges(
                {
                  target: {
                    id: "role",
                    value: (option !== null) ? option.value : ""
                  }
                }
              );
            }
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

const LoginsReportPage = ({
  schoolType,
  role,
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  logins,
  loginDetails,
  total
}) =>
  <ReportTemplate
    { ...{
      schoolType,
      role,
      startDate,
      endDate,
      handleChanges,
      handleSubmit,
      logins,
      total,
      exportExcel: () => {
        const data = [];
        loginDetails.forEach(detail =>
          (
            detail.users.forEach(
              (user, index) =>
                data.push({
                  date: index === 0 ? detail.date : "",
                  name: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                  role: user.role
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
            Logins
          </th>
        </tr>,
      TableBody: () =>
        <Fragment>
          {
            logins.map((element, index) =>
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
      Chart: () => <DateChart isInteractive={ true } data={ logins } />,
      DetailsTableHeader: () =>
        <tr>
          <th scope="row">
            Date
          </th>
          <th scope="row">
            Name
          </th>
          <th scope="row">
            Email
          </th>
          <th scope="row">
            Role
          </th>
        </tr>
      ,
      DetailsTableBody: () =>
        loginDetails.map(detail =>
          detail.users.map((user, index) =>
            <tr>
              {
                index === 0 &&
                  <td rowSpan={ detail.users.length } >
                    { detail.date }
                  </td>
              }
              <td>{ user.firstName } { " " } { user.lastName }</td>
              <td>{ user.email }</td>
              <td>{ user.role }</td>
            </tr>
          )
        )
      
    } }
  />;


export default LoginsReportPage;
