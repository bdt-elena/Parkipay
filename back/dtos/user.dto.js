const { boolean } = require('joi');
const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const username = Joi.string();
const name = Joi.string();
const password = Joi.string();
const telephone = Joi.number();
const email = Joi.string();
const activo = Joi.boolean();
const dueño = Joi.boolean();

const loginUserDto = Joi.object({
    username: username,
    password: password,
});

const createUserDto = Joi.object({
    usuario: username.required(),
    name: name.required(),
    password: password.required(),
    telephone: telephone.required(),
    email: email.required(),
    activo: activo.required(),
    dueño: dueño.required()
});

const updateUserDto = Joi.object({
    id: id,
    usuario: username,
    name: name,
    password: password,
    telephone: telephone,
    email: email
});

const getUserId = Joi.object({
  id: id,
});

module.exports = {
    loginUserDto,
    createUserDto,
  updateUserDto,
  getUserId,
};