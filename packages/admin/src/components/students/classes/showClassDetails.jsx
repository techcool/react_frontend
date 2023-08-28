import classnames from "classnames";
import { formateDate } from "common/src/components/helpers/dateFormatter";
import isBlank from "common/src/components/helpers/isBlank";
import Container, {
  ContainerWithoutHorizontalSpace
} from "common/src/components/shared/container";
import Checkmark from "common/src/images/check_mark";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";
const RedIcon = styledComponents.div`
  border-radius:50%;
  display: inline-block;
  width: 20px;
  height:20px;
  background-color: #f00;
`;
const ShowButton = styledComponents.div`
  &:hover{
    cursor:pointer;
  }
`;

const Show = ({
  name,
  postworks,
  teacherFirstName,
  teacherLastName,
  teacherEmail,
  joinDate,
  PerformanceOnClass,
  class_id
}) => {
  const [note, setNote] = useState("");
  return (
    <Fragment>
      <Container style={ { fontSize: "15px" } }>
        <div className={ classnames("row", "align-items-end", "mb-4", "pb-4") }>
          <div className="col-md-4">
            <h1 className="text-capitalize">{ name }</h1>
            <div>
              Teacher :{ " " }
              <span className="font-weight-bold text-capitalize">
                { teacherFirstName } { teacherLastName }
              </span>
            </div>
            <div>
              Teacher email :{ " " }
              <span className="font-weight-bold">{ teacherEmail }</span>
            </div>
          </div>
        </div>
        <ul className="nav nav-tabs w-100" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#incompleted"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Incomplete
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#completed"
              role="tab"
              aria-selected="false"
            >
              Completed
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#progress" data-toggle="tab">
              Check Progress
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#previous-work" data-toggle="tab">
              Previous Work
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="incompleted"
            role="tabpanel"
          >
            <ContainerWithoutHorizontalSpace>
              <div className="mb-1 mt-4 font-weight-bold">Upcoming</div>
              <PostworksList
                postworks={ postworks.filter(
                  (postwork) =>
                    postwork.submissionsCount === 0 &&
                    new Date(postwork.dueDate) > Date.now() &&
                    new Date(postwork.dueDate) > new Date(joinDate)
                ) }
                setNote={ setNote }
                class_id={ class_id }
              />
              <div
                className="mb-1  font-weight-bold"
                style={ { marginTop: "50px" } }
              >
                Past Due
              </div>
              <PostworksList
                postworks={ postworks.filter(
                  (postwork) =>
                    postwork.submissionsCount === 0 &&
                    new Date(postwork.dueDate) < Date.now() &&
                    new Date(postwork.dueDate) > new Date(joinDate)
                ) }
                setNote={ setNote }
                class_id={ class_id }
              />
            </ContainerWithoutHorizontalSpace>
          </div>
          <div className="tab-pane fade" id="completed" role="tabpanel">
            <ContainerWithoutHorizontalSpace>
              <div className="mb-1 mt-4 font-weight-bold">Completed</div>
              <PostworksList
                postworks={ postworks.filter(
                  (postwork) => postwork.submissionsCount > 0
                ) }
                setNote={ setNote }
                class_id={ class_id }
              />
            </ContainerWithoutHorizontalSpace>
          </div>
          <div className="tab-pane fade" id="progress" role="tabpanel">
            <ContainerWithoutHorizontalSpace>
              <PerformanceOnClass />
            </ContainerWithoutHorizontalSpace>
          </div>
          <div className="tab-pane fade" id="previous-work" role="tabpanel">
            <div className="mb-1 mt-4 font-weight-bold">Previous</div>
            <PostworksList
              postworks={ postworks.filter(
                (postwork) =>
                  postwork.submissionsCount === 0 &&
                  new Date(postwork.dueDate) < new Date(joinDate)
              ) }
              setNote={ setNote }
              class_id={ class_id }
            />
          </div>
        </div>

        <div
          className="modal fade"
          id="noteModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Teacher&apos;s Comments
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                { note ? (
                  note.split("\n").map((text,index) => (
                    <Fragment key={ index }>
                      { text }
                      <br />
                    </Fragment>
                  ))
                ) : (
                  <>Teacher didn&apos;t comment yet.</>
                ) }
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

const PostworksList = ({ postworks, setNote, class_id }) => {
  const { id } = useSelector((state) => state.user);
  const getAttempt = (postwork) => {
    if (postwork?.classes) {
      const _class = postwork.classes.filter((c) => c._id === class_id)[0];
      if (_class?.allStudents) {
        return _class.attempts;
      } else {
        if (_class.students) {
          const student = _class.students.filter((c) => c._id === id)[0];
          if (student) {
            return student.attempts;
          }
        }
      }

      return null;
    }
    return null;
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Title</th>
          <th scope="col">Due date</th>
          <th scope="col">Link</th>
          <th scope="col">Submissions</th>
          <th scope="col">Score</th>
          <th scope="col">Teacher’s Comment</th>
          <th scope="col">Reviewed</th>
        </tr>
      </thead>
      <tbody>
        { postworks.map((postwork, index) => (
          <tr key={ postwork._id }>
            <td>{ index + 1 }</td>
            <td>
              { !postwork.title || isBlank(postwork.title)
                ? postwork.videoTitle
                : `${postwork.title} (${postwork.videoTitle})` }
            </td>
            <td>
              <span
                className={ classnames({
                  "text-danger":
                    postwork.submissionsCount === 0 &&
                    new Date(postwork.dueDate) < Date.now()
                }) }
              >
                { formateDate(postwork.dueDate) }
              </span>
            </td>
            <td>
              <Link
                className="text-dark-blue font-weight-bold"
                to={ `/student/postworks/${postwork._id}/${class_id}` }
              >
                Access
              </Link>
            </td>
            <td>
              { postwork.submissionsCount } of{ " " }
              { getAttempt(postwork) || postwork.attempts || 0 }
            </td>
            <td>{ postwork.score }%</td>
            <td>
              <ShowButton
                className={ classnames(
                  "font-weight-bold",
                  { "text-dark-blue": postwork.teacherNote },
                  { "text-black": !postwork.teacherNote }
                ) }
                onClick={ () => setNote(postwork.teacherNote) }
                data-toggle="modal"
                data-target="#noteModal"
              >
                Show
              </ShowButton>
            </td>
            <td>
              { postwork.reviewed ? (
                <Checkmark
                  style={ {
                    width: "20px",
                    height: "20px"
                  } }
                />
              ) : (
                <RedIcon />
              ) }
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};

export default Show;
