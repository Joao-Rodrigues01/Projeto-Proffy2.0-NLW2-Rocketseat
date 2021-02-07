import React, { SelectHTMLAttributes } from 'react';

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
  return (
    <div className="select-block" style={style}>
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest} style={style}>
        <option value="" disabled hidden>
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
