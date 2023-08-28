import React from 'react';

export const SelectDate = ({ id, value, placeholder, onChange, min, max }) =>
  <input
    id={id}
    type='text'
    className='form-control'
    placeholder={placeholder}
    onFocus={(e) => e.target.type = 'date'}
    onBlur={(e) => (value === '') && (e.target.type = 'text')}
    value={value}
    onChange={onChange}
    min={min && min}
    max={max && max}
  />
