import Container from "common/src/components/shared/container";
import { StudentGrades } from "common/src/constants";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const Capital = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

const UserAccount =
  ({ editProfileLink, editPasswordLink, editEmailLink, grades }) =>
    ({
      firstName,
      lastName,
      email,
      school,
      schoolType,
      schoolDistrict,
      grade,
      role,
      isTutor,
      username,
      subscriptiondetails
    }) =>
      (
        <Container>
          <div className="my-3 mb-4 font-weight-bold h4 text-black border-bottom pb-4">
            Account
          </div>
          <Container>
            <table className="table">
              <tbody>
                <tr>
                  <td className="font-weight-bold border-top-0">Email</td>
                  <td className="border-top-0">{ email }</td>
                  <td className="border-top-0">
                    <Link
                      className="text-dark-blue font-weight-bold"
                      to={ editEmailLink }
                    >
                      Change email
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Password</td>
                  <td>**********</td>
                  <td>
                    <Link
                      className="text-dark-blue font-weight-bold"
                      to={ editPasswordLink }
                    >
                      Change password
                    </Link>
                
                  </td>
                </tr>
                <tr>
                  <td className="font-weight-bold">My profile</td>
                  <td>
                    <div>
                      <span className="font-weight-bold">First Name : </span>
                      { Capital(firstName) }
                    </div>
                    <div>
                      <span className="font-weight-bold">Last Name : </span>
                      { Capital(lastName) }
                    </div>
                    <div>
                      <span className="font-weight-bold">User Name : </span>
                      { username ? username : "-NA-" }
                    </div>
                    <div>
                      <span className="font-weight-bold">School : </span>
                      { Capital(school) }
                    </div>
                    <div>
                      <span className="font-weight-bold">Account type : </span>
                      { role === "teacher" && isTutor
                        ? "Tutor"
                        : role === "teacher"
                          ? "Teacher"
                          : role === "student" && "Student" }
                    </div>
                    <div>
                      <span className="font-weight-bold">Grade : </span>
                      { grades.some((g) => g.value === grade)
                        ? grades.filter((g) => g.value === grade)[0].label
                        : "Not defined" }
                    </div>
                  
                  </td>
                  <td>
                    <Link
                      to={ editProfileLink }
                      className="text-dark-blue font-weight-bold"
                    >
                      Edit profile
                    </Link>
                  </td>
                </tr>
                {
                  subscriptiondetails && (
                    <tr>
                      <td className="font-weight-bold">My Subscription</td>
                      <td>
                        <div>
                          <span className="font-weight-bold">Package : </span>
                          { Capital(subscriptiondetails.package) }
                        </div>
                        <div>
                          <span className="font-weight-bold">Active : </span>
                          { subscriptiondetails.isActive ? "Yes" : "No" }
                        </div>
                        <div>
                          <span className="font-weight-bold">Start Date : </span>
                          { subscriptiondetails.startDate ? moment(subscriptiondetails.startDate).format("YYYY-MM-DD"): "-NA-" }
                        </div>
                        <div>
                          <span className="font-weight-bold">Expire Date : </span>
                          { subscriptiondetails.expireDate ? moment(subscriptiondetails.expireDate).format("YYYY-MM-DD"): "-NA-" }
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </Container>
        </Container>
      );

export const StudentAccountPage = UserAccount({
  editProfileLink: "/student/account/update",
  editPasswordLink: "/student/account/change_password",
  editEmailLink: "/student/account/change_email",
  grades: StudentGrades
});

export const TeacherAccountPage = UserAccount({
  editProfileLink: "/teacher/account/update",
  editPasswordLink: "/teacher/account/change_password",
  editEmailLink: "/teacher/account/change_email",
  grades: StudentGrades
});
