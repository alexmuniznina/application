const db = require("../database/connection/connect");

module.exports = {
  async getEmpresaById(req, res) {
    const connection = await db.connect();
    const { id } = req.params;

    let sql = `SELECT * FROM empresas WHERE id = ${id}`;

    const [row] = await connection
      .query(sql)
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(row[0]);
  },
};
