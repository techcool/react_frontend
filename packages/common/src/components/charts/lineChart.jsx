import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { BLUE } from 'common/src/constants';
import formatDuration from 'format-duration';


export const DateChart = ({
  data = [],
  Xlegend = 'Dates',
  Ylegend = 'count',
  isInteractive = false,
  axisLeft = {
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: Ylegend,
    legendOffset: -40,
    legendPosition: 'middle',
  },
  tooltip,
}) => {
  let max = 8;
  for (let element of data)
    if (element.y > max) max = element.y
  return (
    <ResponsiveLine
      isInteractive={isInteractive}
      data={[
        {
          id: "data",
          data,
        }
      ]}
      enableArea={true}
      colors={BLUE}
      margin={{ top: 50, right: 50, bottom: 70, left: 60 }
      }
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      {...(tooltip && { tooltip })}
      xFormat="time:%Y-%m-%d"
      yScale={{ type: 'linear', min: 0, max, stacked: true, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        format: '%b %d',
        tickValues: 'every 1 day',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legend: Xlegend,
        legendOffset: 60,
        legendPosition: 'middle'
      }}
      axisLeft={axisLeft}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={- 12}
      useMesh={true}
    />
  )
}
