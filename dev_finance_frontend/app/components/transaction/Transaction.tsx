"use client"

import { Key } from 'react'
import './transaction.css'
import { useTools } from '@/app/hooks/useTools'
import { useTransactions } from '@/app/hooks/useTransactions'

interface TransactionProps {
    id: number,
    description: String,
    amount: number,
    date: String,
}

export function Transaction({ id, description, amount, date }: TransactionProps) {

    const { removeTransaction } = useTransactions()

    const { formatDate } = useTools()

    return (
        <tr>
            <td className="description">{description}</td>
            <td className={amount >= 0 ? "income" : "expense"}>{amount.toFixed(2)}</td>
            <td className="date">{formatDate(date)}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" className="remove-button" onClick={() => removeTransaction(id)} />
            </td>
        </tr>
    )
}