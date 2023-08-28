import React, { useState, useEffect } from 'react'
import Stepper from "react-stepper-horizontal";

export default function QuestionsStepper({
    activeStep,
    totalSteps
}) {

    const [stepsTiltle, setStepsTiltle] = React.useState([]);

    const getSteps = () => {
        let stepsTiltleClone = [];
        for (let i = 0; i < totalSteps; i++) {
            stepsTiltleClone.push({ title: '' });
        }
        setStepsTiltle(stepsTiltleClone);
    }

    useEffect(() => {
        getSteps()
    }, []);

    return (
        <div  className="col-md-6 px-0 mx-auto">
        <Stepper
            activeColor="#13BBED"
            completeColor="#13BBED"
            completeTitleColor="#13BBED"
            activeTitleColor="#13BBED"
            activeBorderColor="#13BBED"
            completeBorderColor="#13BBED"
            completeBarColor="#13BBED"
            steps={stepsTiltle}
           
            activeStep={activeStep}
        />
        </div>
    )
}
