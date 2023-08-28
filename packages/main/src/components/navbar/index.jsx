import classnames from "classnames";
import logo from "common/src/images/logo.jpg";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminsItems from "./adminItems";
import DefaultItems from "./defaultItems";
import SchoolItems from "./schoolItems";
import StudentsItems from "./studentsItems";
import TeachersItems from "./teachersItems";


const Navbar = ({ logout }) => {
  const { loggedIn=false,role=null }=useSelector(state=>state.user);
  if (!loggedIn)  return <DefaultItems />;

  return (
    <nav
      className={ classnames(
        "navbar", "navbar-static-top", "bg-white", "border-bottom",
        "navbar-expand-md"
      )
      }
      role="navigation"
      style={ { marginBottom: "50px", fontSize: "15px" } }
    >
      <Link className="navbar-brand minimalize-styl-2" to={
        loggedIn && role === "student"
          ? "/student/home"
          : "/"
      }>
        <img alt="Logo" src={ logo } style={ { width: "auto", height: "90px" } } />
      </Link>

      <button
        className="btn m-3 d-md-none"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars" />
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav app-navbar-nav px-3 ml-auto align-items-center mt-2 mt-lg-0 font-weight-bold">
          { loggedIn && role === "teacher" && <TeachersItems logout={ logout } /> }
          { loggedIn && role === "student" && <StudentsItems /> }
          { loggedIn && role === "admin" && <AdminsItems  /> }
          { loggedIn && role ==="school_admin" && <SchoolItems  /> }
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
