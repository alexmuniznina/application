const db = require("../database/connection/connect");

module.exports = {
  async handle(req, res) {
    const connection = await db.connect();
    const { email } = req.params;
    const [row] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      (err) => {
        if (err) throw new Error(err.message);
      }
    );
    res.status(200).send(row[0]);
  },
};

// teste
/*
let result = await request
            .input('nome', sql.NVarChar, usuario.nome)
            .input('email', sql.NVarChar, usuario.email)
            .input('login', sql.NVarChar, usuario.login)
            .input('senha', sql.NVarChar, usuario.senha).query(`INSERT INTO dbo.usuario (nome, email, login, senha) VALUES (@nome, @email,@login, @senha);`);
*/
/*
app.post("/msg", (req, res) => {
  console.log(req.body)
  connection.query('INSERT INTO plans (topic, notes, resources) VALUES 
  (?,?,?)', [req.body.topic, req.body.note, req.body.resource],(error, 
  results) => {
     if (error) return res.json({ error: error });

     });
 });          
*/
