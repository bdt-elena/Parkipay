const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const UserService = require('../services/tarifas.service');
const service = new UserService();
const {
	createTarifaDto,
    updateTarifaDto,
    getTarifaId,
  } = require('../dtos/tarifas.dto');

  router.get('/', async (req, res) => {
    const { size } = req.query;
    const limit = size || 10;
    const tarifas = await service.find(limit);
    res.json(tarifas);
  });
  
  //STATUS CODE
  
  router.get(
    '/:id',
    validatorHandler(getTarifaId, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const tarifa = await service.findOne(id);
        res.json({
          success: true,
          message: 'Esta es la tarifa encontrado',
          data: tarifa,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    '/',
    validatorHandler(createTarifaDto, 'body'),
    async (req, res, next) => {
      const body = req.body;
      try {
        const newtarifa = await service.create(body);
        res.json({
          success: true,
          message: 'Tarifa creada correctamente',
          data: newtarifa,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  //MENSAJES DE ERROR
  router.patch(
    '/:id',
    validatorHandler(getTarifaId, 'params'),
    validatorHandler(updateTarifaDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const tarifa = await service.update(id, body);
        res.json({
          message: 'update',
          data: tarifa,
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
    validatorHandler(getTarifaId, 'params'),
    validatorHandler(updateTarifaDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const tarifa = await service.update(id, body);
        res.json({
          message: 'update total',
          data: tarifa,
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
    validatorHandler(getTarifaId, 'params'),
    async (req, res) => {
      const { id } = req.params;
      res.json({
        message: 'delete',
        id,
      });
    }
  );
  module.exports = router;