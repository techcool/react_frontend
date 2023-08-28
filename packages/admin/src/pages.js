import AdminCoupons from "./containers/admin/coupons/index";
import AdminSendEditNotificationsEmail from "./containers/admin/emails/editNotificationEmailsContainer";
import AdminEditEmails from "./containers/admin/emails/editWelcomeEmail";
import AdminSendEmail from "./containers/admin/emails/sendEmail";
import AdminSendVerificationsEmail from "./containers/admin/emails/sendVerificationsEmails";
import AdminHome from "./containers/admin/home";
import AdminReportsActivities from "./containers/admin/reports/activitiesReport";
import AdminReportsAssignmentsCompletion from "./containers/admin/reports/assignmentsCompletion";
import AdminReportsAssignmentsCreation from "./containers/admin/reports/assignmentsCreation";
import AdminReportsCreatedClasses from "./containers/admin/reports/createdClasses";
import AdminReportHowTheyHeardAboutUs from "./containers/admin/reports/how_they_heard_about_us";
import AdminReportsLogins from "./containers/admin/reports/logins";
import AdminReportsPaidSubscribers from "./containers/admin/reports/paidSubscribers";
import AdminReportsPractice from "./containers/admin/reports/practice";
import AdminReportsRegistrations from "./containers/admin/reports/registrations";
import AdminReportsStudent from "./containers/admin/reports/student";
import AdminReportsTeacher from "./containers/admin/reports/teacher";
import AdminReportsTime from "./containers/admin/reports/time";
import AdminReportUserActivities from "./containers/admin/reports/userActivity";
import AdminReportsVideosAssignments from "./containers/admin/reports/videosAssignments";
import AdminReportsWhoWasDisconnected from "./containers/admin/reports/whoWasDisconnected";
import AdminUsersIndex from "./containers/admin/users/index";
import AdminUsersShow from "./containers/admin/users/show";
import {
  EditVideo as AdminVideosEdit,
  NewVideo as AdminVideosNew
} from "./containers/admin/videos/createEdit";
import AdminVideosIndex from "./containers/admin/videos/index";


import {
  ChangeAdminPassword as AdminChangePassword
} from "./containers/users/changePassword";


const pages = [{
  path: "home",
  component: AdminHome
},
{
  path: "users/:user_id",
  component: AdminUsersShow
},
{
  path: "users/",
  component: AdminUsersIndex
},
{
  path: "videos/new",
  component: AdminVideosNew
},
{
  path: "videos/:video_id",
  component: AdminVideosEdit
},
{
  path: "videos/",
  component: AdminVideosIndex
},
{
  path: "reports/student/:account_id",
  component: AdminReportsStudent
},
{
  path: "reports/teacher/:account_id",
  component: AdminReportsTeacher
},
{
  path: "reports/users/:account_id",
  component: AdminReportUserActivities
},
{
  path: "reports/registrations",
  component: AdminReportsRegistrations
},
{
  path: "reports/time",
  component: AdminReportsTime
},
{
  path: "reports/logins",
  component: AdminReportsLogins
},
{
  path: "reports/paid_subscribers",
  component: AdminReportsPaidSubscribers
},
{
  path: "reports/assignments_creation",
  component: AdminReportsAssignmentsCreation
},
{
  path: "reports/assignments_completion",
  component: AdminReportsAssignmentsCompletion
},
{
  path: "reports/created_classes",
  component: AdminReportsCreatedClasses
},
{
  path: "reports/practice",
  component: AdminReportsPractice
},
{
  path: "reports/who_was_disconnected",
  component: AdminReportsWhoWasDisconnected
},
{
  path: "reports/activites_report",
  component: AdminReportsActivities
},
{
  path: "reports/videos_assignments_report",
  component: AdminReportsVideosAssignments
},
{
  path: "emails/send_email",
  component: AdminSendEmail
},
{
  path: "emails/send_verification_emails",
  component: AdminSendVerificationsEmail
},
{
  path: "emails/send_reminder_emails",
  component: AdminSendEditNotificationsEmail
},
{
  path: "emails/:type",
  component: AdminEditEmails
},
{
  path: "coupons",
  component: AdminCoupons
},
{
  path: "account/change_password",
  component: AdminChangePassword
},
{
  path: "how_they_heard_about_us",
  component: AdminReportHowTheyHeardAboutUs
}
];
export default pages;
