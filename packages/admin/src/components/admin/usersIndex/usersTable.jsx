import { formateDate } from "common/src/components/helpers/dateFormatter";
import { StudentGrades, TeacherGrades } from "common/src/constants";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import Select from "react-select";
import styledComponents from "styled-components";

const Div = styledComponents.div`
 width:150px;
`;

const UsersTable = ({
  skip,
  limit,
  setSkip,
  setLimit,
  users,
  deleteUser,
  updateAccountStatus,
  markEmailAsVerified
}) => {
  const dataSize = (users && users.length) ? users.length : 0;
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <div className="font-weight-bold">
          { dataSize } result{ dataSize === 1 ? "" : "s" }
        </div>
        <div className="font-weight-bold">
          Page: { `${parseInt(skip / limit)+1}/${parseInt(dataSize / limit)+1}` }
        </div>
        <div className="font-weight-bold">
          Page size: 
          <select
            value={ limit }
            onChange={ e=>{setSkip(0);setLimit(parseInt(e.target.value));} }
          >
            <option value={ 10 }>10</option>
            <option value={ 20 }>20</option>
            <option value={ 50 }>50</option>
            <option value={ 100 }>100</option>
            <option value={ dataSize }>All</option>
          </select>
        </div>

        <div className="d-flex">
          <button
            className="btn button-blue mr-1 text-nowrap"
            onClick={ () => setSkip(0) }
          >
            First page
          </button>
          <button
            className="btn button-blue mr-1"
            onClick={ () => {
              if (skip - limit >= 0) {
                setSkip(skip - limit);
              }
            } }
          >
            Previous
          </button>

          <button
            className="btn button-blue"
            onClick={ () => {
              if (skip + limit < dataSize) {
                setSkip(skip + limit);
              }
            } }
          >
            Next
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table" >
          <thead>
            <th>First name</th>
            <th>Last name</th>
            <th >Email</th>
            <th>School</th>
            <th>Public/Private</th>
            <th>District</th>
            <th>Grade</th>
            <th>Role</th>
            <th>Heard about us from</th>
            <th>Member since</th>
            <th>Account status</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {
              users.slice(skip, skip + limit).map(
                user =>
                  <tr key={ user._id }>
                    <td>
                      <span style={ {
                        display: "inline-block",
                        maxWidth: "150px",
                        wordWrap: "break-word"
                      } }>
                        { user.firstName }
                      </span>
                    </td>
                    <td>
                      <span style={ {
                        display: "inline-block",
                        maxWidth: "150px",
                        wordWrap: "break-word"
                      } }>
                        { user.lastName }
                      </span>
                    </td>
                    <td>
                      <span style={ {
                        display: "inline-block",
                        maxWidth: "150px",
                        wordWrap: "break-word"
                      } }>
                        { user.email }
                      </span>
                    </td>
                    <td>
                      <span style={ {
                        display: "inline-block",
                        maxWidth: "150px",
                        wordWrap: "break-word"
                      } }>
                        { user.school }
                      </span>
                    </td>
                    <td>
                      {
                        user.schoolType === "public" ? "Public"
                          : user.schoolType === "private" ? "Private"
                            : user.schoolType === "others" ? "Others"
                              : "-"
                      }</td>
                    <td>
                      <span style={ {
                        display: "inline-block",
                        maxWidth: "150px",
                        wordWrap: "break-word"
                      } }>
                        { user.schoolType === "public" ? user.schoolDistrict : "-" }
                      </span>
                    </td>
                    <td>
                      {
                        user.role === "admin"
                        &&
                        "-"
                      }
                      {
                        user.role === "teacher"
                        &&
                        TeacherGrades.filter(e => e.value === user.grade).length > 0
                        &&
                        TeacherGrades.filter(e => e.value === user.grade)[0].label
                      }
                      {
                        user.role === "teacher"
                        &&
                        TeacherGrades.filter(e => e.value === user.grade).length === 0
                        &&
                        "Needs to be updated"
                      }
                      {
                        user.role === "student"
                        &&
                        StudentGrades.filter(e => e.value === user.grade)[0].label
                      }
                    </td>
                    <td>{
                      user.role === "teacher" && user.isTutor
                        ?
                        "Tutor"
                        :
                        user.role
                    }</td>
                    <td>
                      { user.hearAboutUs }
                    </td>
                    <td>{ formateDate(user.creationDate) }</td>
                    <td>
                      { user.enabled ? "Enabled" : "Disabled" }
                    </td>
                    <td>
                      <Action
                        user={ user }
                        updateAccountStatus={ updateAccountStatus }
                        deleteUser={ deleteUser }
                        markEmailAsVerified={ markEmailAsVerified }
                      />
                    </td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

const ACTION_NONE = -1;
const ACTION_CHECK_ACTIVITY = 0;
const ACTION_EDIT = 1;
const ACTION_ENABLE_DISABLE = 2;
const ACTION_DELETE = 3;
const ACTION_VERIFY = 4;

const Action = ({
  user,
  updateAccountStatus,
  deleteUser,
  markEmailAsVerified
}) => {
  const [action, setAction] = useState(ACTION_NONE);
  return (
    <Div>
      <Select
        isClearable={ true }
        isSearchable={ false }
        classNamePrefix="react-select"
        placeholder="Select action"
        onChange={ (option) => {
          if (!option)
            setAction(ACTION_NONE);
          else
            setAction(option.value);
        } }
        options={ [
          { value: ACTION_CHECK_ACTIVITY, label: "Check activity" },
          { value: ACTION_EDIT, label: "Edit" },
          ...(!user.isVerified ? [{ value: ACTION_VERIFY, label: "Verify email" }] : []),
          { value: ACTION_ENABLE_DISABLE, label: "Enable/Disable" },
          { value: ACTION_DELETE, label: "Delete" }
        ] }
      />
      { action === ACTION_NONE && <button className="btn button-gray"> Run </button> }
      {
        action === ACTION_CHECK_ACTIVITY
        &&
          <Link
          // to={`/admin/reports/${user.role}/${user._id}`}
            to={ `/admin/reports/users/${user._id}` }
            className="btn button-blue"
          >
            Run
          </Link>
      }
      {
        action === ACTION_EDIT
        &&
          <Link
            to={ `/admin/users/${user._id}` }
            className="btn button-blue"
          >
            Run
          </Link>
      }
      {
        action === ACTION_ENABLE_DISABLE
        &&
          <Link
            to="#"
            className="btn button-blue"
            onClick={ () =>
              updateAccountStatus({
                user_id: user._id,
                status: !user.enabled
              })
            }
          >
            Run
          </Link>
      }
      {
        action === ACTION_DELETE
        &&
          <Link
            to="#"
            className="btn button-blue"
            onClick={ () =>
              confirmAlert({
                title: "Delete video",
                message: "Are you sure that you want to remove the video?",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => deleteUser({ user_id: user._id })
                  },
                  {
                    label: "No",
                    onClick: () => { }
                  }
                ]
              }) }
          >
            Run
          </Link>
      }
      {
        action === ACTION_VERIFY
        &&
          <Link
            to="#"
            className="btn button-blue"
            onClick={ () =>
              confirmAlert({
                title: "Email verification",
                message: "Are you sure that you want to mark the user's email as verified ?",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => markEmailAsVerified({ user_id: user._id })
                  },
                  {
                    label: "No",
                    onClick: () => { }
                  }
                ]
              }) }
          >
            Run
          </Link>
      }
    </Div>
  );
};
export default UsersTable;
