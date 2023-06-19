const express = require('express');
const router = express.Router();
const ParkingService = require('../services/parkinglot.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ParkingService();
const {
  createParkinglot,
  updateParkinglot,
  getParkinglotsID,
} = require('../dtos/parkinglot.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const Parkinglots = await service.find(limit);
  res.json(Parkinglots);
});

//STATUS CODE

router.get(
  '/:id',
  validatorHandler(getParkinglotsID, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Parkinglot = await service.findOne(id);
      res.json({
        success: true,
        message: 'Este es el estacionamiento encontrado',
        data: Parkinglot,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createParkinglot, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newParkinglot = await service.create(body);
      res.json({
        success: true,
        message: 'Establecimiento creado correctamente',
        data: newParkinglot,
      });
    } catch (error) {
      next(error);
    }
  }
);

//MENSAJES DE ERROR
router.patch(
  '/:id',
  validatorHandler(getParkinglotsID, 'params'),
  validatorHandler(updateParkinglot, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Parkinglot = await service.update(id, body);
      res.json({
        message: 'update',
        data: Parkinglot,
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
  validatorHandler(getParkinglotsID, 'params'),
  validatorHandler(updateParkinglot, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Parkinglot = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: Parkinglot,
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
  validatorHandler(getParkinglotsID, 'params'),
  async (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'delete',
      id,
    });
  }
);

module.exports = router;
