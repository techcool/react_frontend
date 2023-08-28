import classnames from "classnames";
import BarChart, { BarChartWith2DataSets } from "common/src/components/charts/barChart";
import PiesPanel from "common/src/components/charts/piesPanel";
import React, { Fragment } from "react";
import PracticeTimeByCategory from "../../Tables/practiceTimeByCategory";
import ScoresByActivites from "../../Tables/scoresByActivites";

const AssignmentDashboard = ({
  title,
  averageScores,
  completedCounter,
  inProgressCounter,
  completedVideosCounter,
  averageScoresByActivites,
  practiceTime,
  firstName,
  lastName,
  email
}) =>
  <Fragment>

    <h1 className="text-center">
      { title }
    </h1>
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
      <div className="col-md-12">
        <h1>
          Average score on each practice activity
        </h1>
        <ScoresByActivites
          { ...{ scoresByActivites:averageScoresByActivites } }
        />
      </div>
      { /* <div className="col-md-6">
        <h1>
          Time spent on each practice activity
        </h1>
        <PracticeTimeByCategory
          {...{ practiceTime }}
        />
      </div> */ }
    </div>
  </Fragment >;

export default AssignmentDashboard;
