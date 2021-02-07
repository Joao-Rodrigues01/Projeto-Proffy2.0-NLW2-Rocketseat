import React from 'react';

import './styles.css';

interface InputLabelProps {
  title: string;
  name: string;
  style?: object;
}

const InputLabel: React.FC<InputLabelProps> = ({title, name, style,children}) => {
  return (
    <div id="input-label" style={style}>
      <label htmlFor={name}>{title}</label>
      {children}
    </div>
  );
};

export default InputLabel;
