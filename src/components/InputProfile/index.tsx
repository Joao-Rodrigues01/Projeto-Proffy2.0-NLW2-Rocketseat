import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  style?: object;
}

const InputProfile: React.FC<InputProps> = ({
  name,
  style,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);


  return (
          <input
            defaultValue={defaultValue}
            ref={inputRef}
            style={style}
            {...rest}
          />
  );
};

export default InputProfile;
