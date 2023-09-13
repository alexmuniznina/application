const Login = require('./src/controllers/login');

module.exports = app => {
    app.get('/', Login.handle);
}