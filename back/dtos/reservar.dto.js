const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const code =Joi.string();
const idUser = Joi.string();
const idEstablecimiento = Joi.string();
const cost = Joi.string().min(0).max(40);
const arrivingTime = Joi.string().min(1).max(24);
const establecimiento = Joi.string()
const active = Joi.boolean()


const createReservationDto = Joi.object({
    idUser: idUser.required(),
    idEstablecimiento: idEstablecimiento.required(),
    establecimiento:  establecimiento.required(),
    cost: cost.required(),
    arrivingTime: arrivingTime.required(),
    active : active.required()
});

const updateReservationDto = Joi.object({
    cost: cost,
    arrivingTime: arrivingTime,
});

const getReservationId = Joi.object({
  id: id.required(),
});

module.exports = {
    createReservationDto,
  updateReservationDto,
  getReservationId,
};