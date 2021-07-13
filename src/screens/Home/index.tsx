import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useStorageData } from '../../hooks/storageData';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  const {storageData} = useStorageData();

  async function loadData() {

    if(!storageData) return;
    
    const loginsFormatted: LoginDataProps[] = storageData
    .map((item: LoginDataProps) => {

      return {
        id: item.id,
        title: item.title,
        email: item.email,
        password: item.password,
      }
    });

    setSearchListData(loginsFormatted);
    setData(loginsFormatted);
  }
  useEffect(() => {
    loadData();
  }, [storageData]);

  useFocusEffect(useCallback(() => {
    loadData();
  }, [storageData]));

  function handleFilterLoginData(search: string) {
    const response = data.filter(res => res.title === search);

    if(response.length > 0) {
      setSearchListData(response);
    } 
    else if (search === '') {
      setSearchListData(data);
    }
    
  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}