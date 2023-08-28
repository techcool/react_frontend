import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import studentPages from "student/src/pages";
import RoutesContainer from "./routesContainer";

const StudentRoutes = () => {
  const { loggedIn, role } = useSelector((state) => state.user);
  if (!loggedIn || role !== "student") return <Redirect to="/login" />;
  return (
    <RoutesContainer>
      { studentPages.map((route,index) => <Route 
        key={ index } path={ `/student/${route.path}` } 
        exact 
        component={ route.component } />) }
    </RoutesContainer>
  );
};

export default StudentRoutes;
