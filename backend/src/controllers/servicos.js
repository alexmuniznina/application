const db = require("../database/connection/connect");

module.exports = {
  async getServicosByEmpresaId(req, res) {
    const connection = await db.connect();
    const { empresa_id } = req.query;

    let sql = `SELECT * FROM servicos AS s WHERE s.empresa_id = ${empresa_id}`;

    sql = sql + " ORDER BY s.tipo";

    const [rows] = await connection
      .query(sql)
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(rows);
  },
};
