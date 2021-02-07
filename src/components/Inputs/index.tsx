import React, { InputHTMLAttributes, useCallback, useEffect, useRef, EventHandler, FunctionComponentFactory } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  click?: () => void;
  icon?: React.ComponentType<IconBaseProps>
  style?: object;
}

const Input: React.FC<InputProps> = ({ label, name, click ,icon: Icon, style, ...rest}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);


  return (
    <div className="input" style={style}>
      { label && <label htmlFor={name}>{label}</label>}

      {
        Icon
        ? <input
            defaultValue={defaultValue}
            ref={inputRef}
            {...rest}
            style={{width: '280px'}}
          />
        :  <input
              defaultValue={defaultValue}
              ref={inputRef}
              {...rest}
            />
      }
      {error}

      {Icon && <Icon size={24} color="#9C98A6" onClick={click} />}
    </div>
  );
};

export default Input;
