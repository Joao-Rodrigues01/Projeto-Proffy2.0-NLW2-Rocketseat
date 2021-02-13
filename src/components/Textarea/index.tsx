import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  const textareaRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);


  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea
        ref={textareaRef}
        defaultValue={defaultValue}
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
