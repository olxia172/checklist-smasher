import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { ActivityIndicator } from 'react-native-paper';
import styled from "styled-components";

const MainViewContainer = styled.View`
  height: 100%;
`;

function useData() {
  return useStoreData(({ userStore }) => ({
    getCurrentUser: userStore.getCurrentUser,
    isUserFetched: userStore.isUserFetched,
  }));
}

const EnjoyerProvider = ({children}) => {
  const { getCurrentUser, isUserFetched } = useData()

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser, isUserFetched])

  return (
    <MainViewContainer>
      {isUserFetched ? children : <ActivityIndicator />}
    </MainViewContainer>
  )
}

export default EnjoyerProvider
