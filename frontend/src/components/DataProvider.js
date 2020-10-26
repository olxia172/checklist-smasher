import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import styled from "styled-components";
import { toJS } from "mobx"
import _isEmpty from "lodash/isEmpty"
import { observer } from 'mobx-react-lite'
import { useStoreData } from "../stores/storesContext"

const MainViewContainer = styled.View`
  height: 100%;
`;

const DataProvider = observer(({ children }) => {
  const { sessionStore: { sessionKey }, setup, refresh } = useStoreData()
  const [ready, setReady] = useState(false)

  console.log("DataProvider", sessionKey);

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

  return (
    <MainViewContainer>
      {ready && children}
    </MainViewContainer>
  )
})

export default DataProvider
