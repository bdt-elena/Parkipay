//import {v4 as uuidv4} from 'uuid';
const uuid = require('uuid')
const boom = require('@hapi/boom');
const UserModel = require('../models/user.model.js');
const { use } = require('../routes/login.router.js');
const { useReducer } = require('react');

const errNotFound = "No se logró encontrar lo buscado";
const errEmpty = "Aún no hay cuentas creadas";

class UserService {
  constructor() {
    this.user = [];
    this.generate();
  }

  async mongoCreate(data){
    const model = new UserModel(data);
    await model.save();
    return data;
  }

  async mongoLogin(limit, filter){
    let users = await UserModel.find(filter);

    if (users === undefined || users === null)
      throw boom.notFound(errNotFound);
    if (users.length <= 0)
      throw boom.notFound(errEmpty);
    users = users.filter((item, index) => item && index < limit);
    return users;
  }

  async mongoDelete(body) {
    const deletedCount = await UserModel.deleteOne({
      _id: body.id
    });

    if (deletedCount <= 0)
      throw boom.notFound(errEmpty);

    return true;
  }

  async mongoUpdate(body) {
    let userToChange = await UserModel.findOne({
      _id: body.id
    });

    if (userToChange === undefined || userToChange === null)
      throw boom.notFound(errNotFound);
    if (userToChange.length <= 0)
      throw boom.notFound(errEmpty);
      console.log(body.telephone);
    if (body.name){
      userToChange.name = body.name;
    }
    if (body.usuario)
      userToChange.usuario = body.usuario;
    if (body.email)
      userToChange.correo = body.email;
    if (body.telephone){
      userToChange.telephone = body.telephone;
    }
    if (body.password)
      userToChange.credencial = body.password;

    await userToChange.save();
    return userToChange;
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.user.push({
        id: uuid.v4(),
        username: "placeholder",
        name: "placeholder",
        password: 1,
        telephone: "placeholder",
        email: "placeholder",
        paypal: "placeholder"
      });
    }
  }
  find(limit) {
    return this.user.slice(0, limit);
  }
  findOne(username) {
    return this.user.find((item) => item.username === username);
  }

  create(data) {
    const newUser = {
      id: uuid.v4(),
      ...data,
    };
    this.user.push(newUser);
    return newUser;
  }
  async update(id, changes) {
    const index = this.user.findIndex((item) => item.id === id);
    var currentUser = this.user[index];
    this.user[index] = {
      ...currentUser,
      ...changes,
    };
    return this.user[index];
  }

  async delete(id) {
    const index = this.user.findIndex((item) => item.id == id);
    this.user.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = UserService;
