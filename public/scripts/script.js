const APIUrl = "http://localhost:4000/api"
const submitUrl = "http://localhost:4000/transaction/new"

let transactions = []

async function getTransactions() {
    const trans = await axios.get(APIUrl)
    const data = trans.data

    transactions = data
}

const Modal = {

    description: document.querySelector('.modal-overlay #description'),
    amount: document.querySelector('.modal-overlay #amount'),
    date: document.querySelector('.modal-overlay #date'),

    open() {
        // Abrir o modal
        // Adicionar a class active no modal
        this.clear()
        document.querySelector('.modal-overlay').classList.add('active')
    },

    close() {
        // Fechar o modal
        // Remover a class active no modal
        document.querySelector('.modal-overlay').classList.remove('active')
        tools.noValue.removeAmount()
        tools.noValue.removeDate()
    },

    clear() {
        const description = document.querySelector('.modal-overlay #description')
        const amount = document.querySelector('.modal-overlay #amount')
        const date = document.querySelector('.modal-overlay #date')

        description.value = ""
        amount.value = ""
        date.value = ""

    }
}


const Transaction = {
    incomes() {
        //Somar as entradas
        let income = 0

        transactions.forEach((trans) => {
            amount = trans.amount
            if (amount > 0) {
                income += amount
            }
        })

        return income
    },

    expenses() {
        //Somar as saídas
        let expense = 0

        transactions.forEach((trans) => {
            amount = trans.amount
            if (amount < 0) {
                expense += amount
            }
        })

        return expense
    },

    total() {
        // entradas - saídas

        const incomes = this.incomes()
        const expenses = this.expenses()

        total = incomes + expenses

        return total
    },

    async newTransaction() {

        let description = Modal.description.value
        let amount = Modal.amount.value
        let date = Modal.date.value

        if (amount.trim() === "" || amount === 0) {

            tools.noValue.setAmount()

            return
        } else {
            tools.noValue.removeAmount()
        }

        if (date.trim() === "") {

            tools.noValue.setDate()

            return
        } else {
            tools.noValue.removeDate()
        }

        date = tools.formatDate(date)

        const response = await axios.post(submitUrl, {
            description: description,
            amount: amount,
            date: date
        })

        Modal.close()

        window.location.reload()
    },

}

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement("tr")
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        tr.setAttribute("id", `${transaction.id}`)

        //Função no onclick da imagem para remover a transação tanto da interface, quanto do banco
        tr.children[3].addEventListener('click', async () => {

            const response = await axios.delete(`${APIUrl}/${index}`)

            window.location.reload()
        })

        this.transactionsContainer.appendChild(tr)
    },


    innerHTMLTransaction(trans) {
        const CSSclass = trans.amount > 0 ? "income" : "expense"

        const amount = tools.formatCurrency(trans.amount)

        const html = `
                        <td class="description">${trans.description}</td>
                        <td class="${CSSclass}">${amount}</td>
                        <td class="date">${trans.date}</td>
                        <td>
                            <img src="./assets/minus.svg" alt="Remover transação" class="remove-button" type="submit" method="POST">
                        </td>
                `

        return html
    },

    updateBalance() {
        const incomeCard = document.querySelector("#income-card p")
        const expenseCard = document.querySelector("#expense-card p")
        const totalCard = document.querySelector("#total-card p")

        const incomes = tools.formatCurrency(Transaction.incomes())
        const expenses = tools.formatCurrency(Transaction.expenses())
        const total = tools.formatCurrency(Transaction.total())

        incomeCard.innerHTML = incomes
        expenseCard.innerHTML = expenses
        totalCard.innerHTML = total
    },

    renderTransactions() {

        tools.orderWithDate(transactions)

        transactions.forEach((trans) => {
            DOM.addTransaction(trans, trans.id)
        })
    }
}

const tools = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    },

    simplifyFormatCurrency(value) {
        if (String(value).includes(",")) {
            value = String(value).replace(/\D/g, ".")
        }

        value = Number(value) * 100

        return value
    },

    formatDate(date) {

        if (date === 0) {
            return " "
        }
        date = date.split("-")

        date = `${date[2]}/${date[1]}/${date[0]}`

        return date
    },

    orderWithDate(transactions) {
        for (let i = 0; i < transactions.length; i++) {
            for (let j = 0; j < transactions.length; j++) {
                if (tools.biggerDate(transactions[i].date, transactions[j].date) === transactions[i].date) {
                    var temp = transactions[j]
                    transactions[j] = transactions[i]
                    transactions[i] = temp
                }
            }
        }

    },

    biggerDate(date1, date2) {
        d1 = date1.split("/")
        d2 = date2.split("/")

        //Comparando os anos
        if (Number(d1[2]) > Number(d2[2])) {
            return date1
        } else if (Number(d1[2]) < Number(d2[2])) {
            return date2
        } else if (Number(d1[2]) === Number(d2[2])) {
            //comparando os meses
            if (Number(d1[1]) > Number(d2[1])) {
                return date1
            } else if (Number(d1[1]) < Number(d2[1])) {
                return date2
            } else if (Number(d1[1]) === Number(d2[1])) {
                //comparando os dias
                if (Number(d1[0]) > Number(d2[0])) {
                    return date1
                } else if (Number(d1[0]) < Number(d2[0])) {
                    return date2
                } else {
                    return date1
                }
            }
        }
    },

    noValue: {
        amountInput: document.getElementById("amount"),
        setAmount() {
            this.amountInput.classList.add("no-value")
        },
        removeAmount() {
            this.amountInput.classList.remove("no-value")
        },

        dateInput: document.getElementById("date"),
        setDate() {
            this.dateInput.classList.add("no-value")
        },
        removeDate() {
            this.dateInput.classList.remove("no-value")
        },

    },

    onclickAttribution() {
        saveButton = document.getElementById("save-button")
        cancelButton = document.querySelector(".cancel")

        saveButton.onclick = Transaction.newTransaction
        cancelButton.onclick = Modal.close
    }
}

async function main() {
    await getTransactions()

    tools.onclickAttribution()

    DOM.renderTransactions()

    DOM.updateBalance()
}

main()