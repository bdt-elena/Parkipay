const express = require('express');
//const UserRouter = require('./login.router');
const loginService = require('./login.router');
const registerService = require('./register.router');
const reserveService = require('./reservar.router');
const tarifaService = require('./tarifas.router');
const UsuarioService = require('./UserProfile.router');
const commentsService = require('./comments.router');
const logosService = require('./logos.router');
const logosEstacionamientosService = require('./logosEstacionamientos.router');
const establecimientos = require('./establecimientos.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/login', loginService);
  router.use('/signin', registerService);
  router.use('/reserve', reserveService);
  router.use('/tarifas', tarifaService);
  router.use('/Usuario', UsuarioService);
  router.use('/comments', commentsService);
  router.use('/logos', logosService);
  router.use('/logosEstacionamientos', logosEstacionamientosService);
  router.use('/establecimientos', establecimientos);
  //router.use('/users', productsRouter);
  //router.use('/categories', productsRouter);
}

module.exports = routerApi;
