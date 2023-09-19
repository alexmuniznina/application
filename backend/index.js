const express = require("express")
const routes = require('./routes')
const cors = require('cors')
const database = require('./src/database/connection/db-init')

const app = express()
app.use(express.json())
app.use(cors())
routes(app)

database.init()

app.listen(3000, () => {
    console.log('\nServidor rodando na porta 3000');
})