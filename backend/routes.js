const login = require("./src/controllers/login");
const home = require("./src/controllers/home");
const usuarios = require("./src/controllers/usuarios");
const servicos = require("./src/controllers/servicos");
const chamados = require("./src/controllers/chamados");
const equipamentos = require("./src/controllers/equipamentos");

module.exports = (app) => {
  // endpoints de login
  app.get("/login/:email", login.handle);

  // endpoints da tela home
  app.get("/home", home.getEmpresas);

  // endpoints da tela de chamados
  app.get("/servicos", servicos.getServicosByEmpresaId);
  app.post("/chamados", chamados.criarChamado);

  // endpoints da tela de abrir chamados
  app.get("/usuarios/:usuario_id", usuarios.getUsuario);
  app.get("/equipamentos", equipamentos.getEquipamentosByUsuarioId);
};
