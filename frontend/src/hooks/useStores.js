import React from "react"
import { storesContext } from "../stores/storesContext"

export const useStores = () => React.useContext(storesContext)