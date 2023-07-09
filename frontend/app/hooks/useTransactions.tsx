"use client"

import { useContext } from "react";
import { TransactionsContext, TransactionType } from "../contexts/TransactionsContext";


export function useTransactions() {
    const { transactions, setTransactions, load, setLoad } = useContext(TransactionsContext)

    const token = sessionStorage.getItem("token") || ""

    async function createTransaction(transaction: TransactionType) {
        const res = await fetch('http://localhost:8080/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify(transaction),
        })

        if (!res.ok) {
            throw new Error("Erro na criação da transação")
        }

        setLoad(!load)

    }

    async function loadTransactions() {

        const data = await fetch("http://localhost:8080/transaction", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            }
        })

        setTransactions(await data.json())
    }

    async function removeTransaction(id: number) {
        const res = await fetch(`http://localhost:8080/transaction/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            }
        })

        if (!res.ok) {
            throw new Error("Erro na deleção da transação " + id)
        }

        setLoad(!load)
    }

    return { transactions, load, createTransaction, loadTransactions, removeTransaction }
}