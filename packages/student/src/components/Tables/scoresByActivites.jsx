import React, { Fragment } from 'react';
import {
  EXERCISES_IDS_SCORED,
  EXERCICES_TITLES,
  CATEGORIES_LABELS,
  CATEGORY_NOVICE,
  CATEGORY_INTERMEDIATE,
  CATEGORY_BIOGRAPHY,
  CATEGORY_CULTURAL
} from 'common/src/constants';

const AverageScoresByActivites = ({ scoresByActivites = [{}, {}, {}, {}] }) =>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Activity </th>
        <th scope="col">{CATEGORIES_LABELS[CATEGORY_NOVICE]}</th>
        <th scope="col">{CATEGORIES_LABELS[CATEGORY_INTERMEDIATE]}</th>
        <th scope="col">{CATEGORIES_LABELS[CATEGORY_BIOGRAPHY]}</th>
        <th scope="col">{CATEGORIES_LABELS[CATEGORY_CULTURAL]}</th>
      </tr>
    </thead>
    <tbody>
      {EXERCISES_IDS_SCORED.map((id) =>
        <tr key={id}>
          <td>
            {EXERCICES_TITLES[id]}
          </td>
          <td>
            {scoresByActivites[0][id] === undefined && "-"}
            {
              scoresByActivites[0][id] !== undefined &&
              <Fragment>{scoresByActivites[0][id]}%</Fragment>
            }
          </td>
          <td>
            {scoresByActivites[1][id] === undefined && "-"}
            {
              scoresByActivites[1][id] !== undefined &&
              <Fragment>{scoresByActivites[1][id]}%</Fragment>
            }
          </td>
          <td>
            {scoresByActivites[2][id] === undefined && "-"}
            {
              scoresByActivites[2][id] !== undefined &&
              <Fragment>{scoresByActivites[2][id]}%</Fragment>
            }
          </td>
          <td>
            {scoresByActivites[3][id] === undefined && "-"}
            {
              scoresByActivites[3][id] !== undefined &&
              <Fragment>{scoresByActivites[3][id]}</Fragment>
            }
          </td>
        </tr>
      )}
    </tbody>
  </table>

export default AverageScoresByActivites;