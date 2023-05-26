import { Transaction } from './components/transaction/Transaction';
import './home.css'

type TransactionType = {
  description: String,
  amount: number,
  date: String
}

async function getTransactions() {
  const data = await fetch("http://localhost:8080/transaction")

  return data.json();
}

export default async function Home() {

  const transactions: TransactionType[] = await getTransactions()
  console.log(transactions)

  let income = 0.0, expense = 0.0, total = 0.0
  for (let transaction of transactions) {
    total = total + transaction.amount

    if (transaction.amount >= 0) {
      income = income + transaction.amount
    } else {
      expense = expense + transaction.amount
    }
  }

  return (
    <main className="container">

      <section className="balance">
        <h2 className="sr-only">Balanço</h2>

        <div className="card">
          <h3>
            <span>
              Entradas
            </span>
            <img src="./assets/income.svg" alt="Imagem de entradas" />
          </h3>
          <p>R$ {income}</p>
        </div>

        <div className="card">
          <h3>
            <span>
              Saídas
            </span>
            <img src="./assets/expense.svg" alt="Imagem de Saídas" />
          </h3>
          <p>R$ {expense}</p>
        </div>

        <div className="card total">
          <h3>
            <span>
              total
            </span>
            <img src="./assets/total.svg" alt="Imagem de total" />
          </h3>
          <p>R$ {total}</p>
        </div>
      </section>

      <section className="transaction">

        <a href="#" className="button new">+ Nova transação</a>

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
      </section>

    </main>
  )
}
