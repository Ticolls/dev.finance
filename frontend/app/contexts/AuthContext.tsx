
'use client'

import { ReactNode, createContext, useState } from "react";

interface AuthContextProps {
    token: string
    setToken(token: string): void,
}

interface AuthContextProviderProps {
    children: ReactNode
}


export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [token, setToken] = useState<string>("")


    return (

        <AuthContext.Provider value={{ token, setToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}