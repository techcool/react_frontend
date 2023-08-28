import guestPages from "guest/src/pages";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import RoutesContainer from "./routesContainer";

const GuestRoutes=()=>{
  const { loggedIn, role } = useSelector((state) => state.user);
  if (loggedIn) return <Redirect to={ `/${role}/home` } />; 
  return(
    <RoutesContainer>
      { guestPages.map((route,index)=><Route 
        key={ index } path={ route.path } exact component={ route.component } /> ) }
    </RoutesContainer>
  );
};


export default GuestRoutes;
