import profile from "common/src/images/profile.svg";
import { RESET_STORE } from "common/src/old-api/types";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const StudentsItems = () =>{
  const dispatch= useDispatch();
  return (
    <Fragment>
      { /* <li className="nav-item mr-3">
      <a
        target='_blank'
        rel="noopener"
        href='https://www.learnlit.online/demos#block-yui_3_17_2_1_1593791930175_7174'
        className='text-dark'
      >
        Demos
      </a>
    </li> */ }
      { /* <li className="nav-item mr-3">
      <Link to="/student/home" className='text-dark'>
        Digital library
      </Link>
    </li> */ }
      { /* <li className="nav-item mr-3">
      <Link to="/student/reports/practice" className='text-dark'>
        Progress
      </Link>
    </li> */ }
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
          <ul className="dropdown-menu" style={ { fontSize: "13px" } }>
            <li>
              <Link className="dropdown-item" to="#" onClick={ () => dispatch({ type:RESET_STORE }) }>
                <i className="fa fa-sign-out" /> Logout
              </Link>
            </li>
            <li>
              <Link to="/student/account" className="dropdown-item">
                <i className="fa fa-user-o"></i> Account
              </Link>
            </li>
          </ul>
        </li>
      </div>
    </Fragment>
  );
};

export default StudentsItems;
