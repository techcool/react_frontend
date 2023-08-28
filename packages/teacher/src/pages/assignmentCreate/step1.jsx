import React from "react";
import Home from "../home";
export default function Step1(props) {
  const handleStep = (data) => {
    props.setStep(1, data);
  };
  return (
    <div>
      <Home from="stepper" handleEvents={ { handleStep: handleStep } } />
    </div>
  );
}
