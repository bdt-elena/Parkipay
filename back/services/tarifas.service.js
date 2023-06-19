const uuid = require('uuid');
class UserService {
  constructor() {
    this.tarifa = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.tarifa.push({
        id: uuid.v4(),
        tarifa: "placeholder",
      });
    }
  }
  find(limit) {
    return this.tarifa.slice(0, limit);
  }
  findOne(id) {
    return this.tarifa.find((item) => item.id === id);
  }
  //FAKER
  create(data) {
    const newTarifa = {
      id: uuid.v4(),
      ...data,
    };
    this.tarifa.push(newTarifa);
    return newTarifa;
  }
  async update(id, changes) {
    const index = this.tarifa.findIndex((item) => item.id === id);
    var currentTarifa = this.tarifa[index];
    this.tarifa[index] = {
      ...currentTarifa,
      ...changes,
    };
    return this.tarifa[index];
  }

  async delete(id) {
    const index = this.tarifa.findIndex((item) => item.id == id);
    this.tarifa.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = UserService;