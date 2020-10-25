import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreData } from "../hooks/useStoreData";
import { ActivityIndicator } from 'react-native-paper';

function useData() {
  return useStoreData(({ getSession, sessionStore }) => ({
    getSession,
    sessionKey: sessionStore.sessionKey,
  }));
}

const SessionProvider = ({ children }) => {
  const [ready, setReady] = useState(false)
  const { getSession, sessionKey } = useData()

  useEffect(() => {
    const boot = async () => {
      await getSession()
      setReady(true)
    }

    if (Boolean(sessionKey)) {
      setReady(true)
    } else {
      boot()
    }
  }, [getSession, setReady, sessionKey])

  return (
    <View>
      {ready ? children : <ActivityIndicator />}
    </View>
  )
}

export default SessionProvider
