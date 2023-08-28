import { formateDate } from "common/src/components/helpers/dateFormatter";
import React from "react";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";

const Button = styledComponents.div`
&:hover{
  cursor: pointer;
}
margin : 20px 0px;
`;

const UserActivityPage = ({ firstName, lastName, email, role, isTutor, classes, selectClass }) =>
  <div>
    <div>
      Name : { firstName }{ " " }{ lastName }
      <br />
      Email: { email }
      <br />
      Role: {
        role === "teacher" && isTutor
          ?
          "Tutor"
          :
          role === "teacher"
            ?
            "Teacher"
            :
            role === "student"
              ?
              "Student"
              :
              null
      }
      {
        role === "student" &&
          <>
            <br />
            <Button
              className="font-weight-bold text-dark-blue"
              onClick={ () => selectClass(null) }
            >
              Practice Activities Performance
            </Button>
          </>
      }
    </div>
    {
      role === "teacher" &&
        <CreatedClassesTable { ...{ classes, selectClass } } />
    }
    {
      role === "student" &&
        <JoinedClassesTable { ...{ classes, selectClass } } />
    }
  </div>;

const CreatedClassesTable = ({ classes, selectClass }) =>
  <table className="table">
    <thead>
      <tr>
        <td>
          Class names
        </td>
        <td>
          Grades
        </td>
        <td>
          Creation dates
        </td>
        <td>
          Students Count
        </td>
        <td>
          Is removed ?
        </td>
        <td>
          Actions
        </td>
      </tr>
    </thead>
    <tbody>
      {
        classes.map((c, index) =>
          <tr>
            <td>
              { c.name }
            </td>
            <td>
              { c.grade === -1 ? "other" : c.grade }
            </td>
            <td>
              { formateDate(c.creationDate) }
            </td>
            <td>
              { c.studentsCount }
            </td>
            <td>
              { c.deleted && "Removed" }
            </td>
            <td>
              <Button
                className="font-weight-bold text-dark-blue"
                onClick={ () => selectClass(c._id) }
              >
                View Class
              </Button>
            </td>
          </tr>
        )
      }
    </tbody>
  </table>;

const JoinedClassesTable = ({ classes, selectClass }) =>
  <table className="table">
    <thead>
      <tr>
        <td>
          Teachers
        </td>
        <td>
          Class names
        </td>
        <td>
          Grades
        </td>
        <td>
          Creation dates
        </td>
        <td>
          Joined
        </td>
        <td>
          Is class removed ?
        </td>
        <td>
          Actions
        </td>
      </tr>
    </thead>
    <tbody>
      {
        classes.map((c, index) =>
          <tr>
            <td>
              <Link
                className="font-weight-bold text-dark-blue"
                to={ `/admin/reports/users/${c.teacherId}` }
              >
                { `${c.teacherFirstName} ${c.teacherLastName}` }
              </Link>
              <br />
              Email : { c.teacherEmail }
            </td>
            <td>
              { c.name }
            </td>
            <td>
              { c.grade === -1 ? "other" : c.grade }
            </td>
            <td>
              { formateDate(c.creationDate) }
            </td>
            <td>
              { formateDate(c.joinDate) }
            </td>
            <td>
              { c.deleted && "Removed" }
            </td>
            <td>
              <Button
                className="font-weight-bold text-dark-blue"
                onClick={ () => selectClass(c._id) }
              >
                View Class
              </Button>
            </td>
          </tr>
        )
      }
    </tbody>
  </table>;

export default UserActivityPage;
