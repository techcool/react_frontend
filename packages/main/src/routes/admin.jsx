import adminPages from "admin/src/pages";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import RoutesContainer from "./routesContainer";

const AdministratorRoutes = () => {
  const { loggedIn, role } = useSelector((state) => state.user);
  if (!loggedIn || role !== "admin") return <Redirect to="/login" />;
  return (
    <RoutesContainer>
      { adminPages.map((route,index )=> <Route 
        key={ index } path={ `/admin/${route.path}` } exact component={ route.component } />) }
    </RoutesContainer>
  );
};

export default AdministratorRoutes;
