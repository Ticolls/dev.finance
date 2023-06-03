'use client'

import './table.css'
import { Transaction } from '../transaction/Transaction'
import { Modal } from '../modal/Modal'
import { useModal } from '@/app/hooks/useModal'
import { TransactionType } from '@/app/contexts/TransactionsContext'

interface TableProps {
    transactions: TransactionType[]
}

export function Table({ transactions }: TableProps) {

    const { modalStatus, setModalStatus } = useModal()

    return (
        <section className="transaction">

            <a className="button new" onClick={() => setModalStatus(true)}>+ Nova transação</a>

            <h2 className="sr-only">Transações</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody key="transactions">
                    {transactions.map((transaction: TransactionType) =>
                        <Transaction
                            id={transaction.id}
                            description={transaction.description}
                            amount={transaction.amount}
                            date={transaction.date}
                            key={transaction.id}
                        />
                    )}

                </tbody>
            </table>

            {modalStatus ? <Modal /> : null}
        </section>
    )
}
