import SchoolCreatedPassword from "./components/freeTrial/schoolCreatePassword";
import SchoolSignup from "./components/freeTrial/schoolsignup";
import StudentSignup from "./components/freeTrial/studentSignup";
import InfomationSteps from "./containers/freeTrial/userInfo";
import Login from "./containers/guests/login";
import OtpVerification from "./containers/guests/otpVerification";
import ResetPassword from "./containers/guests/resetPassword";
import ResetPasswordRequest from "./containers/guests/resetPasswordRequest";
import JoinAClassWithSignup from "./containers/joinAClassWithSignup";

const pages=[
  { path:"/teacher-signup",component:InfomationSteps },
  { path:"/login",component:Login },
  { path:"/student-join-a-class",component:JoinAClassWithSignup },
  { path:"/student-signup",component:StudentSignup },
  { path:"/school-signup",component:SchoolSignup }, 
  { path:"/school-createpassword",component:SchoolCreatedPassword },
  { path:"/forgot-password",component:ResetPasswordRequest },
  { path:"/otp-verification",component:OtpVerification },
  { path:"/change-password",component:ResetPassword }, 
  { path:"/reset_password_request",component:ResetPasswordRequest },
  { path:"/reset_password", component:ResetPassword },
  { path:"/", component:Login }
];



export default pages;
