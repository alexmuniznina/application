const db = require("../database/connection/connect");

module.exports = {
  async getUsuario(req, res) {
    const connection = await db.connect();
    const { usuario_id } = req.params;

    const [row] = await connection
      .query("SELECT * FROM usuarios WHERE id = ?", [usuario_id])
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(row[0]);
  },

  async updateUsuario(req, res) {
    const connection = await db.connect();
    const { usuario_id } = req.params;
    const usuario = req.body;

    let sql = `UPDATE usuarios SET cpf='${usuario.cpf}', nome='${usuario.nome}', endereco='${usuario.endereco}',\
                bairro='${usuario.bairro}', cidade='${usuario.cidade}', estado='${usuario.estado}',\
                cep='${usuario.cep}', celular_1='${usuario.celular_1}', email='${usuario.email}'`;
    if (usuario.complemento)
      sql = sql + `, complemento='${usuario.complemento}'`;
    if (usuario.celular_2) sql = sql + `, celular_2='${usuario.celular_2}'`;
    if (usuario.telefone_1) sql = sql + `, telefone_1='${usuario.telefone_1}'`;
    if (usuario.telefone_2) sql = sql + `, telefone_2='${usuario.telefone_2}'`;
    sql = sql + ` WHERE id = ${usuario_id}`;

    const [row] = await connection
      .query(sql)
      .then()
      .catch((err) => {
        if (err) throw new Error(err);
      });

    res.status(200).send(row);
  },

  async criarUsuario(req, res) {
    const connection = await db.connect();
    const usuario = req.body;

    const sql = `INSERT INTO usuarios (cpf, nome, endereco, complemento, bairro, cidade, estado, cep, celular_1, celular_2, telefone_1, telefone_2, email, senha)
                        VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [row] = await connection
      .query(sql, [
        usuario.cpf,
        usuario.nome,
        usuario.endereco,
        usuario.complemento,
        usuario.bairro,
        usuario.cidade,
        usuario.estado,
        usuario.cep,
        usuario.celular_1,
        usuario.celular_2,
        usuario.telefone_1,
        usuario.telefone_2,
        usuario.email,
        usuario.senha,
      ])
      .then()
      .catch((err) => {
        if (err) throw new Error(err);
      });

    res.status(200).send(row);
  },
};
