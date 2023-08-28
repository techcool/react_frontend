import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import teacherPages from "teacher/src/pages";
import RoutesContainer from "./routesContainer";

const TeacherRoutes = () => {
  const { loggedIn, role } = useSelector((state) => state.user);
  if (!loggedIn || role !== "teacher") return <Redirect to="/login" />;
  return (
    <RoutesContainer>
      { teacherPages.map((route,index )=> <Route 
        key={ index } 
        path={ `/teacher/${route.path}` } 
        exact
        component={ route.component } 
      />) }
    </RoutesContainer>
  );
};

export default TeacherRoutes;
