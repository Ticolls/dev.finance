
export default function Home() {



  return (
    <main className="container">

      <section id="balance">
        <h2 className="sr-only">Balanço</h2>

        <div className="card" id="income-card">
          <h3>
            <span>
              Entradas
            </span>
            <img src="./assets/income.svg" alt="Imagem de entradas" />
          </h3>
          <p>R$ 00,00</p>
        </div>

        <div className="card" id="expense-card">
          <h3>
            <span>
              Saídas
            </span>
            <img src="./assets/expense.svg" alt="Imagem de Saídas" />
          </h3>
          <p>R$ 00,00</p>
        </div>

        <div className="card total" id="total-card">
          <h3>
            <span>
              total
            </span>
            <img src="./assets/total.svg" alt="Imagem de total" />
          </h3>
          <p>R$ 00,00</p>
        </div>
      </section>

      <section id="transaction">

        <a href="#" className="button new">+ Nova transação</a>

        <h2 className="sr-only">Transações</h2>
        <table id="data-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
          </tbody>
        </table>
      </section>

    </main>
  )
}
