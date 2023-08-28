import React from 'react';

export const Submit = ({ text,disabled=false }) =>
  <input
    type="submit"
    className="btn button-blue"
    value={text || 'Submit'}
    disabled={disabled}
  />
