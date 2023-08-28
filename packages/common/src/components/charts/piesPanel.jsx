import React from 'react';
import PieChart from './pieChart';
import Container from 'common/src/components/shared/container';


const PiesPanel = ({ averageScores }) =>
  <Container >
    <div className="p-3 font-weight-bold">
      Performance
    </div>
    <div className="d-flex flex-wrap justify-content-around">
      {averageScores.map((score, index) =>
        <div
          key={index}
          style={{
            width: '150px',
          }}
        >
          <PieChart
            {...{
              pieTitle: index,
              score,
            }}
          />
        </div>
      )}
    </div>
  </Container>

export default PiesPanel;