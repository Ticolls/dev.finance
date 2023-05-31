import { useModal } from '@/app/hooks/useModal'
import './modal.css'

export function Modal() {

    const { setModalStatus } = useModal()

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="form">
                    <h2>Nova Transação</h2>
                    <form>
                        <div className="input-group">
                            <label className="sr-only" htmlFor="description">Descrição</label>
                            <input type="text" className="description" name="description" placeholder="Descrição" />
                        </div>

                        <div className="input-group">
                            <label className="sr-only" htmlFor="amount">Valor</label>
                            <input type="number" step="0.01" className="amount" name="amount" placeholder="0,00" />
                            <small className="help">Use o sinal - (negativo) para despesas
                                e , (vírgula) para casas decimais</small>
                        </div>

                        <div className="input-group">
                            <label className="sr-only" htmlFor="date">Data</label>
                            <input type="date" className="date" name="date" placeholder="Descrição" />
                        </div>

                        <div className="input-group actions">
                            <a className="button cancel" onClick={() => setModalStatus(false)}>Cancelar</a>
                            <a className="save-button">Salvar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}