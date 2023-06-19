const uuid = require('uuid');
class UserService {
  constructor() {
    this.logo = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.logo.push({
        id: uuid.v4(),
        logo: "placeholder",
      });
    }
  }
  find(limit) {
    return this.logo.slice(0, limit);
  }
  findOne(id) {
    return this.logo.find((item) => item.id === id);
  }
  create(data) {
    const newlogo = {
      id: uuid.v4(),
      ...data,
    };
    this.logo.push(newlogo);
    return newlogo;
  }
  async update(id, changes) {
    const index = this.logo.findIndex((item) => item.id === id);
    var currentlogo = this.logo[index];
    this.logo[index] = {
      ...currentlogo,
      ...changes,
    };
    return this.logo[index];
  }

  async delete(id) {
    const index = this.logo.findIndex((item) => item.id == id);
    this.logo.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = UserService;