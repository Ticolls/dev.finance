export type TransactionType = {
    id: number,
    description: String,
    amount: number,
    date: String
}

export type CreateTransactionType = {
    description: String,
    amount: number,
    date?: String
}