import React from "react";

const StatisticsTable = ({ statistics }) =>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">

        </th>
        <th scope="col">
          Verified accounts
        </th>
        <th scope="col">
          Active accounts
        </th>
        <th scope="col">
          Disabled accounts
        </th>
        <th scope="col">
          Total
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Admin accounts
        </td>
        <td>
          { statistics.admins.verified }
        </td>
        <td>
          { statistics.admins.enabled }
        </td>
        <td>
          { statistics.admins.disabled }
        </td>
        <td>
          {
            statistics.admins.enabled +
						statistics.admins.disabled
          }
        </td>
      </tr>
      <tr>
        <td>
          Teacher accounts
        </td>
        <td>
          { statistics.teachers.verified }
        </td>
        <td>
          { statistics.teachers.enabled }
        </td>
        <td>
          { statistics.teachers.disabled }
        </td>
        <td>
          { statistics.teachers.enabled + statistics.teachers.disabled }
        </td>
      </tr>
      <tr>
        <td>
          Tutors accounts
        </td>
        <td>
          { statistics.tutors.verified }
        </td>
        <td>
          { statistics.tutors.enabled }
        </td>
        <td>
          { statistics.tutors.disabled }
        </td>
        <td>
          { statistics.tutors.enabled + statistics.tutors.disabled }
        </td>
      </tr>
      <tr>
        <td>
          Student accounts
        </td>
        <td>
          { statistics.students.verified }
        </td>
        <td>
          { statistics.students.enabled }
        </td>
        <td>
          { statistics.students.disabled }
        </td>
        <td>
          {
            statistics.students.enabled +
						statistics.students.disabled
          }
        </td>
      </tr>
      <tr>
        <td>
          Total
        </td>
        <td>
          {
            statistics.admins.verified +
						statistics.teachers.verified +
						statistics.tutors.verified +
						statistics.students.verified
          }
        </td>
        <td>
          {
            statistics.admins.enabled +
						statistics.teachers.enabled +
						statistics.tutors.enabled +
						statistics.students.enabled
          }
        </td>
        <td>
          {
            statistics.admins.disabled +
						statistics.teachers.disabled +
						statistics.tutors.disabled +
						statistics.students.disabled
          }
        </td>
        <td>
          {
            statistics.admins.enabled +
						statistics.teachers.enabled +
						statistics.tutors.enabled +
						statistics.students.enabled +
						statistics.admins.disabled +
						statistics.teachers.disabled +
						statistics.tutors.disabled +
						statistics.students.disabled
          }
        </td>
      </tr>

    </tbody>
  </table>;

export default StatisticsTable;
