import React,{ Suspense } from "react";
import Loader from "react-loader-spinner";
import {  Switch } from "react-router-dom";

const RoutesContainer = ({ children })=>
  <Suspense fallback={
    <Loader
      type="ThreeDots"
      color="#00BFFF"
      height={ 100 }
      width={ 100 }
    /> }>
    <Switch>
      { children }
    </Switch>
  </Suspense>;

export default RoutesContainer;
