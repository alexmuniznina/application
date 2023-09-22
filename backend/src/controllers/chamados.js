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
};
