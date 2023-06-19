const express = require('express');
const router = express.Router();
const ResService = require('../services/reservacion.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new ResService();

const {
	createReservationDto,
  updateReservationDto,
  getReservationId,
  } = require('../dtos/reservar.dto');


//Obtener una sola reservacion por usuario
router.get('/', async (req, res, next) => {
  const body = req.body;
  try {
    const reservations = await service.mongoReadOne(body["id"]);
    res.json({
      success: true,
      message: 'Reservaciones via id usuario',
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
});

  //Obtener todas las reservaciones por Usuario
  router.get('/GetReservationUser/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const limit = 10;
    //const body = req.body;
    try {
      const reservations = await service.MongoGetAllViaUser(limit,id);
      res.json({
        success: true,
        message: 'Reservaciones via id usuario',
        data: reservations,
      });
    } catch (error) {
      next(error);
    }
  });



  //Obtener todas las reservaciones por establecimiento
  router.get('/GetReservationEstablishment', async (req, res, next) => {
    const limit = 10;
    const body = req.body;
    try {
      const reservations = await service.MongoGetAllViaEstablishment(limit,body);
      res.json({
        success: true,
        message: 'Reservaciones via id establecimiento',
        data: reservations,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    validatorHandler(createReservationDto, 'body'),
    async (req, res, next) => {
      const body = req.body;
      try {
        const newreservacion = await service.mongoCreate(body);
        res.json({
          success: true,
          message: 'reservacion creada correctamente',
          data: newreservacion,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  //MENSAJES DE ERROR
  router.patch(
    '/:id',
    validatorHandler(getReservationId, 'params'),
    validatorHandler(updateReservationDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const reservacion = await service.mongoUpdate(id, body);
        res.json({
          message: 'se ha actualizado la reservacion',
          data: reservacion,
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
    validatorHandler(getReservationId, 'params'),
    validatorHandler(updateReservationDto, 'body'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const reservacion = await service.updateComplete(id, body);
        res.json({
          message: 'update total',
          data: reservacion,
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
    validatorHandler(getReservationId, 'params'),
    async (req, res) => {
      const { id } = req.params;
      const reservacion = await service.mongoDelete(id);
      res.json({
        message: 'delete',
        data: reservacion,
        id,
      });
    }
  );
  module.exports = router;