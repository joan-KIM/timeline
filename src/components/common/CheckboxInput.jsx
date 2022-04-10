import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import {ReactComponent as CheckMark} from '../../assets/check.svg';

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

const Checkbox = styled.div`
  width: 9px;
  height: 9px;
  margin: 0 9px 0 6px;
  border: 1px solid ${(props) => props.checked ? '#27AE60' : '#707070'};
  border-radius: 50%;
  box-sizing: border-box;
  background: ${(props) => props.checked ? '#27AE60' : 'none'};
  position: relative;

  svg{
    position: absolute;
    top:1.5px;
    visibility: ${(props) => props.checked ? 'visible' : 'hidden'};
  }
`;

export default function CheckboxInput({label, name, register, required, checked}) {
  return (
    <Label>
      <Input type="checkbox" {...register(name, {required})} />
      <Checkbox checked={checked}>
        <CheckMark />
      </Checkbox>
      {label}
    </Label>
  );
}

CheckboxInput.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  register: propTypes.func.isRequired,
  required: propTypes.bool,
  checked: propTypes.bool,
};