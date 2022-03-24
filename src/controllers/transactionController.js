const Database = require("../db/config")

const transactionController = {
    async create(req, res) {
        try {
            const db = await Database()

            const description = req.body.description
            const amount = req.body.amount
            const date = req.body.date


            await db.run(`
            INSERT INTO transactions(
                description,
                amount,
                date
            ) VALUES(
                "${description}",
                ${amount},
                "${date}"
            )
        `)

            res.redirect("/")
        } catch (error) {
            console.error(error)
        }

    },

    async read(req, res) {

        try {
            const db = await Database()

            const transactions = await db.all(`SELECT * FROM transactions`)

            transactions.forEach((trans) => {
                trans.amount = trans.amount * 100
            })

            res.json(transactions)
        } catch (error) {
            console.error(error)
        }

    },

    async delete(req, res) {
        try {
            const db = await Database()

            const transactionId = req.params.id

            await db.run(`DELETE FROM transactions WHERE id = ${transactionId}`)

            res.json({ msg: "transaction deleted" })
        } catch (error) {
            console.error(error)
        }

    },
}


module.exports = transactionController