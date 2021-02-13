import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  title?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, title ,options,style,...rest }) => {
  const selectRef= useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [selectRef, registerField]);

  return (
    <div className="select-block" style={style}>
      <label htmlFor={name}>{label}</label>
      <select
        ref={selectRef}
        defaultValue={defaultValue}
        id={name}
        {...rest}
        style={style}
      >
        <option  disabled hidden  ref={selectRef} defaultValue={defaultValue}>
          {title}
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {`${option.label} `}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
