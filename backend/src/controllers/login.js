const db = require("../database/connection/connect");

module.exports = {
  async handle(req, res) {
    const connection = await db.connect();
    const { email } = req.params;

    const [row] = await connection
      .query("SELECT * FROM usuarios WHERE email = ?", [email])
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(row[0]);
  },
};
