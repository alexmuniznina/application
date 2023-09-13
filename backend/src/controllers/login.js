const db = require('../connection/connect')

module.exports = {
    async handle(req, res) {
        const connection = await db.connect()

        const [rows] = await connection.query('SELECT * FROM usuarios')
        res.status(201).send(rows);
    }
}