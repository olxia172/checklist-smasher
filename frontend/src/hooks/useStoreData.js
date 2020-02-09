import React from "react"
import { useObserver } from "mobx-react-lite"
import { storesContext} from "../stores/storesContext"

export function useStoreData(selector) {
  const store = React.useContext((storesContext))

  if (!store) {
    throw new Error('Could not find store!')
  }

  return useObserver(() => {
    return selector(store)
  })
}