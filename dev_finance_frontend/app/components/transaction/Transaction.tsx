"use client"

import { Key } from 'react'
import './transaction.css'
import { useTools } from '@/app/hooks/useTools'

interface TransactionProps {
    id: Key,
    description: String,
    amount: number,
    date: String,
}

export function Transaction({ id, description, amount, date }: TransactionProps) {

    function removeTransaction() { }

    const { formatDate } = useTools()

    return (
        <tr>
            <td className="description">{description}</td>
            <td className={amount >= 0 ? "income" : "expense"}>{amount}</td>
            <td className="date">{formatDate(date)}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" className="remove-button" onClick={removeTransaction} />
            </td>
        </tr>
    )
}