"use client"

import { useContext } from "react";
import { TransactionsContext, TransactionType } from "../contexts/TransactionsContext";
import { api } from "../api";
import { CreateTransactionType } from "../models/transaction";

type ResponseDTO = {
    success: boolean,
    message: string,
    data: any
}

export function useTransactions() {
    const { transactions, setTransactions, load, setLoad } = useContext(TransactionsContext)

    async function createTransaction(transaction: CreateTransactionType) {
        const res: ResponseDTO = (await api.post("/transaction", transaction, {withCredentials: true})).data;

        if (!res.success) {
            throw new Error(res.message);
        }

        setLoad(!load);

    }

    async function loadTransactions() {

        const res: ResponseDTO = (await api.get("/transaction", {withCredentials: true})).data;

        if (!res.success) {
            throw new Error(res.message);
        }

        const transactions: TransactionType[] = res.data;

        setTransactions(transactions);
    }

    async function removeTransaction(id: number) {
        const res: ResponseDTO = (await api.delete(`/transaction/${id}`, {withCredentials: true})).data;

        if (!res.success) {
            throw new Error(res.message);
        }

        setLoad(!load)
    }

    return { transactions, load, createTransaction, loadTransactions, removeTransaction }
}