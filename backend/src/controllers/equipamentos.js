const db = require("../database/connection/connect");

module.exports = {
  async getEquipamentosByUsuarioId(req, res) {
    const connection = await db.connect();
    const { usuario_id } = req.query;

    let sql = `SELECT * FROM equipamentos AS e WHERE e.usuario_id = ${usuario_id} ORDER BY e.id`;

    const [rows] = await connection
      .query(sql)
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(rows);
  },
};
