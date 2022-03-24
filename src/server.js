const express = require('express')
const route = require('./route')
const cors = require("cors")

const path = require('path')
const { urlencoded } = require('express')

const server = express()

server.set('view engine', 'ejs')

server.use(express.static('public'))

server.set('views', path.join(__dirname, 'views'))

server.use(urlencoded({ extended: true }))

server.use(cors())

server.use(express.json())

server.use(route)

server.listen(4000, () => console.log("rodando"))
