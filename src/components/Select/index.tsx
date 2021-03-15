import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
  placeholder?:string;
}

const Select: React.FC<Props> = ({ name, label, placeholder, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        ref.select.setValue(value);
      },
      clearValue: (ref: any) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      { label && <label htmlFor={fieldName}>{label}</label> }

      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        className={error ? 'has-error-select' : ''}
        placeholder={placeholder}
        {...rest}
      />
       { error && <span className="error">{error}</span> }
    </>
  );
};

export default Select;
