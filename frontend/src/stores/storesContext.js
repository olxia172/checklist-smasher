import React from "react"
import RootStore from "./RootStore"

export const storesContext = React.createContext(RootStore)

export function StoreProvider({ children, store }) {
  return (
    <storesContext.Provider value={store}>
      {children}
    </storesContext.Provider>
  )
}