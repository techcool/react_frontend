import { TeacherAccount } from "common/src/pages/account";
import {
  ChangeTeacherPassword as TeacherChangePassword
} from "common/src/pages/changePassword";
import {
  updateTeacherAccount as TeacherAccountUpdate
} from "common/src/pages/updateAccount";
import TeacherChangeEmail from "common/src/pages/updateEmail";
import React from "react"; 

const TeachersHome =React.lazy(()=>import("./pages/home"));
const TeacherCreateClasswithClassroom =React.lazy(()=>import("./pages/createClasswithClassroom"));
const StudentList= React.lazy(()=>import("./pages/studentsList"));
const TeacherClassesShow= React.lazy(()=>import("./pages/classDetails"));
const TeacherClassesIndex= React.lazy(()=>import("./pages/classesList"));
const TeacherReportsOverallPerformanceOnClass= React.lazy(()=>
  import("./pages/overallPerformanceOnClass"));
const TeacherClassTile= React.lazy(()=>import("./pages/classListTile"));
const AssignVideo= React.lazy(()=>import("./pages/assignVideo"));
const StudentOverAllPerformance= React.lazy(()=>import("./pages/singlePerformance"));
const TeacherInvite= React.lazy(()=>import("./pages/studentsInvite"));
const StudentPerformanceByAssignment= React.lazy(()=>import("./pages/studentPerformanceByAssignment"));
const Videos= React.lazy(()=>import("./pages/videos"));
const AllVideos= React.lazy(()=>import("./pages/videosAll")) ;
const PostworkDetails= React.lazy(()=>import("./pages/assignmentDetails"));
const CreateAssignment= React.lazy(()=>import("./pages/assignmentCreate"));
const Stats= React.lazy(()=>import("./pages/classStats"));
const AssignmentsStats= React.lazy(()=>import("./pages/assignmentsStats"));
const StudentStats= React.lazy(()=>import("./pages/studentStats"));
const VideoStatsList= React.lazy(()=>import("./pages/videoStatsList"));
const VideoStats= React.lazy(()=>import("./pages/videoStats"));
const TeacherPayments= React.lazy(()=>import("./pages/payments"));

const StudentDetails= React.lazy(()=>import("./pages/studentProfile"));
const AssignmentStats= React.lazy(()=>import("./pages/assignmentStats"));
const Subscriptions= React.lazy(()=>import("./pages/subscriptions"));
const PostworkList= React.lazy(()=>import("./pages/assignmentsList"));

const Contest= React.lazy(()=>import("./pages/shoutout"));
const TeacherHomeworksStudentsAnswers= React.lazy(()=>import("common/src/pages/exercisePages/reviewPage"));
const VideosPractice= React.lazy(()=>import("common/src/pages/exercisePages/practicePage"));
const VideoMonthByMonth= React.lazy(()=>import("./pages/monthByMonth"));

const pages=[  
  { path:"home", component:TeachersHome },
  { path:"classes/new",component:TeacherCreateClasswithClassroom },
  { path:"classes/:class_id/show",component:TeacherClassesShow },
  { path:"classes", component:TeacherClassesIndex },
  { path:"class", component:TeacherClassTile },
  { path:"stats", component:Stats },
  
  { path:"invite", component:TeacherInvite },
  { path:"students", component:StudentList },
  { path:"student/:id", component:StudentDetails },
  { path:"postwork", component:PostworkList },
  { path:"postworks/stats",component:AssignmentsStats },
  { path:"postworks/:id",component:AssignmentStats },
  { path:"homework/:postwork_id",component:PostworkDetails },
  { path:"progress/:postwork_id/students/:student_id",component:TeacherHomeworksStudentsAnswers },
  { path:"reports/classes/:class_id/students/:student_id/",component:StudentPerformanceByAssignment },
  { path:"reports/classes/:class_id/",component:TeacherReportsOverallPerformanceOnClass },

  { path:"videos/list", component:VideoStatsList },
  { path:"video/favorites", component:Videos },
  { path:"video/watched",component:Videos },
  { path:"video/recommended",component:Videos },
  { path:"videos/stats/:id", component:VideoStats },
  { path:"videos/all", component:AllVideos },
  { path:"videos/:video_id/practice",component:VideosPractice },

  { path:"student-stats", component:StudentStats },
  { path:"account/update",component:TeacherAccountUpdate },
  { path:"account/subscription",component:Subscriptions },
  { path:"performance/class/:class_id/student/:student_id",component:StudentOverAllPerformance },
  { path:"contest", component:Contest },
  { path:"account/change_email",component:TeacherChangeEmail },
  { path:"account", component:TeacherAccount },
  { path:"payments", component:TeacherPayments },
  { path:"assign", component:AssignVideo },
  { path:"create-assignment",component:CreateAssignment },
  { path:"months", component:VideoMonthByMonth },
  { path:"account/change_password",component:TeacherChangePassword },
  { path:"verify-invite/:token",component:TeachersHome }
];

export default pages;
