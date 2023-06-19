const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const tarifa =Joi.string();

const createTarifaDto = Joi.object({
    id: id.required(),
    tarifa: tarifa.required(),
});

const updateTarifaDto = Joi.object({
    id: id,
    tarifa: tarifa,
});

const getTarifaId = Joi.object({
  id: id.required(),
});

module.exports = {
    createTarifaDto,
    updateTarifaDto,
    getTarifaId,
};