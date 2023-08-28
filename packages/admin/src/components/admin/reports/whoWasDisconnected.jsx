import exportExcel from "common/src/components/helpers/exportExcel";
import React from "react";
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
            style={ { maxWidth: "500px" } }
            value="filter"
          />
        </div>
        <div className="col">
          <input
            type="button"
            className="btn button-blue"
            value="Export"
            style={ { maxWidth: "500px" } }
            onClick={ () => exportExcel() }
          />
        </div>
      </div>
    </form>
  </div>;

const LoginsReportPage = ({
  startDate,
  endDate,
  handleChanges,
  handleSubmit,
  users
}) =>
  <ReportTemplate
    { ...{
      startDate,
      endDate,
      handleChanges,
      handleSubmit,
      exportExcel: () => {
        exportExcel(
          {
            csvData: users.map(
              (user, index) => ({
                Name: `${user.firstName} ${user.lastName}`,
                Email: user.email,
                Role: user.role
              })
            )
          }
        );
      },
      Filter,
      tableHeight: "100%",
      TableHeader: () =>
        <tr>
          <th scope="col">
            Name
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
        </tr>,
      TableBody: () =>
        <>
          <tr>
            <td>
              Total
            </td>
            <td colSpan="2">
              { users.length }
            </td>
          </tr>
          {
            users.map((user, index) =>
              <tr key={ index }>
                <td>
                  { user.firstName }{ " " }{ user.lastName }
                </td>
                <td>
                  { user.email }
                </td>
                <td>
                  { user.role }
                </td>
              </tr>
            )
          }
        </>
      
    } }
  />;


export default LoginsReportPage;
