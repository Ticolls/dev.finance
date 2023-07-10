/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react';
import { Table } from '../components/table/Table';
import './finances.css'
import { useTransactions } from '../hooks/useTransactions';
import { GetServerSideProps } from 'next';
import { parseCookies } from "nookies"


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  console.log(ctx.req.cookies)

  const cookies = parseCookies(ctx)
  const token = cookies["token"]


  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Finances() {

  const { transactions, loadTransactions, load } = useTransactions();

  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  function handleCards() {
    let income = 0.0, expense = 0.0, total = 0.0;

    for (let transaction of transactions) {
      total = total + transaction.amount;

      if (transaction.amount >= 0) {
        income = income + transaction.amount;
      } else {
        expense = expense + transaction.amount;
      }
    }

    setIncome(income);
    setExpense(expense);
    setTotal(total);

  }

  useEffect(() => {
    loadTransactions();
  }, [load]);

  useEffect(() => {
    handleCards();
  }, [transactions.length]);




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

      <Table transactions={transactions} />

    </main>
  )
}


