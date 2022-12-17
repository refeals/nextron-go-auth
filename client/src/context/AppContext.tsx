import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Token, User } from '../types'

interface ContextType {
  user: User | null
  token: Token
  setUser: any
  setToken: any
}

const AppContext = createContext<ContextType>({
  user: null,
  token: '',
  setUser: (_: any) => {},
  setToken: (_: any) => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | User>(null)
  const [token, setToken] = useState<Token>('')

  const initialState = {
    user,
    token,
    setUser,
    setToken,
  }

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
