import React, { useContext } from "react"
import RootStore from "./RootStore"

export const storesContext = React.createContext(RootStore)

export const StoreProvider = ({ children, store }) => {
  return (
    <storesContext.Provider value={store}>
      {children}
    </storesContext.Provider>
  )
}

export const useStoreData = () => useContext(storesContext)
