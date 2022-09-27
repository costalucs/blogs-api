const express = require('express');
const LoginController = require('./controller/Login.controller');
const UserController = require('./controller/User.controller');
const PostController = require('./controller/Post.controller');
const categoriesController = require('./controller/Categories.controller');
const fieldVerificationLogin = require('./middlewares/fieldVerificationLogin');
const { validateUserFields, validateEmail } = require('./middlewares/User.middleware');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

// rota de login
app.post('/login', fieldVerificationLogin, LoginController.Login);

// rota user
app.get('/user', validateJWT, UserController.getAllUsers);
app.get('/user/:id', validateJWT, UserController.getUserById);
app.post('/user', validateEmail, validateUserFields, UserController.postUser);
// ...

// rota categories
app.get('/categories', validateJWT, categoriesController.getAllCategories);
app.post('/categories', validateJWT, categoriesController.postCategory);

// rota posts
app.get('/post', validateJWT, PostController.getAllPosts);
app.get('/post/:id', validateJWT, PostController.getOnePost);
app.post('/post/', validateJWT, PostController.insertPost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
