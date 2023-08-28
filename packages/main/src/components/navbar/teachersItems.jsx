import profile from "common/src/images/profile.svg";
import { RESET_STORE } from "common/src/old-api/types";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TeachersItems = () =>{
  const dispatch= useDispatch();
  return (
    <Fragment>
      <div className="ml-auto d-flex align-items-center">
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
                width: "50px",
                height: "50px"
              } }
              src={ profile }
            />
          </Link>
          <ul className="dropdown-menu dropdown-alerts" style={ { fontSize: "13px" } }>
            <li>
              <Link className="dropdown-item" to="#" onClick={ () => dispatch({ type:RESET_STORE }) }>
                <i className="fa fa-sign-out" /> Logout
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/teacher/account">
                <i className="fa fa-user-o"></i> Account
              </Link>
            </li>
          </ul>
        </li>
      </div>
    </Fragment>
  );
};

export default TeachersItems;
