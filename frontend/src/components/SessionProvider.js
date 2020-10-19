import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { ActivityIndicator } from 'react-native-paper';

function useData() {
  return useStoreData(({ sessionStore }) => ({
    sessionKeyFetched: sessionStore.sessionKeyFetched,
    getSessionToken: sessionStore.getSessionToken,
  }));
}

const SessionProvider = ({children}) => {
  const { getSessionToken, sessionKeyFetched } = useData()

  useEffect(() => {
    getSessionToken()
  }, [sessionKeyFetched, getSessionToken])

  return (
    <View>
      {sessionKeyFetched ? children : <ActivityIndicator />}
    </View>
  )
}

export default SessionProvider
