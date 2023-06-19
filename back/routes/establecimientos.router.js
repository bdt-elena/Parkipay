const express = require('express');
const router = express.Router();
const ProductService = require('../services/establecimientos.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ProductService();
const {
  createEstablecimiento,
  updateEstablecimiento,
  getEstablecimientoID,
  reseniaEstablecimiento,
} = require('../dtos/establecimientos.dto');

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const Establecimientos = await service.find(limit);
  res.json(Establecimientos);
});

//STATUS CODE

router.get(
  '/findById/:id',
  validatorHandler(getEstablecimientoID, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      console.log('no pasa el find');
      const Establecimiento = await service.findOne(id);
      console.log('pasa el find');
      res.json({
        success: true,
        message: 'Este es el establecimiento encontrado',
        data: Establecimiento,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/active', async (req, res, next) => {
  try {
    const Establecimiento = await service.findActiveEstablecimientos();
    res.json({
      success: true,
      message: 'Este es el establecimiento encontrado',
      data: Establecimiento,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createEstablecimiento, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newEstablecimiento = await service.create(body);
      res.json({
        success: true,
        message: 'Establecimiento creado correctamente',
        data: newEstablecimiento,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/search', async (req, res, next) => {
  const body = req.body;
  try {
    const Establecimiento = await service.findByName(body.name);
    res.json(Establecimiento);
  } catch (error) {
    next(error);
  }
});

//MENSAJES DE ERROR
router.patch(
  '/edit/:id',
  validatorHandler(getEstablecimientoID, 'params'),
  validatorHandler(updateEstablecimiento, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Establecimiento = await service.update(id, body);
      res.json({
        message: 'update',
        data: Establecimiento,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);
router.patch(
  '/addResenia/:id',
  validatorHandler(getEstablecimientoID, 'params'),
  validatorHandler(reseniaEstablecimiento, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Establecimiento = await service.addResenia(id, body);
      res.json({
        message: 'reseña añadida ',
        data: Establecimiento,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

/*router.put(
  '/:id',
  validatorHandler(getEstablecimientoID, 'params'),
  validatorHandler(updateEstablecimiento, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Establecimiento = await service.updateComplete(id, body);
      res.json({
        message: 'update total',
        data: Establecimiento,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);*/

router.delete(
  '/:id',
  validatorHandler(getEstablecimientoID, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const Establecimiento = await service.delete(id);
    res.json({
      message: 'delete',
      Establecimiento,
    });
  }
);

module.exports = router;
