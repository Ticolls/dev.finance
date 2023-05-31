import { Table } from './components/table/Table';
import './home.css'

export type TransactionType = {
  description: String,
  amount: number,
  date: String
}

const example = [
  {
    description: "teste 1",
    amount: 500.00,
    date: "25/06/2023"
  },
  {
    description: "teste 2",
    amount: -500.00,
    date: "25/06/2023"
  },
  {
    description: "teste 3",
    amount: 120.00,
    date: "25/06/2023"
  }
]

async function getTransactions() {
  const data = await fetch("http://localhost:8080/transaction")
  return data.json();
}

export default async function Home() {

  const transactions: TransactionType[] = await getTransactions()
  console.log(transactions)

  let income = 0.0, expense = 0.0, total = 0.0

  for (let transaction of example) {
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
          <p>R$ {income.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>
            <span>
              Saídas
            </span>
            <img src="./assets/expense.svg" alt="Imagem de Saídas" />
          </h3>
          <p>R$ {expense.toFixed(2)}</p>
        </div>

        <div className="card total">
          <h3>
            <span>
              total
            </span>
            <img src="./assets/total.svg" alt="Imagem de total" />
          </h3>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </section>

      <Table transactions={example} />

    </main>
  )
}
