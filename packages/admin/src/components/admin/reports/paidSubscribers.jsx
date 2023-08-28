import { DateChart } from "common/src/components/charts/lineChart";
import React, { Fragment } from "react";
import Select from "react-select";
import ReportTemplate from "./reportTemplate";

const packOptions= [
  { value:1,label:"SILVER" },
  { value:2,label:"GOLD" },
  { value:3,label:"PLATINUM" }
];
const Filter = ({
  packId,
  handleChanges,
  handleSubmit
}) =>
  <div className="mb-4">
    <form onSubmit={ handleSubmit }>
      <div className="form-row">
        <div className="col">
          <Select
            placeholder="Pack"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            value={ packOptions.filter(option=>option.value===packId)[0] }
            options={ packOptions }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "packId",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
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


const PaidSubscriberPage = ({
  packId,
  handleChanges,
  handleSubmit,
  data,
  total
}) =>
  <ReportTemplate
    { ...{
      packId,
      handleChanges,
      handleSubmit,
      data,
      total,
      Filter,
      TableHeader: () =>
        <tr>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Package
          </th>
          <th scope="col">
            Amount
          </th>
          <th scope="col">
            Date
          </th>
        </tr>
      ,
      TableBody: () =>
        <Fragment>
          {
            data.map((element, index) =>
              <tr key={ index }>
                <td>
                  { element.owner && element.owner.email }
                </td>
                <td>
                  { element.packageName }
                </td>
                <td>
                  { element.amount }
                </td>
                <td>
                  { element.date }
                </td>
              </tr>
            )
          }
          { /* <tr>
            <th scope="row">
              Total
              </th>
            <td>
              {total}
            </td>
          </tr> */ }
        </Fragment>
    } }
  />;


export default PaidSubscriberPage;
