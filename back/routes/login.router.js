const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const UserService = require('../services/user.service');
const service = new UserService();
const {
	loginUserDto,
	updateUserDto
  } = require('../dtos/user.dto');

  router.get('/', async (req, res, next) => {

	try {
  
	  const { size, e, p } = req.query;
	  const filter = {};
  
	  if (e) {
		Object.assign(filter, {
		  email: e
		})
	  }
  
	  if (p) {
		Object.assign(filter, {
		  password: p
		})
	  }
  
	  const users = await service.mongoLogin(size || 10, filter)
	  res.json({
		'success': true,
		'message': 'Estos son los usuarios encontrados',
		'Data': users
	  });
  
	} catch (error) {
	  next(error);
	}
  
  });

  router.patch(
    '/',
    validatorHandler(updateUserDto, 'params'),
    async (req, res, next) => {
	const body = req.body;
    try {
		console.log(JSON.stringify(body));
        const user = await service.mongoUpdate(body);
        res.json({
          success: true,
          message: 'Usuario editado correctamente',
          Data: user,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  module.exports = router;