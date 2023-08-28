import React from 'react'
import { SelectDate } from './selectDate'
import Select from './select'
import { Submit } from './submit'
import {
  CATEGORIES_LABELS,
  CATEGORIES,
  EXERCISES_IDS_SCORED,
  EXERCICES_TITLES,
} from 'common/src/constants'

const FilterContainer = ({ children, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <div className="form-row">
      {
        !Array.isArray(children)
          ?
          children
          :
          children.map((child, index) =>
            <div className='col'>
              {child}
            </div>
          )
      }
    </div>
  </form>

export const FilterActivitiesCategoriesDateRange = ({
  activityId,
  category,
  startDate,
  endDate,
  onChange,
  onSubmit,
}) =>
  <FilterContainer
    onSubmit={onSubmit}
  >
    <Select
      placeholder='Categories'
      id='category'
      v={category}
      value={
        category === null ?
          null
          :
          CATEGORIES
            .filter((id) => id === category)
            .map(id => ({ value: id, label: CATEGORIES_LABELS[id] }))
      }
      options={
        CATEGORIES.map((id) => ({ value: id, label: CATEGORIES_LABELS[id] }))
      }
      required={true}
      onChange={onChange}
    />
    <Select
      placeholder='Activity'
      id='activityId'
      v={activityId}
      required={true}
      value={
        activityId === null ?
          null
          :
          EXERCISES_IDS_SCORED
            .filter((id) => id === activityId)
            .map(id => ({ value: id, label: EXERCICES_TITLES[id] }))
      }
      options={
        EXERCISES_IDS_SCORED
          .map((id) => ({ value: id, label: EXERCICES_TITLES[id] }))
      }
      onChange={onChange}
    />
    <SelectDate
      id='startDate'
      placeholder='Start date'
      value={startDate}
      max={endDate ? endDate : ''}
      onChange={onChange}
    />
    <SelectDate
      id='endDate'
      placeholder='End date'
      value={endDate}
      min={startDate ? startDate : ''}
      onChange={onChange}
    />
    <Submit
      text='Render'
    />
  </FilterContainer>
