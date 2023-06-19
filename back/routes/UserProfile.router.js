const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const service = new UserService();
const validatorHandler = require('./../middlewares/validator.handler');
const {
	getUserId
  } = require('../dtos/user.dto');

router.post(
    '/',
    validatorHandler(getUserId, 'params'),
    async (req, res, next) => {
      console.log("si entra");
	const body = req.body;
    try {
        await service.mongoDelete(body);
        res.json({
          success: true,
          message: 'Usuario eliminado correctamente'
        });

      } catch (error) {
        next(error);
      }
    }
  );




module.exports = router;