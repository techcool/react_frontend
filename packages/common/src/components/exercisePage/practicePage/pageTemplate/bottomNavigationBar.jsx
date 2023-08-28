import React, { Fragment } from "react";
import ArrowCircle from "common/src/images/arrow_circle";
import styledComponents from "styled-components";
import Closing from "../../assignementPage/showExerciseContent/exercises/closing";

const ButtonContainer = styledComponents.div`
-webkit-touch-callout: none;
  -webkit-user-select: none; 
   -khtml-user-select: none; 
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
          cursor: pointer;
`;

const BottomNavigationBar = ({
  onBackButtonClick,
  onNextButtonClick,
  exerciseIndex,
  totalExercises,
  questionIndex,
  newTotalQuestion,
  mode,
  isFrom,
  AdditionalPanelItems = () => <Fragment />,
  ...methods
}) => {
  
  return (
    <div className="d-flex justify-content-between align-items-center mt-4 pb-2">
      {exerciseIndex != 0 && (
        <ButtonContainer
          className="primary-btn sm primary-btn-outline"
          onClick={() => onBackButtonClick()}
        >
          Back
        </ButtonContainer>
      )}

      {exerciseIndex == 0 && newTotalQuestion != 0 && questionIndex != 0 && (
        <ButtonContainer
          className="primary-btn sm primary-btn-outline"
          onClick={() => onBackButtonClick()}
        >
          Back
        </ButtonContainer>
      )}
      {isFrom === "student"
        ? newTotalQuestion == 0
          ? parseInt(exerciseIndex) + 1 == totalExercises && (
              <Closing {...methods} />
            )
          : parseInt(exerciseIndex) + 1 == totalExercises &&
            questionIndex + 1 == newTotalQuestion && <Closing {...methods} />
        : null}
      {isFrom === "teacher"
        ? newTotalQuestion == 0
          ? parseInt(exerciseIndex) + 1 == totalExercises && (
              <div className="teacher-submit">
                <AdditionalPanelItems />
              </div>
            )
          : parseInt(exerciseIndex) + 1 == totalExercises &&
            questionIndex + 1 == newTotalQuestion && (
              <div className="teacher-submit">
                <AdditionalPanelItems />
              </div>
            )
        : null}
      {parseInt(exerciseIndex) + 1 == totalExercises ? (
        parseInt(questionIndex) + 1 < newTotalQuestion && (
          <ButtonContainer
            className="primary-btn sm ml-auto"
            onClick={() => onNextButtonClick()}
          >
            Next
          </ButtonContainer>
        )
      ) : newTotalQuestion == 0 ? (
        <ButtonContainer
          className="primary-btn sm ml-auto"
          onClick={() => onNextButtonClick()}
        >
          Next
        </ButtonContainer>
      ) : (
        parseInt(questionIndex) + 1 <= newTotalQuestion && (
          <ButtonContainer
            className="primary-btn sm ml-auto"
            onClick={() => onNextButtonClick()}
          >
            Next
          </ButtonContainer>
        )
      )}
    </div>
  );
};

export { BottomNavigationBar };
