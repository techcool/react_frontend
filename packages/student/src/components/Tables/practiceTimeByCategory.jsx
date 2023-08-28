import React from 'react';
import formatDuration from 'format-duration'
import {
  EXERCICES_TITLES,
  EXERCISES_IDS
} from 'common/src/constants';

const PracticeTimeByCategory = ({ practiceTime = [{}, {}, {}, {}] }) =>
  <table className="table">
    <thead>
      <tr>
        <th scope="col"> Activity </th>
        <th scope="col">Novice</th>
        <th scope="col">Intermediat</th>
        <th scope="col">Bio</th>
        <th scope="col">Cultural</th>
      </tr>
    </thead>
    <tbody>
      {EXERCISES_IDS.map((id) =>
        <tr key={id}>
          <td>
            {EXERCICES_TITLES[id]}
          </td>
          <td>
            {
              practiceTime[0][id] === undefined
                ? "-"
                : formatDuration(practiceTime[0][id] *1000)
            }
          </td>
          <td>
            {
              practiceTime[1][id] === undefined
                ? "-"
                : formatDuration(practiceTime[1][id] *1000)
            }
          </td>
          <td>
            {
              practiceTime[2][id] === undefined
                ? "-"
                : formatDuration(practiceTime[2][id]*1000)
            }
          </td>
          <td>
            {
              practiceTime[3][id] === undefined
                ? "-"
                : formatDuration(practiceTime[3][id]*1000)
            }
          </td>
        </tr>
      )}
    </tbody>
  </table>

export default PracticeTimeByCategory;