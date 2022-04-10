import React from 'react';
import {Link} from 'react-router-dom';
import SignUpInput from '../components/SignUpInput';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import Icon, {ICON_TYPE} from '../components/common/Icon';
import CheckboxInput from '../components/common/CheckboxInput';

const Page = styled.div`
  padding: 17px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  padding: 31px 0 35px;
  margin: 0;
`;

const Submit = styled.input`
  border: none;
  background: #FFD12D;
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  border-radius: 38px;
  text-align: center;
  width: 100%;
  -webkit-appearance: none;
  color: #000000;
`;

const CheckList = styled.ul`
  list-style: none;
  margin: 62px 0 26px;
  padding: 0;
  color: #707070;
  font-size: 13px;

  li{
    padding: 3.5px 0;
  }
`;

const Form = styled.form`
  & > div{
    margin-bottom: 16px;
  }
`;

export default function SignUpPage() {
  const {register, handleSubmit, reset, watch, formState: {errors, dirtyFields}} = useForm({mode: 'onBlur'});
  const privateChecked = watch('private');
  const shareChecked = watch('share');
  const recordChecked = watch('record');
  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Page>
      <Link to="/account/login">
        <Icon type={ICON_TYPE.CLOSE} size={24} />
      </Link>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          required
          reset={reset}
          name="username"
          label="사용자 이름"
          register={register}
          placeholder="영문 사용자 이름 입력"
          validate={{
            pattern: (v) => /^[a-z0-9._]{5,20}$/.test(v) || '5~20자의 영문 소문자, 숫자와 특수기호(_),(.)만 사용 가능합니다.',
          }}
          isDirty={dirtyFields.username}
          error={errors.username}
        />
        <SignUpInput
          required
          name="email"
          label="이메일"
          register={register}
          placeholder="abcde@gmail.com"
          reset={reset}
          validate={{
            pattern: (v) => /^[^@]+@[^@]+$/.test(v) || '이메일 형식이 맞지 않습니다.',
          }}
          isDirty={dirtyFields.email}
          error={errors.email}
        />
        <SignUpInput
          password
          required
          name="password"
          label="비밀번호"
          register={register}
          placeholder="비밀번호 입력"
          reset={reset}
          validate={{
            pattern: (v) => /^[\w\W]{8,}$/.test(v) || '8자 이상 입력하세요.',
          }}
          isDirty={dirtyFields.password}
          error={errors.password}
        />
        <SignUpInput
          password
          required
          name="confirmPassword"
          label="비밀번호 확인"
          register={register}
          placeholder="비밀번호 재입력"
          reset={reset}
          validate={{
            confirm: (v) => password == v || '비밀번호가 일치하지 않습니다.',
          }}
          isDirty={dirtyFields.confirmPassword}
          error={errors.confirmPassword}
        />
        <SignUpInput
          required
          name="birthday"
          label="생년월일"
          register={register}
          placeholder="숫자 6자리 입력"
          reset={reset}
          validate={{
            pattern: (v) => /^\d{2}(0[1-9]|1[0-2])([1-2][0-9]|3[0-1]|0[1-9])$/.test(v) || '생일 형식이 맞지 않습니다.',
          }}
          isDirty={dirtyFields.birthday}
          error={errors.birthday}
        />
        <CheckList>
          <li key="private">
            <CheckboxInput
              label="(필수) 개인정보 수집 및 이용 동의"
              register={register}
              name="private"
              checked={privateChecked}
            />
          </li>
          <li key="share">
            <CheckboxInput
              label="(필수) 추억을 보낸 친구와 타임라인 공유하기"
              register={register}
              name="share"
              checked={shareChecked}
            />
          </li>
          <li key="record">
            <CheckboxInput
              label="(필수) 성실하게 추억을 기록하고 나누기"
              register={register}
              name="record"
              checked={recordChecked}
            />
          </li>
        </CheckList>
        <Submit type="submit" value="회원가입" />
      </Form>
    </Page>
  );
}
