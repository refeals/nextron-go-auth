import React, { createContext, ReactNode, useContext, useState } from "react"
import { Customer, Token, User } from "../types"

interface ContextType {
  user: User | null
  token: Token
  customers: [Customer] | []
  setUser: any
  setToken: any
  setCustomers: any
}

const AppContext = createContext<ContextType>({
  user: null,
  token: "",
  customers: [],
  setUser: (_: any) => {},
  setToken: (_: any) => {},
  setCustomers: (_: any) => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | User>(null)
  const [token, setToken] = useState<Token>("")
  const [customers, setCustomers] = useState<[Customer] | []>([])

  const initialState = {
    user,
    token,
    customers,
    setUser,
    setToken,
    setCustomers,
  }

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
