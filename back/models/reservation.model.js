const mongoose = require('mongoose');
const reservationSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    idUser: String,
    idEstablecimiento: String,
    establecimiento: String,
    cost: String,
    arrivingTime: String,
    active: Boolean
});
const model = mongoose.model('reservaciones', reservationSchema);
module.exports = model;