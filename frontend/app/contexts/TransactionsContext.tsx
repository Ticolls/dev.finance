
'use client'

import { ReactNode, createContext, useState } from "react";

interface TransactionsContextProps {
    transactions: TransactionType[],
    setTransactions(value: TransactionType[]): void,
    load: boolean
    setLoad(value: boolean): void,
}

interface TransactionsContextProviderProps {
    children: ReactNode
}

export type TransactionType = {
    id: number,
    description: String,
    amount: number,
    date: String
}




export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsContextProvider(props: TransactionsContextProviderProps) {

    const [transactions, setTransactions] = useState<TransactionType[]>([])
    const [load, setLoad] = useState<boolean>(false)




    return (

        <TransactionsContext.Provider value={{ transactions, setTransactions, load, setLoad }}>
            {props.children}
        </TransactionsContext.Provider>
    )
}