"use client"

import { useContext } from "react";
import { TransactionsContext, TransactionType } from "../contexts/TransactionsContext";
import { api } from "../api";

type ResponseDTO = {
    success: boolean,
    message: string,
    data: any
}

export function useTransactions() {
    const { transactions, setTransactions, load, setLoad } = useContext(TransactionsContext)

    async function createTransaction(transaction: TransactionType) {
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

        const transaction = res.data;

        setTransactions(transaction);
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