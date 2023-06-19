const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO


/*isActive: faker.datatype.boolean(),
id: faker.datatype.uuid(),
name: faker.company.companyName(),
parkinglot: faker.datatype.number({ min: 10, max: 100}),
address: faker.address.streetAddress(),
image: faker.image.imageUrl(),*/

const id = Joi.string();
const isActive = Joi.boolean();
const name = Joi.string().min(3).max(50);
const address = Joi.string().min(3).max(100);
const parkinglots = Joi.number().integer().min(100);
const hourPrice = Joi.number();
const image = Joi.string();
const resenia = Joi.object().keys({
  nombre:Joi.string(),
  contenido: Joi.string()
});

const nombre = Joi.string();
const contenido = Joi.string();


//const createProductDto = Joi.object({
const createEstablecimiento = Joi.object({
  isActive: isActive.default(true),
  name: name.required(),
  address: address.required(),
  parkinglots: parkinglots.required(),
  hourPrice: hourPrice.required(),
  resenia: resenia,
  logo: image,
});

const updateEstablecimiento = Joi.object({
  isActive: isActive,
  name: name,
  address: address,
  parkinglots: parkinglots,
  hourPrice: hourPrice,
  resenia: resenia,
  logo: image,
});

const reseniaEstablecimiento = Joi.object({
  nombre: nombre.required(),
  contenido: contenido.required()
});

const getEstablecimientoID = Joi.object({
  id: id.required(),
});

module.exports = {
  createEstablecimiento,
  updateEstablecimiento,
  getEstablecimientoID,
  reseniaEstablecimiento
};
