'use client'

import { useModal } from '@/app/hooks/useModal'
import './modal.css'
import { FormEvent, useState } from 'react'
import { useTransactions } from '@/app/hooks/useTransactions'

export function Modal() {

    const { setModalStatus } = useModal()
    const { createTransaction } = useTransactions()

    const [description, setDescription] = useState<String>("")
    const [amount, setamount] = useState<number>(0)
    const [date, setDate] = useState<String>("")

    function handleDescription(e: FormEvent<HTMLInputElement>) {
        setDescription(e.currentTarget.value)
    }

    function handleAmount(e: FormEvent<HTMLInputElement>) {
        setamount(Number(e.currentTarget.value))
    }

    function handleDate(e: FormEvent<HTMLInputElement>) {
        setDate(e.currentTarget.value)
    }

    async function handleSubmitForm() {
        createTransaction({ description, amount, date })

        setModalStatus(false)
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="form">
                    <h2>Nova Transação</h2>
                    <form>
                        <div className="input-group">
                            <label className="sr-only">Descrição</label>
                            <input type="text" className="description" name="description" placeholder="Descrição" onChange={handleDescription} />
                        </div>

                        <div className="input-group">
                            <label className="sr-only">Valor</label>
                            <input type="number" step="0.01" className="amount" name="amount" placeholder="0,00" onChange={handleAmount} />
                            <small className="help">Use o sinal - (negativo) para despesas
                                e , (vírgula) para casas decimais</small>
                        </div>

                        <div className="input-group">
                            <label className="sr-only">Data</label>
                            <input type="date" className="date" name="date" placeholder="Descrição" onChange={handleDate} />
                        </div>

                        <div className="input-group actions">
                            <a className="button cancel" onClick={() => setModalStatus(false)}>Cancelar</a>
                            <a className="save-button" onClick={handleSubmitForm}>Salvar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}