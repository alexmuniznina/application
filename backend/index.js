const express = require("express")
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(express.json())
routes(app)

app.listen(3000, ()=>{
    console.log('\nServidor rodando na porta 3000');
})