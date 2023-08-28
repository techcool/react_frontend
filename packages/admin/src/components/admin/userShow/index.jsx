import { formateDate } from "common/src/components/helpers/dateFormatter";
import Form from "common/src/components/shared/form";
import { SchooldTypes, StudentGrades, TeacherGrades } from "common/src/constants";
import React from "react";
import Select from "react-select";

const ShowUser = ({
  _id,
  firstName,
  lastName,
  email,
  school,
  schoolType,
  schoolDistrict,
  creationDate,
  grade,
  role,
  isTutor,
  freeStudentAccountsLimit,
  enabled,
  handleChanges,
  handleSubmit,
  reset
}) =>
  <div className="d-flex justify-content-center">
    <Form
      title={ "Account details" }
      onSubmit={ handleSubmit }
    >
      <div className="form-group">
        <label htmlFor="_id">
          Identifier
        </label>
        <input
          id="_id"
          value={ _id }
          className="form-control"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">
          First name
        </label>
        <input
          id="firstName"
          value={ firstName }
          className="form-control"
          onChange={ handleChanges }
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          value={ lastName }
          className="form-control"
          onChange={ handleChanges }
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={ email }
          type="email"
          className="form-control"
          onChange={ handleChanges }
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="school">
          School
        </label>
        <input
          id="school"
          value={ school }
          className="form-control"
          onChange={ handleChanges }
          required
        />
      </div>

      <div className="form-group"
        style={ { position: "relative" } }
      >
        <label htmlFor="enable">
          Public/Private
        </label>
        <Select
          classNamePrefix="react-select"
          className="mb-0"
          isClearable={ false }
          isSearchable={ false }
          value={ SchooldTypes.filter(s => s.value === schoolType)[0] }
          options={ SchooldTypes }
          onChange={
            (option) => {
              handleChanges({
                target: {
                  id: "schoolType",
                  value: option.value
                }
              });
            }
          }
        />
        <input
          tabIndex={ -1 }
          autoComplete="off"
          value={ schoolType }
          required
          style={ {
            opacity: 0, height: 0, position: "absolute",
            display: "block", bottom: 0
          } }
        />
      </div>
      {
        schoolType === "public"
        &&
          <div className="form-group">
            <label htmlFor="schoolDistrict">
              District
            </label>
            <input
              id="schoolDistrict"
              value={ schoolDistrict }
              className="form-control"
              onChange={ handleChanges }
              required
            />
          </div>
      }

      <div className="form-group"
        style={ { position: "relative" } }
      >
        <label htmlFor="grade">
          Grade
        </label>
        <Select
          classNamePrefix="react-select"
          className="mb-0"
          isClearable={ false }
          isSearchable={ false }
          value={
            role === "teacher" ?
              TeacherGrades.filter(e => e.value === grade)[0]
              :
              role === "student"
                ?
                StudentGrades.filter(e => e.value === grade)[0]
                :
                null
          }
          options={ [
            ...(
              role === "teacher" ?
                TeacherGrades
                :
                role === "student"
                  ?
                  StudentGrades
                  :
                  []
            )
          ] }
          onChange={
            (option) => {
              handleChanges({
                target: {
                  id: "grade",
                  value: option.value
                }
              });
            }
          }
        />
        <input
          tabIndex={ -1 }
          autoComplete="off"
          value={ grade }
          required
          style={ {
            opacity: 0, height: 0, position: "absolute",
            display: "block", bottom: 0
          } }
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">
          Role
        </label>
        <input
          id="role"
          value={
            (role === "teacher" && isTutor)
              ?
              "Tutor"
              :
              role === "teacher"
                ?
                "Teacher"
                :
                role === "student" ?
                  "Student"
                  :
                  null
          }
          className="form-control"
          disabled
        />
      </div>

      <div className="form-group"
        style={ { position: "relative" } }
      >
        <label htmlFor="enable">
          Status
        </label>
        <Select
          classNamePrefix="react-select"
          className="mb-0"
          placeholder="Grade"
          isClearable={ false }
          isSearchable={ false }
          placeholder="Status"
          value={ enabled
            ? { value: true, label: "Enabled" }
            : { value: false, label: "Disabled" }
          }
          options={ [
            { value: true, label: "Enabled" },
            { value: false, label: "Disabled" }
          ] }
          onChange={
            (option) => {
              handleChanges({
                target: {
                  id: "enabled",
                  value: option.value
                }
              });
            }
          }
        />
        <input
          tabIndex={ -1 }
          autoComplete="off"
          value={ enabled }
          required
          style={ {
            opacity: 0, height: 0, position: "absolute",
            display: "block", bottom: 0
          } }
        />
      </div>
      <div className="form-group">
        <label htmlFor="creationDate">
          Account creation date
        </label>
        <input
          id="creationDate"
          value={ formateDate(creationDate) }
          className="form-control"
          disabled
        />
      </div>
      <div className="d-flex">
        <button
          value="Update"
          name="submit"
          className="btn btn-success"
        >
          Submit
        </button>
        <button
          name="cancel"
          className="btn btn-success"
          onClick={ reset }
        >
          Reset
        </button>
      </div>
    </Form>
  </div>;

export default ShowUser;
