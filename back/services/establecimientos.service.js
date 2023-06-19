const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('../utils');
const Model = require('../models/establecimiento.model.js');

const errNotFound = 'No se logró encontrar lo buscado';
const errEmpty = 'Aún no hay establecimientos creados';

class EstablecimientosService {
  constructor() {}

  //-----------------------------------------------------------------------------------
  //Crear Establecimientos
  async create(data) {
    const model = new Model(data);
    await model.save();
    return model;
  }

  //-----------------------------------------------------------------------------------
  //Buscar Establecimientos

  async findByName(name){
    const filter = {};
    var nameRegex = new RegExp(name);
    Object.assign(filter, {address: {$regex: nameRegex, $options: 'i'}},);

    var Establecimientos = await Model.find(filter);
    if (Establecimientos == undefined || Establecimientos == null)
      throw boom.notFound(errNotFound);
    else if (Establecimientos.length <= 0) throw boom.notFound(errEmpty);

    return [].concat(Establecimientos || []);
  }

  async find(limit) {
    var Establecimientos = await Model.find();

    /*if (Establecimientos == undefined || Establecimientos == null)
      throw boom.notFound(errNotFound);
    else if (Establecimientos.length <= 0) throw boom.notFound(errEmpty);*/

    Establecimientos = Establecimientos.filter(
      (item, index) => item && index < limit
    );
    return Establecimientos;
  }

  //-----------------------------------------------------------------------------------
  //Encontrar Establecimientos activos
  async findActiveEstablecimientos() {
    const filter = {};

    Object.assign(filter, {
      isActive: true,
    });

    var Establecimientos = await Model.find(filter);
    if (Establecimientos == undefined || Establecimientos == null)
      throw boom.notFound(errNotFound);
    else if (Establecimientos.length <= 0) throw boom.notFound(errEmpty);

    return Establecimientos;
  }

  //-----------------------------------------------------------------------------------
  //Encontrar Establecimiento por ID
  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const Establecimiento = await Model.findOne({
      _id: id,
    });
    //NOT FOUND
    validateData(Establecimiento, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(
      Establecimiento,
      CONFLICT,
      'CONFLICTO, El Establecimiento esta bloqueado.',
      (data) => data.isActive == false
    );
    return Establecimiento;
  }

  //-----------------------------------------------------------------------------------
  //Actualizar Establecimiento por ID
  async update(id, changes) {
    let establecimientoACambiar = await Model.findOne({
      _id: id,
    });

    if (establecimientoACambiar == undefined || establecimientoACambiar == null)
      throw boom.notFound(errNotFound);
    if (establecimientoACambiar.length <= 0) throw boom.notFound(errEmpty);

    let establecimientoOriginal = {
      isActive: establecimientoACambiar.isActive,
      name: establecimientoACambiar.name,
      address: establecimientoACambiar.address,
      parkinglot: establecimientoACambiar.parkinglot,
      hourPrice: establecimientoACambiar.hourPrice,
      image: establecimientoACambiar.image,
    };

    const { isActive, name, address, parkinglot, hourPrice, image } = changes;
    if (isActive !== undefined) establecimientoACambiar.isActive = isActive;
    if (name) establecimientoACambiar.name = name;
    if (address) establecimientoACambiar.address = address;
    if (parkinglot) establecimientoACambiar.parkinglot = parkinglot;
    if (hourPrice) establecimientoACambiar.hourPrice = hourPrice;
    if (image) establecimientoACambiar.image = image;

    await establecimientoACambiar.save();

    return {
      old: establecimientoOriginal,
      changed: establecimientoACambiar,
    };
  }

  async addResenia(id, resenia) {
    console.log('id de resenia', id);
    let establecimientoACambiar = await Model.findOne({
      _id: id
    });

    if (establecimientoACambiar == undefined || establecimientoACambiar == null)
      throw boom.notFound(errNotFound);
    if (establecimientoACambiar.length <= 0) throw boom.notFound(errEmpty);

    establecimientoACambiar.resenias.push(resenia);
    await establecimientoACambiar.save();

    return establecimientoACambiar;
  }

  /*async updateComplete(id, changes) {
    const index = this.Establecimientos.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Establecimiento no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentEstablecimiento = this.Establecimientos[index];
    this.Establecimientos[index] = {
      id: currentEstablecimiento.id,
      ...changes,
    };
    return this.Establecimientos[index];
  }*/

  //-----------------------------------------------------------------------------------
  //Borrar Establecimiento por ID
  async delete(id) {
    let establecimiento = await Model.findOne({
      _id: id,
    });

    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });

    if (deletedCount <= 0) throw boom.notFound(errEmpty);

    return establecimiento;
  }
}

module.exports = EstablecimientosService;
