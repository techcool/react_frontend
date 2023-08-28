/* eslint-disable eqeqeq */
import React from "react";
import { Table, ProgressBar, Col, Button } from "react-bootstrap";
import { EXERCICES_TITLES } from "common/src/constants";
import AssignmentDetails from "./assignmentDetails";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PieChart from "common/src/components/charts/pieChart";
import { fetchProgress } from "common/src/old-api/progressActions";
import Assignment from "common/src/pages/exercisePages/assignementPage";
import {
  EXERCISE_LISTEN,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_READ,
  EXERCISE_CLOZE,
  EXERCISE_CHUNK_STORY, EXERCISE_WRITE_STORY,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
  EXERCISES_IDS_AUTOSCORED
} from 'common/src/constants';

export default function AssignmentResultOverallPerformance() {
  const { postwork_id } = useParams();
  const { accessToken, role } = useSelector((state) => state.user);
  const [report, setReport] = React.useState([]);
  const [overallPerformance, setOverallPerformance] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [postwork, setPostwork] = React.useState({});
  // const [evaluation, setEvaluation] = React.useState({});
  // const [studentAnswer, setStudentAnswer] = React.useState({});

  const [classIdValue, setClassIdValue] = React.useState();
  const [exerciseIndexVal, setExerciseIndexVal] = React.useState();
  const [showExerciseView, setShowExerciseView] = React.useState(false);


  React.useEffect(() => {
    (async () => {
      if (postwork_id) {
        const res = await fetchProgress({
          accessToken,
          role,
          activityType: "assignment",
          activityID: postwork_id,
        });
        let result = [];

        if(res.totalScore){
          setOverallPerformance(Number.isInteger(res.totalScore)?res.totalScore:res.totalScore.toFixed(2));
        }
        
        if (res && res.progressByActivityPercentage && Object.values(res.progressByActivityPercentage).length > 0) {

          for (let exerciseId in res.progressByActivityPercentage) {
            
            exerciseId = parseInt(exerciseId);

            let right  = '-';
            let wrong  = '-';

            if(res.scoreByActivity.hasOwnProperty(exerciseId)){


              let rightValue = res.scoreByActivity[exerciseId] == 0 ?  0 : res.scoreByActivity[exerciseId];


              right = rightValue + '%';


              let wrongValue = 100 - rightValue;

              // wrong = res.scoreByActivity[exerciseId] == 0 ?  100 : '-';
              
              // let wrongValue = 100-parseInt(res.scoreByActivity[exerciseId]);

              // wrong = res.scoreByActivity[exerciseId] != 0 && (100-parseInt(res.scoreByActivity[exerciseId]) > 0) ? 100-parseInt(res.scoreByActivity[exerciseId]) : 100;

              wrong = wrongValue == 0 ? '-' : wrongValue + '%';
             
             
            }

            result.push({
              task: exerciseId,
              right: right,
              wrong: wrong,
              progress: Number.isInteger(res.progressByActivityPercentage[exerciseId])? res.progressByActivityPercentage[exerciseId]:res.progressByActivityPercentage[exerciseId].toFixed(2),
              status: res.completedActitiviesList.includes(exerciseId.toString()) ? 'Completed' : 'Pending',
             })
          }
        }
        setReport(result);
      }
    })();
  }, [postwork_id]);

  return (
    <div>
      <AssignmentDetails
        show={true}
        setStatus={setStatus}
        setClassIdValue={setClassIdValue}
        setPostwork={setPostwork}
      >
        <Col
          sm={12}
          className="d-flex align-items-center justify-content-center"
        >
          <div>
            <PieChart score={overallPerformance} />
            <div className="text-center font-weight-bold col-sm-12">
              Overall Performance
            </div>
          </div>
        </Col>
        {!showExerciseView ? (
          <TableView
            report={report}
            status={status}
            classIdValue={classIdValue}
            setExerciseIndexVal={setExerciseIndexVal}
            setShowExerciseView={setShowExerciseView}
          />
        ) : (
          
          <>       
            <Button
              onClick={() => {
                setShowExerciseView(false);
              }}
            >
              {" "}
              Back
            </Button>
            <Assignment
              postwork_id={postwork_id}
              class_id={classIdValue}
              exerciseIndexVal={exerciseIndexVal}
              setShowExerciseView={setShowExerciseView}
              mode={2}
            />
          </>
        )}
      </AssignmentDetails>
    </div>
  );
}

const TableView = ({
  report,
  status,
  classIdValue,
  setExerciseIndexVal,
  setShowExerciseView,
}) => {
  return (
    <Table className="theme-table mt-3 mb-1">
      <thead>
        <th> Task Name</th>
        <th> Progress</th>
        <th> Right Answer</th>
        <th> Wrong Answer</th>
        <th> Status</th>
        <th></th>
      </thead>

      <tbody>
        {report?.map((item, i) => {

          return (
            <tr key={`${i}_Overall_progress`}>
              <td>{EXERCICES_TITLES[item.task]}</td>
              <td>
               
                  <ProgressBar
                    variant="success"
                    className="green-progress progress-lg"
                    label={`${isNaN(item.progress) ? 0 : item.progress}%`}
                    now={isNaN(item.progress) ? 0 : item.progress}
                  />
              </td>
              <td className="text-green">
        
                {
                  item.task == 0 ?
                    '-'
                    : item.right
                    
                }
              </td>
              <td className="text-danger">
                {
                  item.task == 0 ?
                    '-' : item.wrong
                }
              </td>
              <td>
                  <span className={item.status == 'Completed' ? "text-green" : "text-red" }> &#9679; {item.status}</span>
              </td>
              <td>
                <Button
                  variant="primary"
                  className="primary-btn orange-btn sm"
                  onClick={() => {
                    if (classIdValue) {
                      setExerciseIndexVal(i);
                      setShowExerciseView(true);
                    }
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
