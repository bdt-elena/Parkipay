const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const UserService = require('../services/rolUsuario.service');
const service = new UserService();
const {
	createRolUsuarioDto,
    updateRolUsuarioDto,
  getRolUsuarioId,
  } = require('../dtos/rolUsuario.dto');

  router.get('/', async (req, res) => {
    const { size } = req.query;
    const limit = size || 10;
    const rolesUsuario = await service.find(limit);
    res.json(rolesUsuario);
  });
  
  //STATUS CODE
  
  router.get(
    '/:id',
    validatorHandler(getRolUsuarioId, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const rolUsuario = await service.findOne(id);
        res.json({
          success: true,
          message: 'Esta es la rolUsuario encontrado',
          data: rolUsuario,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    '/',
    validatorHandler(createRolUsuarioDto, 'body'),
    async (req, res, next) => {
      const body = req.body;
      try {
        const newrolUsuario = await service.create(body);
        res.json({
          success: true,
          message: 'rolUsuario creada correctamente',
          data: newrolUsuario,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  //MENSAJES DE ERROR
  router.patch(
    '/:id',
    validatorHandler(getRolUsuarioId, 'params'),
    validatorHandler(updateRolUsuarioDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const rolUsuario = await service.update(id, body);
        res.json({
          message: 'update',
          data: rolUsuario,
          id,
        });
      } catch (error) {
        res.status(404).json({
          message: error.message,
        });
      }
    }
  );
  
  router.put(
    '/:id',
    validatorHandler(getRolUsuarioId, 'params'),
    validatorHandler(updateRolUsuarioDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const rolUsuario = await service.update(id, body);
        res.json({
          message: 'update total',
          data: rolUsuario,
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
    validatorHandler(getRolUsuarioId, 'params'),
    async (req, res) => {
      const { id } = req.params;
      res.json({
        message: 'delete',
        id,
      });
    }
  );
  module.exports = router;