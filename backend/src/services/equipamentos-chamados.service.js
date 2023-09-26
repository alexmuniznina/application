const db = require("../database/connection/connect");
const { CONSTANTS } = require("../../constants");

module.exports = {
  async criaRegistro(payload) {
    const connection = await db.connect();

    const equips = [...payload.equipamentos_id];

    let sql = `INSERT INTO equipamentos_chamado (`;
    let str = "";
    for (let i = 1; i <= CONSTANTS.NUMERO_DE_EQUIPAMENTOS; i++) {
      str = str + "equipamento_id_" + i;
      if (i < CONSTANTS.NUMERO_DE_EQUIPAMENTOS) str = str + ", ";
      else str = str + ") ";
    }
    sql = sql + str + "VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const [result] = await connection
      .query(sql, [
        equips[0] ? equips[0] : null,
        equips[1] ? equips[1] : null,
        equips[2] ? equips[2] : null,
        equips[3] ? equips[3] : null,
        equips[4] ? equips[4] : null,
        equips[5] ? equips[5] : null,
        equips[6] ? equips[6] : null,
        equips[7] ? equips[7] : null,
        equips[8] ? equips[8] : null,
        equips[9] ? equips[9] : null,
        equips[10] ? equips[10] : null,
      ])
      .then()
      .catch((err) => {
        if (err) throw err;
      });

    return result.insertId;
  },
};
