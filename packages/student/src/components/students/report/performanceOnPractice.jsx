import React, { Fragment } from 'react';
import classnames from 'classnames'
import BarChart, { BarChartWith2DataSets } from 'common/src/components/charts/barChart';
import PiesPanel from 'common/src/components/charts/piesPanel';
import ScoresByActivites from '../../Tables/scoresByActivites';
import PracticeTimeByCategory from '../../Tables/practiceTimeByCategory';
import Container, { ContainerWithoutHorizontalSpace } from 'common/src/components/shared/container';
import { 
  StudentPerformancePerActivity as PerformancePerActivity
 } from 'common/src/components/charts/PerformancePerActivity';
import Tabs from 'common/src/components/shared/Tabs';


const AssignmentDashboard = ({
  title,
  averageScores,
  completedVideosCounter,
  completedCounter,
  inProgressCounter,
  averageScoresByActivites,
  maxScoresByActivites,
  latestScoresByActivites,
  practiceTime,
}) =>
  <Fragment>
    <h1 className="text-center font-weight-bold">
      {title}
    </h1>
    <PiesPanel
      {...{ averageScores }}
    />
    <div className="row justify-content-center" >
      <div className="col-md-6">
        <Container>
          <div className={classnames('font-weight-bold')}>
            Watched Videos
          </div>
          <BarChart
            axisLeftLegend='Video'
            data={completedVideosCounter}
          />
        </Container>
      </div>
      <div className="col-md-6">
        <Container>
          <div className={classnames('font-weight-bold')}>
            Submitted Postwork
          </div>
          <BarChartWith2DataSets
            {...{
              legend1: 'Completed',
              dataSet1: completedCounter,
              legend2: 'In-progress',
              dataSet2: inProgressCounter,
            }}
          />
        </Container>
      </div>
      <div className="col-md-12">
        <Container>
          <PerformancePerActivity
          />
        </Container>
      </div>
      <div className="col-md-12">
        <Container
        >
          <Tabs
            prefix='tables'
            labels={['Average Postwork Score', 'Max Postwork Score','Latest Postwork Score']}
            components={
              [
                () =>
                  <ContainerWithoutHorizontalSpace>
                    <ScoresByActivites
                      {...{ scoresByActivites: averageScoresByActivites }}
                    />
                  </ContainerWithoutHorizontalSpace>,
                () =>
                  <ContainerWithoutHorizontalSpace>
                    <ScoresByActivites
                      {...{ scoresByActivites: maxScoresByActivites }}
                    />
                  </ContainerWithoutHorizontalSpace>,
                () =>
                <ContainerWithoutHorizontalSpace>
                  <ScoresByActivites
                    {...{ scoresByActivites: latestScoresByActivites }}
                  />
                </ContainerWithoutHorizontalSpace>,

              ]
            }
          />
        </Container>
      </div>
      {/* <div className="col-md-6">
        <Container
        >
          <h1>
          Time Spent on Each Activity 
          </h1>
          <PracticeTimeByCategory
            {...{ practiceTime }}
          />
        </Container>
      </div> */}
    </div>
  </Fragment>



export default AssignmentDashboard;