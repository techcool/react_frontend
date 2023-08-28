import exportExcel from "common/src/components/helpers/exportExcel";
import { HOW_DID_HEAR_ABOUT_US_OPTIONS, StudentGrades, TeacherGrades } from "common/src/constants";
import React from "react";
import Select from "react-select";

const UsersSearchForm = ({
  firstName,
  lastName,
  email,
  school,
  role,
  schoolDistrict,
  didCreateAssignment,
  didCreateClass,
  changesHandler,
  handleSubmit,
  users,
  hearAboutUs
}) =>
  <div
    className="mb-4"
  >
    <form onSubmit={ handleSubmit }>
      <div className="form-row">
        <div className="col">
          <input
            id="firstName"
            value={ firstName }
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={ changesHandler }
          />
        </div>

        <div className="col">
          <input
            id="lastName"
            value={ lastName }
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={ changesHandler }
          />
        </div>

        <div className="col">
          <input
            id="email"
            value={ email }
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={ changesHandler }
          />
        </div>

        <div className="col">
          <input
            id="school"
            value={ school }
            type="text"
            className="form-control"
            placeholder="School"
            onChange={ changesHandler }
          />
        </div>

        <div className="col">
          <Select
            placeholder="Type"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              { value: "public", label: "Public" },
              { value: "private", label: "Private" }
            ] }
            onChange={ option => changesHandler(
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
          <input
            id="schoolDistrict"
            value={ schoolDistrict }
            type="type"
            className="form-control"
            placeholder="District"
            onChange={ changesHandler }
          />
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col">
          <Select
            placeholder="Grade"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              ...(
                role === "teacher" || role === "tutor" ?
                  TeacherGrades
                  :
                  role === "student"
                    ?
                    StudentGrades
                    :
                    []
              )
            ] }
            onChange={ option => changesHandler(
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
          <Select
            placeholder={ "Role" }
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              { value: "admin", label: "Admin" },
              { value: "teacher", label: "Teacher" },
              { value: "tutor", label: "Tutor" },
              { value: "student", label: "Student" }
            ] }
            onChange={ option => changesHandler(
              {
                target: {
                  id: "role",
                  value: (option) ? option.value : ""
                }
              }
            )
            }
          />
        </div>

        <div className="col">
          <Select
            placeholder="Status"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              { value: "true", label: "Enabled" },
              { value: "false", label: "Disabled" }
            ] }
            onChange={ option => changesHandler(
              {
                target: {
                  id: "enabled",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
          />
        </div>
        <div className="col">
          <Select
            placeholder="Is Verified ?"
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            options={ [
              { value: "true", label: "Verified" },
              { value: "false", label: "Not verified" }
            ] }
            onChange={ option => changesHandler(
              {
                target: {
                  id: "isVerified",
                  value: (option !== null) ? option.value : ""
                }
              }
            )
            }
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
            onClick={ () =>
              exportExcel({
                csvData: users.map(user =>
                  (
                    {
                      id: user._id,
                      FirstName: user.firstName,
                      LastName: user.lastName,
                      email: user.email,
                      role: (user.isTutor && user.role === "teacher")
                        ? "Tutor"
                        : user.role === "teacher"
                          ? "Teacher"
                          : user.role === "admin"
                            ? "Admin"
                            : "Student",
                      grade:
                      (user.role === "admin")
                        ? "-"
                        :
                        (
                          (
                            user.role === "teacher"
                            &&
                            !TeacherGrades.some(g => g.value === user.grade)
                          )
                          ||
                          (
                            user.role === "student"
                            &&
                            !StudentGrades.some(g => g.value === user.grade)
                          )
                        )
                          ? "Need to be update!"
                          : (user.role === "teacher" || user.isTutor)
                            ? TeacherGrades.filter(g => g.value === user.grade)[0].label
                            : StudentGrades.filter(g => g.value === user.grade)[0].label
                      ,
                      SchoolType: user.schoolType,
                      SchoolName: user.school,
                      SchoolDistrct: user.schoolDistrict,
                      AcccountEnbaled: user.enabled,
                      creationDate: user.creationDate,
                      hearAboutUs:user.hearAboutUs
                    }
                  )
                )
              })
            }
          />
        </div>
      </div>
      {
        (role === "teacher" || role === "tutor") &&
          <div className="form-row mt-2">
            <div className="col">
              <Select
                placeholder="Created a class before?"
                value={
                  didCreateClass === null
                    ? null
                    : didCreateClass
                      ? { value: true, label: "Yes" }
                      : { value: false, label: "No" }
                }
                classNamePrefix="react-select"
                isClearable={ true }
                isSearchable={ false }
                options={ [
                  { value: true, label: "Yes" },
                  { value: false, label: "No" }
                ] }
                onChange={ option => changesHandler(
                  {
                    target: {
                      id: "didCreateClass",
                      value: (option !== null) ? option.value : null
                    }
                  }
                )
                }
              />
            </div>
            <div className="col">
              <Select
                placeholder="Created an assignment before?"
                value={
                  didCreateAssignment === null
                    ? null
                    : didCreateAssignment
                      ? { value: true, label: "Yes" }
                      : { value: false, label: "No" }
                }
                classNamePrefix="react-select"
                isClearable={ true }
                isSearchable={ false }
                options={ [
                  { value: true, label: "Yes" },
                  { value: false, label: "No" }
                ] }
                onChange={ option => changesHandler(
                  {
                    target: {
                      id: "didCreateAssignment",
                      value: (option !== null) ? option.value : null
                    }
                  }
                )
                }
              />
            </div>
            <div className="col">
              <Select
                placeholder="How did they hear about us?"
                value={ hearAboutUs &&{ value: hearAboutUs, label: hearAboutUs } }
                classNamePrefix="react-select"
                isClearable={ true }
                isSearchable={ false }
                options={ HOW_DID_HEAR_ABOUT_US_OPTIONS.map(e=>({ value:e,label:e })) }
                onChange={ option => changesHandler(
                  {
                    target: {
                      id: "hearAboutUs",
                      value: (option !== null) ? option.value : null
                    }
                  }
                )
                }
              />
            </div>
          </div>
      }
    </form>
  </div>;


export default UsersSearchForm;
