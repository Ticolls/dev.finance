'use client'

import { TransactionType } from '@/app/page'
import './table.css'
import { Transaction } from '../transaction/Transaction'
import { Modal } from '../modal/Modal'
import { useModal } from '@/app/hooks/useModal'

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

                <tbody>
                    {transactions.map(({ description, amount, date }: TransactionType) => {
                        return (
                            <Transaction description={description} amount={amount} date={date} />
                        )
                    })}

                </tbody>
            </table>

            {modalStatus ? <Modal /> : null}
        </section>
    )
}