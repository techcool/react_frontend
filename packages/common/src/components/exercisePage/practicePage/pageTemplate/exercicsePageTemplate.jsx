import React from 'react';
import styledComponents from 'styled-components'
import { LeftPanel } from './leftPanel';
import { TopNavigationBar } from './topNavigationBar';
import { BottomNavigationBar } from './bottomNavigationBar';
import ConfirmationForStart from 'common/src/components/dialogs/confirmationForStart';
import {
  MODE_NORMAL
} from 'common/src/constants'
import { Fragment } from 'react';

const ActivityContent = styledComponents.div`
position: relative;
overflow: auto;
background:rgb(245, 248, 255);
width: 100%;
overflow-x: hidden;
padding: 0px 0px;
padding-bottom: 3rem;
font-size:16px;
border-radious: 12px;
&::-webkit-scrollbar {
  width: 10px;
}

/* Track */
&::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  // border-radius: 10px;
}
 
/* Handle */
&::-webkit-scrollbar-thumb {
  background: #ccc; 
  border-radius: 2px;
}
/* Handle on hover */
&::-webkit-scrollbar-thumb:hover {
  // background: #b30000; 
}

`

const ExercicsePageTemplate = ({
  onBackButtonClick,
  onNextButtonClick,
  getVideoDetails,
  saveNotes,
  children,
  mode,
  isFrom,
  exerciseIndex,
  questionIndex,
  totalExercises,
  totalQuestion: newTotalQuestion,
  getCurrentQuestions: totalQuestions,
  ...methods
}) => {
  return (
    <div className="row mx-0 main-section px-4 py-5 bg-white top-zero"
    >
      {/* {mode === MODE_NORMAL && <ConfirmationForStart />} */}
      <div className=" col-md-4 col-lg-3  pl-0 pb-2 d-flex flex-column">
        <LeftPanel
          {...{
            ...methods
          }}
        />
      </div>
      <div className=" col-md-8 col-lg-9  p-0 pl-4 d-flex flex-column ">
        <div>
        {parseInt(exerciseIndex) + 1 == totalExercises ?
              parseInt(questionIndex) + 1 < newTotalQuestion && <TopNavigationBar
                onNextButtonClick={onNextButtonClick}
                getVideoDetails={getVideoDetails}
                saveNotes={saveNotes}
                {...{
                  ...methods
                }}
              />
              : newTotalQuestion == 0 ?
                <TopNavigationBar
                  onNextButtonClick={onNextButtonClick}
                  getVideoDetails={getVideoDetails}
                  saveNotes={saveNotes}
                  {...{
                    ...methods
                  }}
                />
                : parseInt(questionIndex) + 1 <= newTotalQuestion && <TopNavigationBar
                  onNextButtonClick={onNextButtonClick}
                  getVideoDetails={getVideoDetails}
                  saveNotes={saveNotes}
                  {...{
                    ...methods
                  }}
                />
          }
          <ActivityContent>
            {children}
          </ActivityContent>
        </div>
        <BottomNavigationBar
          onBackButtonClick={onBackButtonClick}
          onNextButtonClick={onNextButtonClick}
          exerciseIndex={exerciseIndex}
          totalExercises={totalExercises}
          questionIndex={questionIndex}
          newTotalQuestion={newTotalQuestion}
          mode={mode}
          isFrom={isFrom}
          {...{
            ...methods
          }}
        />
      </div>
    </div>
  )
}


export { ExercicsePageTemplate };
