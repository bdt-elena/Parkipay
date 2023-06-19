const mongoose = require('mongoose');

const establecimientoSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    isActive: Boolean,
    name : String,
    address: String,
    parkinglots: Number,
    hourPrice: Number,
    resenias: Array,
    logo: String,
});

const model = mongoose.model('establecimiento', establecimientoSchema);
module.exports = model;
