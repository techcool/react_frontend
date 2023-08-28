import classnames from "classnames";
import BarChart from "common/src/components/charts/barChart";
// import PracticeTimeByCategory from '../../Tables/practiceTimeByCategory';
import {
  StudentPerformancePerActivity as PerformancePerActivity
} from "common/src/components/charts/PerformancePerActivity";
import PiesPanel from "common/src/components/charts/piesPanel";
import Container, { ContainerWithoutHorizontalSpace } from "common/src/components/shared/container";
import Tabs from "common/src/components/shared/Tabs";
import React, { Fragment } from "react";
import ScoresByActivites from "../../Tables/scoresByActivites";

const PerformanceOnClass = ({
  class_id,
  className,
  averageScores,
  averageScoresByActivites,
  maxScoresByActivites,
  practiceTime,
  completedCounter,
  completedVideosCounter
}) =>
  <Fragment>
    <h1 className="text-center">
      Performance on class : { className }
    </h1>
    <PiesPanel
      { ...{ averageScores } }
    />
    <div className="row justify-content-center" >
      <div className="col-md-6">
        <ContainerWithoutHorizontalSpace>
          <div className={ classnames("font-weight-bold") }>
            Watched Videos
          </div>
          <BarChart
            data={ completedVideosCounter }
          />
        </ContainerWithoutHorizontalSpace>
      </div>
      <div className="col-md-6">
        <ContainerWithoutHorizontalSpace>
          <div className={ classnames("font-weight-bold") }>
            Submitted Assignment
          </div>
          <BarChart
            data={ completedCounter }
          />
        </ContainerWithoutHorizontalSpace>
      </div>
      <div className="col-md-12">
        <Container>
          <PerformancePerActivity
            { ...{ class_id } }
          />
        </Container>
      </div>

      <div className="col-md-12">
        <ContainerWithoutHorizontalSpace>
          <Tabs
            prefix="tables"
            labels={ ["Average Postwork Score", "Max Postwork Score"] }
            components={
              [
                () =>
                  <ContainerWithoutHorizontalSpace>
                    <ScoresByActivites
                      { ...{ scoresByActivites: averageScoresByActivites } }
                    />
                  </ContainerWithoutHorizontalSpace>,
                () =>
                  <ContainerWithoutHorizontalSpace>
                    <ScoresByActivites
                      { ...{ scoresByActivites: maxScoresByActivites } }
                    />
                  </ContainerWithoutHorizontalSpace>

              ]
            }
          />
        </ContainerWithoutHorizontalSpace>
      </div>
      { /* <div className="col-md-6">
        <Container>
          <h1>
            Time spent on each activity
          </h1>
          <ContainerWithoutHorizontalSpace>
            <PracticeTimeByCategory
              {...{ practiceTime }}
            />
          </ContainerWithoutHorizontalSpace>
        </Container>
      </div> */ }
    </div>
  </Fragment >;

export default PerformanceOnClass;
