import React from 'react';

const DatePicker = (
  {
    label,
    id,
    placeholder,
    value,
    onChange,
    required = false,
    min,
    style={}
  }
) =>
  <div className='form-group'>
    {!!label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      type='text'
      placeholder={placeholder}
      onFocus={(e) => e.target.type = 'date'}
      onBlur={(e) => (value === '') && (e.target.type = 'text')}
      value={value}
      className='form-control'
      onChange={onChange}
      required={required}
      {
      ...(
        min && {
          min
        }
      )
      }
      style={style}
    />
  </div>

export default DatePicker;