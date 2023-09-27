import './tableBody.css'
import { TransactionType } from '@/app/models/transaction'
import { Transaction } from '../transaction/Transaction'

interface TableBodyProps {
    transactions: TransactionType[]
}

export function TableBody({transactions}: TableBodyProps) {


    return (
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
            
    )
}





