import BarChart from "common/src/components/charts/barChart";
import PiesPanel from "common/src/components/charts/piesPanel";
import Container from "common/src/components/shared/container";
import {
  CATEGORIES_LABELS,
  EXERCICES_TITLES,
  EXERCISES_IDS_SCORED
} from "common/src/constants";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const OverallPerformanceOnClassDashboard = ({
  title,
  averageScores,
  completedCounter,
  students,
  class_id,
  completedVideosCounter
}) =>
  <Fragment>
    <h1 className="text-center">
      { title }
    </h1>
    <PiesPanel
      { ...{ averageScores } }
    />
    <div className="row justify-content-center my-3 px-3" >
      <div className="col-md-6">
        <Container>
          <div className="font-weight-bold">
            Watched videos
          </div>
          <BarChart
            data={ completedVideosCounter }
          />
        </Container>
      </div>
      <div className="col-md-6">
        <Container>
          <div className="font-weight-bold">
            Completed Assignments
          </div>
          <BarChart
            data={ completedCounter }
          />
        </Container>
      </div>
    </div>
    <Container
    >
      <Table
        { ...{ students, class_id } }
      />
    </Container>
  </Fragment>;

const Table = ({ students, class_id }) => {
  const [category, setCategory] = useState(0);
  const customStyles = {
    menu: () => ({
      position: "absolute",
      backgroundColor: "white",
      width: "200px"
    })

  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            <Select
              styles={ customStyles }
              classNamePrefix="react-select"
              isClearable={ false }
              isSearchable={ false }
              value={ { value: category, label: CATEGORIES_LABELS[category] } }
              options={ Object.keys(CATEGORIES_LABELS).map((key, index) =>
                ({ value: index, label: CATEGORIES_LABELS[key] })
              )
              }
              onChange={ (option) => setCategory(option.value) }

            />
          </th>
          {
            EXERCISES_IDS_SCORED.map((activityId, index) =>
              <th key={ index } scope="col">{ EXERCICES_TITLES[activityId] }</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          students.map((student, index) =>
            <tr key={ index }>
              <td title={ student.email }>
                <Link
                  className="text-dark-blue"
                  to={ `/teacher/reports/classes/${class_id}/students/${student._id}` }
                >
                  { `${student.firstName} ${student.lastName}` }
                </Link>
              </td>
              {
                EXERCISES_IDS_SCORED.map((activityId, index) =>
                  <td key={ index }>
                    {
                      student.score[category][activityId] === undefined
                        ? "-"
                        : student.score[category][activityId]
                    }
                  </td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  );
};

export default OverallPerformanceOnClassDashboard;
