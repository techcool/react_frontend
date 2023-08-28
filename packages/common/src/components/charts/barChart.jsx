import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import {
  CATEGORIES_LABELS,
  CATEGORY_NOVICE,
  CATEGORY_INTERMEDIATE,
  CATEGORY_BIOGRAPHY,
  CATEGORY_CULTURAL,
  BLUE,
  RED
} from 'common/src/constants';


const BarChart = ({ data }) => {
  const max = Math.max(...data)
  return (
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <ResponsiveBar
        isInteractive={true}
        tooltip={({ id, value, color }) => (
          <strong style={{ color }}>
            Completed: {value}
          </strong>
        )}
        data={
          [
            { "category": CATEGORIES_LABELS[CATEGORY_NOVICE], value: data[CATEGORY_NOVICE] },
            { "category": CATEGORIES_LABELS[CATEGORY_INTERMEDIATE], value: data[CATEGORY_INTERMEDIATE] },
            { "category": CATEGORIES_LABELS[CATEGORY_BIOGRAPHY], value: data[CATEGORY_BIOGRAPHY] },
            { "category": CATEGORIES_LABELS[CATEGORY_CULTURAL], value: data[CATEGORY_CULTURAL] },
          ]
        }
        keys={['value']}
        indexBy="category"
        margin={{ top: 50, right: 20, bottom: 50, left: 30 }}
        padding={0.7}
        colors={[BLUE]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 32
        }}
        maxValue={(max > 8) ? max : 8}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>)
}

const BarChartWith2DataSets = ({ legend1, dataSet1, legend2, dataSet2 }) => {
  const max = Math.max(...dataSet1, ...dataSet2);
  const maxDateSet1 = Math.max(...dataSet1);

  return (
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <ResponsiveBar
        isInteractive={true}
        tooltip={({ id, value, color }) => (
          <strong style={{ color }}>
            {id}: {value}
          </strong>
        )}
        data={
          [
            {
              category: CATEGORIES_LABELS[CATEGORY_NOVICE],
              [legend1]: dataSet1[CATEGORY_NOVICE],
              [legend2]: dataSet2[CATEGORY_NOVICE],

            },
            {
              category: CATEGORIES_LABELS[CATEGORY_INTERMEDIATE],
              [legend1]: dataSet1[CATEGORY_INTERMEDIATE],
              [legend2]: dataSet2[CATEGORY_INTERMEDIATE],
            },
            {
              category: CATEGORIES_LABELS[CATEGORY_BIOGRAPHY],
              [legend1]: dataSet1[CATEGORY_BIOGRAPHY],
              [legend2]: dataSet2[CATEGORY_BIOGRAPHY],
            },
            {
              category: CATEGORIES_LABELS[CATEGORY_CULTURAL],
              [legend1]: dataSet1[CATEGORY_CULTURAL],
              [legend2]: dataSet2[CATEGORY_CULTURAL],
            },
          ]
        }
        keys={[legend1, legend2]}
        indexBy="category"
        margin={{ top: 50, right: 20, bottom: 50, left: 30 }}
        groupMode="grouped"
        padding={0.4}
        innerPadding={3}
        colors={(maxDateSet1 === 0) ? RED : [BLUE, RED]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 32
        }}
        maxValue={(max > 8) ? max : 8}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>)
}

export { BarChartWith2DataSets };
export default BarChart;