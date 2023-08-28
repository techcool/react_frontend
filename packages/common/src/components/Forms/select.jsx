
import React from 'react';
import SelectReact from 'react-select';

const Select = ({
  id,
  label,
  value,
  v,
  options,
  isClearable = false,
  isSearchable = false,
  onChange = () => { },
  required = false,
  placeholder=null,
}) =>
  <div className="form-group"
    style={{ position: 'relative' }}
  >
    {
      label &&
      <label htmlhtmlFor={id}>
        {label}
      </label>
    }
    <SelectReact
      classNamePrefix="react-select"
      className='mb-0'
      isClearable={isClearable}
      isSearchable={isSearchable}
      value={value}
      options={options}
      onChange={
        (option) => {
          onChange({
            target: {
              id,
              value: option.value
            }
          })
        }
      }
      placeholder={placeholder}
    />
    <input
      tabIndex={-1}
      autoComplete="off"
      value={v}
      required={required}
      style={{
        opacity: 0, height: 0, position: 'absolute',
        display: 'block', bottom: 0
      }}
    />
  </div>

export default Select;