import React, {useEffect, useState} from 'react';
import SearchBar from '../components/common/SearchBar';
import styled from 'styled-components';
import {findUserByName} from '../firebase/firestore';
import Profile from '../components/common/Profile';
import CustomButton from '../components/common/CustomButton';

const Page = styled.div`
  padding: 18px;
`;

const Search = styled.div`
  display: flex;
  margin-bottom: 22px;
`;

const SearchBtn = styled.button`
  background: none;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: black;
  padding: 0;
  padding-left: 10px;
`;

const P = styled.p`
  text-align: center;
`;

export default function SearchFriendsPage() {
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  let name = '';

  useEffect(() => {
    async function search() {
      const result = await findUserByName(name);
      if (result) {
        setUser(result);
      } else {
        setUser(null);
      }
    }
    search();
  }, [event]);

  const getValue = (text) => {
    name = text;
  };

  const onClick = (event) => {
    setEvent(event);
  };

  return (
    <Page>
      <Search>
        <SearchBar placeholder='사용자 아이디를 검색해보세요' event={event} getValue={getValue} />
        <SearchBtn type='button' onClick={onClick}>검색</SearchBtn>
      </Search>
      <main>
        {(event === null || user) ? <Profile user={user} email /> : <P>해당 아이디의 사용자가 없습니다.</P>}
        <CustomButton
          value='친구 요청'
          color='#FFFFFF'
          bgColor='#4886FF'
          onClick={() => console.log('test')}
        />
      </main>
    </Page>
  );
};
