import React from 'react';
const Input = ({
  id = '',
  type = 'text',
  disabled = false,
  label = '',
  value = '',
  placeholder = '',
  onChange = () => { },
  autocomplete = '',
  required = false,
  min = "",
  max = "",
}) =>
  <div className='form-group'>
    {!!label && <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      type={type}
      className="form-control"
      value={value}
      autoComplete={autocomplete}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
    />
  </div>

export default Input;