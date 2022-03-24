const transactionController = require("./controllers/transactionController")
const express = require("express")


const route = express.Router()

route.get("/", (req, res) => { res.render("index") })

route.get("/api", transactionController.read)

route.delete("/api/:id", transactionController.delete)

route.post("/transaction/new", transactionController.create)


module.exports = route