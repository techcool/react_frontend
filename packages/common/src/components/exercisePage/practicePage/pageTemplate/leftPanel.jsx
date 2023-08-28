import React, { Fragment } from 'react';
import classnames from 'classnames';
import { ProgressBar } from './progessBar';
import {
  EXERCICES_TITLES,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_WRITE_STORY,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
  BLUE,
  EXERCICES_TITLES_IOCNS
} from 'common/src/constants';
import styledComponents from 'styled-components';

const Li = styledComponents.li`
&.review-mode{
  border:1px solid orange;
  z-index: 11;
}
padding-bottom:10px;
&:hover{
  cursor:not-allowed;
}
`
const PanelContainer = styledComponents.div`
  font-size:15px;
`
const exercisesToBeReviewed = [
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_WRITE_STORY,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_LONG_ANSWER,
]

const LeftPanel = ({
  getExercisesIDs,
  onPanelItemClick,
  getCurrentExerciseID,
  isExerciceCompleted,
  getProgressPercentage,
  isPanelItemClickable=()=>true,
  isTeacherReveiwing = () => false,
  AdditionalPanelItems = () => <Fragment />
}) =>
  <PanelContainer
  className="pb-4"
  style={{backgroundColor:"#fff"}}
  >
    <div className="postwork-top">
      Progress
    </div>
    <div className="px-4">
    <ProgressBar
      {...{ getProgressPercentage }}
    />
    </div>
    
    <ul className="list-group list-group-flush mt-4 px-4 leftpanel-ul scroll-md">
      {
        getExercisesIDs().map((id, index) =>
        <Li
            key={index}
            onClick={() => onPanelItemClick({
              exerciseIndex: index,
              exerciseId: id
            })}
            className={
              classnames(
             
                "list-group-item",
               
                { "font-weight-bold active-border": getCurrentExerciseID() === id },
                { 'review-mode': isTeacherReveiwing() && exercisesToBeReviewed.includes(id) },
                {'blue-on-hover': isPanelItemClickable(id)}
              )
            }
          >
           
            <span className="mb-3"><img src={`/images/exercises_icons/${EXERCICES_TITLES_IOCNS[id]}`} /></span>
            <span>
             {EXERCICES_TITLES[id]}
            </span>
            <span style={{position:"absolute", right:"0px"}}>
              <i className={classnames(
                "fa",
                "fa-check-circle",
                { "text-dark-blue": isExerciceCompleted(id) },
              )
              } />
            </span>
          </Li>
        )
      }
    </ul>
    <AdditionalPanelItems />
  </PanelContainer>

export { LeftPanel };
