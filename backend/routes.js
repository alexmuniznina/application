const login = require("./src/controllers/login");

module.exports = (app) => {
  // endpoints de login
  app.get("/login/:email", login.handle);

  // endpoints da tela home
  app.get("/home");
};
