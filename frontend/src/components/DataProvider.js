import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { ActivityIndicator } from 'react-native-paper';
import styled from "styled-components";
import { toJS } from "mobx"
import _isEmpty from "lodash/isEmpty"

const MainViewContainer = styled.View`
  height: 100%;
`;

function useData() {
  return useStoreData(({ refresh, setup, sessionStore }) => ({
    refresh,
    setup,
    sessionKey: sessionStore.sessionKey,
  }));
}

const DataProvider = ({ children }) => {
  const [ready, setReady] = useState(false)
  const { setup, refresh, sessionKey } = useData()

  useEffect(() => {
    const boot = async () => {
      if (await setup()) {
        setReady(true)
      }

      await refresh()
      setReady(true)
    }

    boot()
  }, [setup, refresh, setReady, sessionKey])

  console.log("data ready", ready);

  return (
    <MainViewContainer>
      {ready && children}
    </MainViewContainer>
  )
}

export default DataProvider
