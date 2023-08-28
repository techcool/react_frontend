import React from 'react';
import { Link } from 'react-router-dom';

const Buttons = ({ submitLabel, cancelLabel }) =>
  <div className="d-flex">
    <button
      value="Update"
      name='submit'
      className="btn btn-success"
    >
      {submitLabel}
    </button>
    <Link
      name='cancel'
      className="btn"
      to='/'
    >
      {cancelLabel}
    </Link>
  </div>

export default Buttons;