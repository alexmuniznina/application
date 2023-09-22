const db = require("../database/connection/connect");

module.exports = {
  async getUsuario(req, res) {
    const connection = await db.connect();
    const { usuario_id } = req.params;
    const [row] = await connection.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [usuario_id],
      (err) => {
        if (err) throw new Error(err.message);
      }
    );
    res.status(200).send(row[0]);
  },
};
