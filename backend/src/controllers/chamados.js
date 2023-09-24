const db = require("../database/connection/connect");
const equipChamServico = require("../services/equipamentos-chamados.service");

module.exports = {
  async criarChamado(req, res) {
    const connection = await db.connect();
    const params = req.body;
    const servicos = params.servicos?.join(", ");

    const equipChamId = await equipChamServico.criaRegistro(params);
    const [result] = await connection
      .query(
        `INSERT INTO chamados (usuario_id, empresa_id, endereco, servicos, equipamentos_chamado_id, sintomas)
                            VALUE (?, ?, ?, ?, ?, ?)`,
        [
          params.usuario_id,
          params.empresa_id,
          params.endereco,
          servicos,
          equipChamId,
          params.sintomas,
        ]
      )
      .then()
      .catch((err) => {
        if (err) throw err;
      });

    res.status(201).send(result);
  },

  async getChamadosByUsuarioId(req, res) {
    const connection = await db.connect();
    const { usuario_id } = req.query;

    const [rows] = await connection
      .query("SELECT * FROM chamados WHERE usuario_id = ?", [usuario_id])
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(rows);
  },

  async getChamadosByEmpresaNome(req, res) {
    const connection = await db.connect();
    const { usuario_id } = req.query;
    const { nome_fantasia } = req.params;

    const sql = `SELECT DISTINCT c.id, c.usuario_id, c.empresa_id, c.endereco, c.servicos, c.equipamentos_chamado_id, c.sintomas, c.status, c.criado_em \
        FROM chamados AS c \
        INNER JOIN empresas AS e ON c.empresa_id = e.id \
        WHERE c.usuario_id = ${usuario_id} \
        AND e.nome_fantasia LIKE '%${nome_fantasia}%'`;

    const [rows] = await connection
      .query(sql)
      .then()
      .catch((err) => {
        if (err) throw new Error(err);
      });

    res.status(200).send(rows);
  },
};
