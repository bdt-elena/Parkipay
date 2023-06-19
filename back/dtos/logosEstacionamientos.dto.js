const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const idEstacionamiento =Joi.string().alphanum();

const createLogoEstacionamientoDto = Joi.object({
    id: id.required(),
    idEstacionamiento: idEstacionamiento.required(),
});

const updateLogoEstacionamientoDto = Joi.object({
    id: id,
    idEstacionamiento: idEstacionamiento,
});

const getLogoEstacionamientoId = Joi.object({
  id: id.required(),
});

module.exports = {
    createLogoEstacionamientoDto,
    updateLogoEstacionamientoDto,
    getLogoEstacionamientoId,
};