const db = require("../database/connection/connect");

module.exports = {
  async getEmpresasByNomeServicos(req, res) {
    const connection = await db.connect();
    const { nome, filtros } = req.query;

    const columns =
      "e.id, e.cnpj, e.celular_1, e.celular_2, e.telefone_1, e.telefone_2, e.nome_fantasia, e.email, e.endereco, e.descricao_curta, e.sobre_nos, e.criado_em";

    let sql;

    if (nome != null) {
      if (filtros != null) {
        if (typeof filtros == "string") {
          sql = `SELECT ${columns} FROM empresas AS e JOIN servicos AS s ON e.id = s.empresa_id WHERE e.nome_fantasia LIKE '%${nome}%' AND s.tipo = '${filtros}'`;
        } else if (typeof filtros == "object") {
          let str = filtros.map((s) => `'${s}'`);
          sql = `SELECT DISTINCT ${columns} FROM empresas AS e JOIN servicos AS s ON e.id = s.empresa_id WHERE e.nome_fantasia LIKE '%${nome}%' AND s.tipo IN (${str})`;
        }
      } else {
        sql = `SELECT ${columns} FROM empresas AS e WHERE e.nome_fantasia LIKE '%${nome}%'`;
      }
    } else {
      if (filtros != null) {
        if (typeof filtros == "string") {
          sql = `SELECT ${columns} FROM empresas AS e JOIN servicos AS s ON e.id = s.empresa_id WHERE s.tipo = '${filtros}'`;
        } else if (typeof filtros == "object") {
          let str = filtros.map((s) => `'${s}'`);
          sql = `SELECT DISTINCT ${columns} FROM empresas AS e JOIN servicos AS s ON e.id = s.empresa_id WHERE s.tipo IN (${str})`;
        }
      } else {
        sql = `SELECT ${columns} FROM empresas AS e`;
      }
    }

    sql = sql + " ORDER BY e.nome_fantasia";

    const [rows] = await connection
      .query(sql)
      .then()
      .catch((err) => {
        if (err) throw new Error(err.message);
      });

    res.status(200).send(rows);
  },
};
