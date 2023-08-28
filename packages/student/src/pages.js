import { StudentAccount  } from "common/src/pages/account";
import {
  ChangeStudentPassword as StudentChangePassword
} from "common/src/pages/changePassword";
import {
  updateStudentAccount as StudentAccountUpdate
} from "common/src/pages/updateAccount";
import StudentChangeEmail from "common/src/pages/updateEmail";
import React from "react";

const Videos =React.lazy(()=>import("./pages/videos"));

const VideosPractice = React.lazy(()=>import("common/src/pages/exercisePages/practicePage"));
const Assignment = React.lazy(()=>import("common/src/pages/exercisePages/assignementPage"));

const StudentAssignmentDetails =React.lazy(()=>import("./pages/assignmentDetails"));
const AssignmentResultOverallPerformance =React.lazy(()=>
  import("./pages/assignmentResultOverallPerformance"));
const StudentClassesIndex= React.lazy(()=>import("./pages/classesList"));
const StudentHome =React.lazy(()=>import("./pages/home"));
const StudentClassesNew = React.lazy(()=>import("./pages/joinNewClass"));
const VideoMonthByMonth =React.lazy(()=>import("./pages/monthByMonth")) ;
const StudentReportsPerformanceOnPractice = React.lazy(()=>import("./pages/performanceOnPractice"));
const StudentReportsPerformanceOnClass = React.lazy(()=>import("./pages/performanceOnClass"));
const StudentVideos =React.lazy(()=>import("./pages/studentAllVideos"));
const StudentAssignmentsWithFilter=React.lazy(()=>import("./pages/studentAssignmentswithFilter"));
const StudentClassDetails =React.lazy(()=>import("./pages/studentClassDetailsAll"));
const StudentMyProgress =React.lazy(()=>import("./pages/studentMyProgress"));


const pages=[
  { path:"video/favorites", component:Videos },
  { path:"video/watched", component:Videos },
  { path:"video/recommended",component:Videos },
  { path:"months", component:VideoMonthByMonth },
  { path:"home", component:StudentHome },
  { path:"classes/new",component:StudentClassesNew },
  { path:"classes/:class_id/show",component:StudentClassDetails },
  { path:"assignments",component:StudentAssignmentsWithFilter },
  { path:"assignment/:postwork_id/show",component:StudentAssignmentDetails },
  { path:"assignment/:postwork_id/result",component:AssignmentResultOverallPerformance },
  { path:"progress/mine",component:StudentMyProgress },
  { path:"classes", component:StudentClassesIndex },
  { path:"videos/all", component:StudentVideos },
  { path:"videos/:video_id/practice",component:VideosPractice },
  { path:"reports/classes/:class_id/",component:StudentReportsPerformanceOnClass },
  { path:"reports/practice",component:StudentReportsPerformanceOnPractice },
  { path:"account/update",component:StudentAccountUpdate },
  { path:"account/change_password",component:StudentChangePassword },
  { path:"account/change_email",component:StudentChangeEmail },
  { path:"account", component:StudentAccount },
  { path:"postworks/:postwork_id/:class_id",component:Assignment }
];

export default pages;
