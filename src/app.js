const express = require('express');
const LoginController = require('./controller/Login.controller');
const fieldVerificationLogin = require('./middlewares/fieldVerificationLogin');

// ...

const app = express();

app.use(express.json());
// rota de login
app.post('/login', fieldVerificationLogin, LoginController.Login);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
