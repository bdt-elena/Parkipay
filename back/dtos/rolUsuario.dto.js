const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string();
const rolUsuario =Joi.string().alphanum();

const createRolUsuarioDto = Joi.object({
    id: id.required(),
    rolUsuario: rolUsuario.required(),
});

const updateRolUsuarioDto = Joi.object({
    id: id,
    rolUsuario: rolUsuario,
});

const getRolUsuarioId = Joi.object({
  id: id.required(),
});

module.exports = {
    createRolUsuarioDto,
    updateRolUsuarioDto,
  getRolUsuarioId,
};