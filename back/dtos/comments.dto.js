const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO

const id = Joi.string();
const name = Joi.string().min(3).max(50);
const text = Joi.string();

//const createProductDto = Joi.object({
const createComment = Joi.object({
  name: name.required(),
  text: text.required(),
});

const updateComment = Joi.object({
    text: text.required(),
});

const getCommentID = Joi.object({
  id: id.required(),
});

module.exports = {
  createComment,
  updateComment,
  getCommentID,
};
