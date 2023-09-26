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

  async adicionarEquipamento(req, res) {
    const connection = await db.connect();
    const params = req.body;

    const [result] = await connection
      .query(
        `INSERT INTO equipamentos (usuario_id, descricao, num_serie, btu, volt, marca, comodo, endereco)
                        VALUE (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          params.usuario_id,
          params.descricao,
          params.num_serie,
          params.btu,
          params.volt,
          params.marca,
          params.comodo,
          params.endereco,
        ]
      )
      .then()
      .catch((err) => {
        if (err) throw new Error(err);
      });

    res.status(201).send(result);
  },

  async removeEquipamento(req, res) {
    const connection = await db.connect();
    const { id } = req.params;

    const [result] = await connection
      .query(`DELETE FROM equipamentos WHERE id = ${id}`)
      .then()
      .catch((err) => {
        if (err) throw new Error(err);
      });

    res.status(200).send(result);
  },
};
