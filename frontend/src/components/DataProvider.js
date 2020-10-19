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
  return useStoreData(({ refresh, setup }) => ({
    refresh,
    setup,
  }));
}

const DataProvider = ({ children }) => {
  const [ready, setReady] = useState(false)
  const { setup, refresh } = useData()

  useEffect(() => {
    const boot = async () => {
      if (await setup()) {
        setReady(true)
      }

      refresh()
      setReady(true)
    }

    boot()
  }, [setup, refresh, setReady])

  return (
    <MainViewContainer>
      {ready && children}
    </MainViewContainer>
  )
}

export default DataProvider
