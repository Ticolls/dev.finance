export function Transaction() {

    function removeTransaction() { }

    return (
        <tr>
            <td className="description"></td>
            <td className="${CSSclass}"></td>
            <td className="date"></td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação" className="remove-button" onClick={removeTransaction} />
            </td>
        </tr>
    )
}