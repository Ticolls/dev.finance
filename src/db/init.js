const Database = require("./config")

const initDb = {
    async init() {
        const db = await Database()

        await db.exec(`
            CREATE TABLE transactions (
                id INTEGER PRIMARY KEY,
                description TEXT,
                amount INTEGER,
                date TEXT
            )
        `)


        await db.close()
    }
}

initDb.init()