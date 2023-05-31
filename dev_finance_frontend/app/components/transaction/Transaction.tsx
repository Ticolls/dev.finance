"use client"

import './transaction.css'

interface TransactionProps {
    description: String,
    amount: number,
    date: String
}

export function Transaction({ description, amount, date }: TransactionProps) {

    function removeTransaction() { }

    return (
        <tr>
            <td className="description">{description}</td>
            <td className={amount >= 0 ? "income" : "expense"}>{amount}</td>
            <td className="date">{date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" className="remove-button" onClick={removeTransaction} />
            </td>
        </tr>
    )
}