import React from 'react';
import {TiDelete} from 'react-icons/ti';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = styled.div`
  background: ${(props) => props.error ?
    '#FCEFEE' :
    (props.confirm ?
      '#EEFFF5' :
      '#FAFAFA'
    )};
  border-radius: 8px;
  padding: 10px 13px;

  &:focus-within{
    border: 1px solid #000000;
    background: #FFFFFF;
  }
`;

const Label = styled.label`
  font-size: 10px;
  color: #676C76;
  display: block;
`;

const InputGroup = styled.div`
  padding: 10px 0 6px 0;
  display: flex;

  svg{
  color: #969696;
  font-size: 18px;
  display: block;
  margin: auto;
  margin-right: 0;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: none;
  font-size: 17px;
  color: #000000;
  flex: 1;
  
  &::placeholder{
    color: #BEBFBF;
  }
`;

export default function SignUpInput({
  name,
  label,
  reset,
  error,
  isDirty,
  register,
  password,
  required,
  validate,
  placeholder,
}) {
  return (
    <>
      <InputContainer error={!!error} confirm={isDirty && !error} >
        <Label>
          {label}
          <InputGroup>
            <Input
              type={password ? 'password' : 'text'}
              placeholder={placeholder}
              {...register(name, {required, validate})}
            />
            <TiDelete onClick={() => reset({[name]: ''})} />
          </InputGroup>
        </Label>
      </InputContainer>
      {error && <p>{error.type === 'required' ? '필수 입력항목 입니다' : error.message}</p>}
    </>
  );
}

SignUpInput.propTypes = {
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  isDirty: PropTypes.bool,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  password: PropTypes.bool,
  validate: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
};