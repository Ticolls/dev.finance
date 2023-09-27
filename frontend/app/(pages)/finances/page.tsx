/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import './finances.css'
import { AddTransaction } from '@/app/components/addTransaction/AddTransaction';
import { loadTransactions } from '@/app/api/transaction';
import { TableBody } from '@/app/components/table/TableBody';

export default async function Finances() {

  const transactions = await loadTransactions();

  let income = 0.0, expense = 0.0, total = 0.0;

  for (let transaction of transactions) {
    total = total + transaction.amount;

    if (transaction.amount >= 0) {
      income = income + transaction.amount;
    } else {
      expense = expense + transaction.amount;
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

      <section className="transaction">

            <AddTransaction />

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


              <TableBody transactions={transactions} />

            </table>

        </section>

    </main>
  )
}


