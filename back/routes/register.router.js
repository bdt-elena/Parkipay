const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const service = new UserService();
const validatorHandler = require('./../middlewares/validator.handler');
const {
	createUserDto,
  updateUserDto,
  getUserId,
  } = require('../dtos/user.dto');

  /*router.get('/', async (req, res) => {
    const { size } = req.query;
    const limit = size || 10;
    const rolesUsuario = await service.find(limit);
    res.json(rolesUsuario);
  });*/
  
  //STATUS CODE
  
  router.get(
    '/',
    validatorHandler(getUserId, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = await service.findOne(id);
        res.json({
          success: true,
          message: 'Esta es la user encontrado',
          data: user,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    '/',
    validatorHandler(createUserDto, 'body'),
    async (req, res, next) => {
      const body = req.body;
      try {
        const newuser = await service.mongoCreate(body);
        res.json({
          success: true,
          message: 'user creado correctamente',
          Data: newuser,
        });
      } catch (error) {
        
        next(error);
      }
    }
  );
  
  //MENSAJES DE ERROR
  router.patch(
    '/',
    validatorHandler(getUserId, 'params'),
    validatorHandler(updateUserDto, 'body'),
    async (req, res) => {
      try {
        console.log("si entra hasta aca")
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body);
        res.json({
          message: 'update',
          data: user,
          id,
        });
      } catch (error) {
        res.status(404).json({
          message: error.message,
        })
      }
    }
  );
  
  router.put(
    '/',
    validatorHandler(getUserId, 'params'),
    validatorHandler(updateUserDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body);
        res.json({
          message: 'update total',
          data: user,
          id,
        });
      } catch (error) {
        res.status(404).json({
          message: error.message,
        });
      }
    }
  );
  
  router.delete(
    '/:id',
    validatorHandler(getUserId, 'params'),
    async (req, res) => {
      const { id } = req.params;
      res.json({
        message: 'delete',
        id,
      });
    }
  );
  module.exports = router;