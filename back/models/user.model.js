const { uniqueSort } = require('jquery');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    usuario: String,
    email: String,
    telephone: String,
    password: String,
    activo: Boolean,
    dueño: Boolean
});
const model = mongoose.model('usuario', userSchema);
module.exports = model;
