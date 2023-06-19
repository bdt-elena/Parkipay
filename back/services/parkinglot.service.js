const uuid = require('uuid');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('../utils');

class ParkinglotsService {
  constructor() {
    this.Parkinglots = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.Parkinglots.push({
        isActive: true,
        idEstablecimiento: uuid.v4(),
        IDparking: 100,
      });
    }
  }
  
  //-----------------------------------------------------------------------------------
  //Crear espacios
  async create(data) {
    const newParkinglot = {
        idEstablecimiento: uuid.v4(),
        IDparking: uuid.v4(),
      ...data,
    };
    this.Parkinglots.push(newParkinglot);
    return newParkinglot;
  }

  find(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var Parkinglots = this.Parkinglots.slice(0, limit);
        if (Parkinglots.length > 0) {
          resolve(Parkinglots);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }

  //-----------------------------------------------------------------------------------
  //Encontrar espacios de estacionamiento activos
  findActiveParkinglots() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeParkinglots = this.Parkinglots.filter((x) => x.isActive === true);
        resolve(activeParkinglots);
      }, 2000);
    });
  }

  //-----------------------------------------------------------------------------------
  //Encontrar Establecimiento por ID
  async findOne(id) {
    //const name = this.getTotal(); PRUEBA DE ERROR DE TRY Y CATCH
    const Parkinglot = this.Parkinglots.find((item) => item.IDparking === id);
    //NOT FOUND
    validateData(Parkinglot, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(
        Parkinglot,
      CONFLICT,
      'CONFLICTO, El espacio esta bloqueado.',
      (data) => data.isActive == false
    );
    return Parkinglot;
  }

  //-----------------------------------------------------------------------------------
  //Actualizar espacios por ID
  async update(id, changes) {
    const index = this.Parkinglots.findIndex((item) => item.IDparking === id);

    if (index === -1) throw boom.notFound('Establecimiento no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentParkinglot = this.Parkinglots[index];
    this.Parkinglots[index] = {
      ...currentParkinglot,
      ...changes,
    };
    return this.Parkinglots[index];
  }

  async updateComplete(id, changes) {
    const index = this.Parkinglots.findIndex((item) => item.IDparking === id);

    if (index === -1) throw boom.notFound('Estacionamiento no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentParkinglot = this.Parkinglots[index];
    this.Parkinglots[index] = {
      id: currentParkinglot.IDparking,
      ...changes,
    };
    return this.Parkinglots[index];
  }

  //-----------------------------------------------------------------------------------
  //Borrar espacios por ID
  async delete(id) {
    const index = this.Parkinglots.findIndex((item) => item.IDparking == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Estacionamiento no encontrado');
    }
    this.Parkinglots.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}


module.exports = ParkinglotsService;