import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const ShouldRender = ({ condition, children }) =>
  <Fragment>
    {(condition) && children}
  </Fragment>

export const RenderForTeachersOnly = connect(
  state => {
    const { user: { role } } = state
    return { role };
  }
)(
  ({ role, children }) => (
    <ShouldRender
      condition={role === 'teacher'}
      children={children}
    />
  )
)

export const RenderForStudentsOnly = connect(
  state => {
    const { user: { role } } = state
    return { role };
  }
)(
  ({ role, children }) => (
    <ShouldRender
      condition={role === 'student'}
      children={children}
    />
  )
)

export default ShouldRender