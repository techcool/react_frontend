import profile from "common/src/images/profile.svg";
import message_icon from "common/src/images/Top_bar_icon/message.svg";
import bell from "common/src/images/Top_bar_icon/notification.svg";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SchoolItems = ({ classes, logout }) => (
  <Fragment>
    <li className="nav-item mr-4">
      <Link className="text-dark" to="#">
        <span style={ { color: "rgb(40, 194, 234)" } } className="nav-active">
          <svg
            width="20"
            height="18"
            className="mr-2"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66699 5.00065C1.66699 5.00065 2.91699 3.33398 5.83366 3.33398C8.75033 3.33398 10.0003 5.00065 10.0003 5.00065V16.6673C10.0003 16.6673 8.75033 15.834 5.83366 15.834C2.91699 15.834 1.66699 16.6673 1.66699 16.6673V5.00065Z"
              stroke="#5B5D63"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 5.00065C10 5.00065 11.25 3.33398 14.1667 3.33398C17.0833 3.33398 18.3333 5.00065 18.3333 5.00065V16.6673C18.3333 16.6673 17.0833 15.834 14.1667 15.834C11.25 15.834 10 16.6673 10 16.6673V5.00065Z"
              stroke="#5B5D63"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Lessons
        </span>
      </Link>
    </li>
    <li className="nav-item mr-4">
      <Link to="#" className="text-dark">
        <svg
          width="20"
          height="18"
          className="mr-2"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47719 15.5228 0 10 0C4.47719 0 0 4.47719 0 10C0 15.5228 4.47719 20 10 20ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z"
            fill="#5B5D63"
          />
          <path
            d="M7.60039 7.60008C7.60039 5.20008 12.4004 4.60008 12.2004 7.20008C12.2004 9.00008 9.00039 9.80008 9.00039 11.8001V13.2001H11.0004V12.4001C11.0004 10.6001 14.4004 10.0001 14.4004 7.00008C14.0004 2.60008 5.40039 2.60008 5.40039 7.60008H7.60039V7.60008ZM9.00039 14.0001H11.0004V16.0001H9.00039V14.0001V14.0001Z"
            fill="#5B5D63"
          />
        </svg>
        How it Works
      </Link>
    </li>
    { /* <li className="nav-item mr-4">
      <Link to="#" className='text-dark'>
      <svg width="20" height="20" className="mr-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2L9.80006 2.08342L1.81539 5.76114L0 6.58397L1.05717 7.0494V14.7333C0.675822 15.038 0.418397 15.5939 0.418397 16.2437C0.418397 16.7095 0.552995 17.1562 0.792581 17.4856C1.03217 17.815 1.35712 18 1.69594 18C2.03477 18 2.35972 17.815 2.59931 17.4856C2.83889 17.1562 2.97349 16.7095 2.97349 16.2437C2.97349 15.5939 2.71606 15.038 2.33472 14.7333V7.65532L3.61226 8.23052V12.7311C3.61226 13.4512 3.93165 14.0483 4.31108 14.461C4.69051 14.8711 5.16193 15.1609 5.72788 15.4209C6.86107 15.939 8.35452 16.2437 10 16.2437C11.6455 16.2437 13.1389 15.9398 14.2721 15.42C14.8381 15.1609 15.3095 14.8711 15.6889 14.4602C16.0683 14.0483 16.3877 13.4512 16.3877 12.7311V8.23052L18.1846 7.40681L20 6.58397L18.184 5.76026L10.1993 2.08342L10 2ZM10 3.83974L15.9885 6.58397L10 9.32821L4.0115 6.58397L10 3.83974ZM4.88981 8.83469L9.8007 11.0845L10 11.1671L10.1999 11.0836L15.1102 8.83381V12.7311C15.1102 12.7398 15.1127 12.8417 14.9103 13.0604C14.7084 13.2799 14.3462 13.5565 13.8722 13.7743C12.9256 14.2072 11.5299 14.4874 10 14.4874C8.47014 14.4874 7.07442 14.2081 6.12712 13.7734C5.65442 13.5565 5.2916 13.279 5.08975 13.0604C4.88662 12.8408 4.88981 12.7398 4.88981 12.7311V8.83381V8.83469Z" fill="#5B5D63"/>
</svg>
        Classes
      </Link>
    </li> */ }
    { /* <li className="nav-item mx-2">
      <Link to="/teacher/reports/practice" className="text-dark">
        Progress
      </Link>
    </li> */ }
    <li className="dropdown mx-2">
      { /* <Link
        to="#"
        aria-expanded="false"
        className="dropdown-toggle count-info text-dark"
        data-toggle="dropdown"
      >
        Classes
      </Link> */ }
    </li>
    <div className="ml-auto d-flex align-items-center">
      <li className="nav-item mx-3">
        <Link className="text-dark" to="#">
          <span
            style={ { color: "rgb(40, 194, 234)" } }
            className="position-relative"
          >
            <img src={ message_icon } height="22px" alt="" />
            <span className="badge badge-danger notif-badge">9</span>
          </span>
        </Link>
      </li>
      <li className="nav-item mx-3">
        <Link className="text-dark" to="#">
          <span
            style={ { color: "rgb(40, 194, 234)" } }
            className="position-relative"
          >
            <img src={ bell } height="22px" alt="" />
            <span className="badge badge-danger notif-badge">6</span>
          </span>
        </Link>
      </li>
      <li className="dropdown mx-2">
        <Link
          className="dropdown-toggle count-info text-dark"
          aria-expanded="false"
          data-toggle="dropdown"
          to="#"
          onClick={ () => {} }
        >
          <img
            alt=""
            style={ {
              width: "50px",
              height: "50px"
            } }
            src={ profile }
          />
        </Link>
        <ul
          className="dropdown-menu dropdown-alerts"
          style={ { fontSize: "13px" } }
        >
          <li>
            <Link className="dropdown-item" to="#" onClick={ () => logout() }>
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

export default SchoolItems;
