const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const imagen =Joi.string();

const createLogoDto = Joi.object({
    id: id.required(),
    imagen: imagen.required(),
});

const updateLogoDto = Joi.object({
    id: id,
    imagen: imagen,
});

const getLogoId = Joi.object({
  id: id.required(),
});

module.exports = {
    createLogoDto,
    updateLogoDto,
    getLogoId,
};