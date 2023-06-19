const uuid = require('uuid');
class UserService {
  constructor() {
    this.logoEstacionamientoEstacionamiento = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.logoEstacionamientoEstacionamiento.push({
        id: uuid.v4(),
        logoEstacionamientoEstacionamiento: "placeholder",
      });
    }
  }
  find(limit) {
    return this.logoEstacionamientoEstacionamiento.slice(0, limit);
  }
  findOne(id) {
    return this.logoEstacionamientoEstacionamiento.find((item) => item.id === id);
  }

  create(data) {
    const newlogoEstacionamientoEstacionamiento = {
      id: uuid.v4(),
      ...data,
    };
    this.logoEstacionamientoEstacionamiento.push(newlogoEstacionamiento);
    return newlogoEstacionamiento;
  }
  async update(id, changes) {
    const index = this.logoEstacionamiento.findIndex((item) => item.id === id);
    var currentlogoEstacionamiento = this.logoEstacionamiento[index];
    this.logoEstacionamiento[index] = {
      ...currentlogoEstacionamiento,
      ...changes,
    };
    return this.logoEstacionamiento[index];
  }

  async delete(id) {
    const index = this.logoEstacionamiento.findIndex((item) => item.id == id);
    this.logoEstacionamiento.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = UserService;