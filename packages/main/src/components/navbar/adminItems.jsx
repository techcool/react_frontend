import profile from "common/src/images/profile.svg";
import { RESET_STORE } from "common/src/old-api/types";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AdminsItems = () =>{
  const dispatch = useDispatch();
  return(
    <Fragment>
      <li className="nav-item mx-2">
        <Link to="/admin/home" className="text-dark">
          Home
        </Link>
      </li>
      <li className="nav-item mx-2">
        <Link to="/admin/coupons" className="text-dark">
          Coupons
        </Link>
      </li>
      <li className="dropdown mx-2">
        <Link
          to="#"
          className="dropdown-toggle count-info text-dark"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Emails
        </Link>
        <ul className="dropdown-menu" style={ { fontSize: "13px" } }>
          <li>
            <Link className="dropdown-item" to="/admin/emails/send_reminder_emails">
              Edit Reminder Emails
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/emails/send_email">
              Send Emails
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/emails/send_verification_emails">
              Send Verification Emails
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/emails/welcome" >
              Welcoming Email
            </Link>
          </li>
        </ul>
      </li>
      <li className="dropdown mx-2">
        <Link
          to="#"
          className="dropdown-toggle count-info text-dark"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Reports
        </Link>
        <ul className="dropdown-menu" style={ { fontSize: "13px" } }>
          <li>
            <Link className="dropdown-item" to="/admin/reports/registrations" >
              Registration
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/time" >
              Time
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/assignments_creation" >
              Assignments creation
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/assignments_completion">
              Assignments completion
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/practice">
              Practice
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/logins">
              Logins
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/created_classes">
              Created classes
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/who_was_disconnected">
              Who was offline ?
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/activites_report">
              Activities report
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/videos_assignments_report">
              Videos assignments report
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/reports/paid_subscribers">
              Paid subscribers
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/how_they_heard_about_us">
              How did they hear about us ?
            </Link>
          </li>
        </ul>
      </li>

      <li className="nav-item mx-2">
        <Link to="/admin/users/" className="text-dark">
          Users
        </Link>
      </li>
      <li className="dropdown mx-2">
        <Link
          to="#"
          className="dropdown-toggle count-info text-dark"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Videos
        </Link>
        <ul className="dropdown-menu" style={ { fontSize: "13px" } }>
          <li>
            <Link to="/admin/videos/" >
              List
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/videos/new" >
              Add
            </Link>
          </li>
        </ul>
      </li>
      <li className="dropdown mx-2">
        <Link
          className="dropdown-toggle count-info text-dark"
          aria-expanded="false"
          data-toggle="dropdown"
          to="#"
          onClick={ () => { } }
        >
          <img
            style={ {
              width: "25px",
              height: "25px"
            } }
            src={ profile }
          />
        </Link>
        <ul className="dropdown-menu " style={ { fontSize: "13px" } }>
          <li>
            <Link className="dropdown-item" to="#" onClick={ () => dispatch({ type:RESET_STORE }) }>
              <i className="fa fa-sign-out" /> Logout
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/account/change_password">
              <i className="fa fa-user-o"></i> Change Password
            </Link>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default AdminsItems;
