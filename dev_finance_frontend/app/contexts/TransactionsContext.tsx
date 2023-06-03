
'use client'

import { ReactNode, createContext, useState } from "react";

interface TransactionsContextProps {
    transactions: TransactionType[],
    createTransaction(transaction: CreateTransactionType): Promise<void>,
    loadTransactions(): Promise<void>,
    removeTransaction(id: number): void,
    load: boolean
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

type CreateTransactionType = {
    description: String,
    amount: number,
    date: String
}


export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsContextProvider(props: TransactionsContextProviderProps) {

    const [transactions, setTransactions] = useState<TransactionType[]>([])
    const [load, setLoad] = useState<boolean>(false)


    async function createTransaction(transaction: TransactionType) {
        const res = await fetch('http://localhost:8080/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        })

        setLoad(!load)
    }

    async function loadTransactions() {
        const data = await fetch("http://localhost:8080/transaction", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        setTransactions(await data.json())
    }

    async function removeTransaction(id: number) {
        const res = await fetch(`http://localhost:8080/transaction/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        setLoad(!load)
    }

    return (

        <TransactionsContext.Provider value={{ transactions, loadTransactions, createTransaction, removeTransaction, load }}>
            {props.children}
        </TransactionsContext.Provider>
    )
}