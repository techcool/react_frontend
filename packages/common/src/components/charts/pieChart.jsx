import React from "react";
// import { Pie as PieChartjs } from 'react-chartjs-2';
import { Doughnut as PieChartjs } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Row, Col } from "react-bootstrap";
import {
  CATEGORY_NOVICE,
  CATEGORY_INTERMEDIATE,
  CATEGORY_BIOGRAPHY,
  CATEGORY_CULTURAL,
  BLUE,
} from "common/src/constants";

const PieChart = ({
  pieTitle = -1,
  score = -1,
  isDefault = false,
  pie = false,
  ownLable = false,
}) => {
  let data;
  if (score === -1)
    data = {
      labels: ["No activity"],
      datasets: [
        {
          backgroundColor: pie ? ["#DBF7FF"] : ["#F6E9E6"],
          data: [100],
        },
      ],
    };
  else
    data = {
      labels: ownLable ? ["Completed", "Incompleted"] : ["Correct", "Wrong"],
      datasets: [
        {
          backgroundColor: pie ? [BLUE, "#DBF7FF"] : ["#FF9457", "#F6E9E6"],
          data: [score, Number.isInteger(100 - score) ? 100 - score : (100-score).toFixed(2)],
        },
      ],
    };

  if (isDefault) {
    return (
      <Row>
        <Col
          style={{
            width: "150px",
            height: "150px",
          }}
          sm="12"
        >
          {pie ? (
            <Pie
              data={data}
              options={{
                legend: false,
                maintainAspectRatio: true,
              }}
            />
          ) : (
            <PieChartjs
              data={data}
              options={{
                legend: false,
                maintainAspectRatio: true,
              }}
            />
          )}
        </Col>

        <Col sm="12" className="text-center font-weight-bold">
          {pieTitle}
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <div
        style={{
          width: "150px",
          height: "150px",
        }}
      >
        <PieChartjs
          data={data}
          options={{
            legend: false,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="text-center font-weight-bold">
        {pieTitle === CATEGORY_NOVICE && "Novice"}
        {pieTitle === CATEGORY_INTERMEDIATE && "Intermediate"}
        {pieTitle === CATEGORY_BIOGRAPHY && "Biography"}
        {pieTitle === CATEGORY_CULTURAL && "Cultural"}
      </div>
    </div>
  );
};

export default PieChart;
