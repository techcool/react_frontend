import classnames from "classnames";
import BarChart, { BarChartWith2DataSets } from "common/src/components/charts/barChart";
import PiesPanel from "common/src/components/charts/piesPanel";
import React, { Fragment } from "react";
import PracticeTimeByCategory from "../../Tables/practiceTimeByCategory";
import ScoresByActivites from "../../Tables/scoresByActivites";

const AssignmentDashboard = ({
  averageScores,
  completedCounter,
  inProgressCounter,
  completedVideosCounter,
  averageScoresByActivites,
  firstName,
  lastName,
  email,
  classes
}) =>
  <Fragment>
    <h1 className="text-center" >
      Teacher name: { firstName }{ " " }{ lastName }
    </h1>
    <h3 className="text-center" >
      Email : { email }
    </h3>
    <h3>
      Classes :
    </h3>
    <table className="table">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Grade
          </th>
          <th>
            Code
          </th>
          <th>
            Students
          </th>
          <th>
            Emails
          </th>
        </tr>
      </thead>
      <tbody>
        {
          classes.map((cls) =>
            <tr key={ cls._id }>
              <td>
                { cls.name }
              </td>
              <td>
                { cls.grade }
              </td>
              <td>
                { cls.code }
              </td>
              <td>
                <ul className="list-group">
                  {
                    cls.students.map(student =>
                      <li
                        key={ student._id }
                        className="list-group-item"
                      >
                        { student.firstName }{ " " }{ student.lastName }
                      </li>
                    )
                  }
                </ul>
              </td>
              <td>
                <ul className="list-group">
                  {
                    cls.students.map(student =>
                      <li
                        key={ student._id }
                        className="list-group-item"
                      >
                        { student.email }
                      </li>
                    )
                  }
                </ul>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>

    <PiesPanel
      { ...{ averageScores } }
    />
    <div className="row justify-content-center" >
      <div className="col-md-6">
        <div className={ classnames("font-weight-bold") }>
          Completed videos
        </div>
        <BarChart
          data={ completedVideosCounter }
        />
      </div>
      <div className="col-md-6">
        <div className={ classnames("font-weight-bold") }>
          Practice activites
        </div>
        <BarChartWith2DataSets
          { ...{
            legend1: "Completed",
            dataSet1: completedCounter,
            legend2: "In progress",
            dataSet2: inProgressCounter
          } }
        />
      </div>
      <div className="col-md-6">
        <h1>
          Average score on each practice activity
        </h1>
        <ScoresByActivites
          { ...{ scoresByActivites:averageScoresByActivites } }
        />
      </div>
    </div>
  </Fragment >;

export default AssignmentDashboard;
