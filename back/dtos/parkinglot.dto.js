const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO

const isActive = Joi.boolean();
const idEstablecimiento = Joi.string();
const IDparkinglot = Joi.string();

//const createProductDto = Joi.object({
const createParkinglot = Joi.object({
  isActive: isActive.required(),
  idEstablecimiento: idEstablecimiento.required(),
  IDparkinglot: IDparkinglot.required(),
});

const updateParkinglot = Joi.object({
  isActive: isActive,
  idEstablecimiento: idEstablecimiento.required(),
  IDparkinglot: IDparkinglot.required(),
});

const getParkinglotsID = Joi.object({
    idEstablecimiento: idEstablecimiento.required(),
    IDparkinglot: IDparkinglot.required(),
});

module.exports = {
    createParkinglot,
    updateParkinglot,
    getParkinglotsID,
};
