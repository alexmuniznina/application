const login = require("./src/controllers/login");
const home = require("./src/controllers/home");
const usuarios = require("./src/controllers/usuarios");
const servicos = require("./src/controllers/servicos");
const chamados = require("./src/controllers/chamados");
const equipamentos = require("./src/controllers/equipamentos");
const empresas = require("./src/controllers/empresas");

module.exports = (app) => {
  // endpoints de login
  app.get("/login/:email", login.handle);

  // endpoints da tela de dados pessoais
  app.put("/usuarios/:usuario_id", usuarios.updateUsuario);

  // endpoints da tela home
  app.get("/home", home.getEmpresasByNomeServicos);
  app.get("/empresas", empresas.getEmpresas);

  // endpoints da tela de chamados
  app.get("/servicos", servicos.getServicosByEmpresaId);
  app.get("/empresas/:id", empresas.getEmpresaById);
  app.get("/chamados", chamados.getChamadosByUsuarioId);
  app.get("/chamados/:nome_fantasia", chamados.getChamadosByEmpresaNome);
  app.post("/chamados", chamados.criarChamado);

  // endpoints da tela de abrir chamados
  app.get("/usuarios/:usuario_id", usuarios.getUsuario);
  app.get("/equipamentos", equipamentos.getEquipamentosByUsuarioId);

  // endpoints da tela de equipamentos
  app.post("/equipamentos", equipamentos.adicionarEquipamento);
  app.delete("/equipamentos/:id", equipamentos.removeEquipamento);

  // endpoints da tela de registrar usuário
  app.post("/usuarios", usuarios.criarUsuario);
};
