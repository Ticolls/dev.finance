'use client'

import { useModal } from '@/app/hooks/useModal'
import './modal.css'
import { FormEvent, useState } from 'react'
import { useTransactions } from '@/app/hooks/useTransactions'

interface ModalProps {
    setModalOpen(open: boolean): void
}

export function Modal({ setModalOpen }: ModalProps) {

    const { createTransaction } = useTransactions()

    const [description, setDescription] = useState<String>("")
    const [amount, setamount] = useState<number>(0)
    const [date, setDate] = useState<String>("")

    const [amountError, setAmountError] = useState<boolean>(false)
    const [dateError, setDateError] = useState<boolean>(false)

    function handleDescription(e: FormEvent<HTMLInputElement>) {
        setDescription(e.currentTarget.value)
    }

    function handleAmount(e: FormEvent<HTMLInputElement>) {
        setamount(Number(e.currentTarget.value))
    }

    function handleDate(e: FormEvent<HTMLInputElement>) {
        setDate(e.currentTarget.value)
    }

    function verififyInput(): boolean {
        if (amount == 0) {
            setAmountError(true)
        } else {
            setAmountError(false)
        }

        if (date.trim() == "") {
            setDateError(true)
        } else {
            setDateError(false)
        }


        return amount != 0 && date.trim() != ""
    }

    async function handleSubmitForm() {
        if (verififyInput()) {
            try {
                await createTransaction({ description, amount, date })
                setModalOpen(false)
            }
            catch (e) {
                console.error(e)
            }
        }

        return
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
                            <input type="number" step="0.01" className={`amount ${amountError ? "error" : ""}`} name="amount" placeholder="0,00" onChange={handleAmount} />
                            {amountError ? (
                                <small className='error-msg'>Campo obrigatório</small>
                            ) :
                                <small className="help">
                                    Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais
                                </small>}

                        </div>

                        <div className="input-group">
                            <label className="sr-only">Data</label>
                            <input type="date" className={`date ${dateError ? "error" : ""}`} name="date" placeholder="Descrição" onChange={handleDate} />
                            {dateError ? (
                                <small className='error-msg'>Campo obrigatório</small>
                            ) : null}
                        </div>

                        <div className="input-group actions">
                            <a className="button cancel" onClick={() => setModalOpen(false)}>Cancelar</a>
                            <a className="save-button" onClick={handleSubmitForm}>Salvar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}