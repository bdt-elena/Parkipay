const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('../utils');
const Model = require('../models/reservation.model.js');
const { model } = require('mongoose');
const { default: userEvent } = require('@testing-library/user-event');
const ModelSearch = require('../models/establecimiento.model')

class ReservacionesService {
  
  async mongoCreate(data){    
    const model = new Model(data);
    await model.save();
    return data
  }

  async mongoReadOne(id){
    const reservation = await Model.findOne({
      idUser: id
    });

    return reservation
  }

  async MongoGetAllViaUser(limit, filter){
    const filtrado = {}
    Object.assign(filtrado, {
      idUser : filter
    })
  
    let reservation = await Model.find(filtrado)

    if (reservation == undefined || reservation == null)
    throw boom.notFound(errNotFound);
    else if (reservation.length <= 0)
    throw boom.notFound(errEmpty);

    if(limit){
      reservation = reservation.filter((item,index)=> item && index < limit);
    }

    return reservation;
  }

  async MongoGetAllViaEstablishment(limit, filter){
    let reservation = await Model.find(filter)

    if (reservation == undefined || reservation == null)
    throw boom.notFound(errNotFound);
    else if (reservation.length <= 0)
    throw boom.notFound(errEmpty);

    if(limit){
      reservation = reservation.filter((item,index)=> item && index < limit);
    }

    return reservation;

  }

  async FreeParkingLots (id, idEstablecimiento){
    let reservationToChange = await Model.findOne({
      _id: id
    })

    if (reservationToChange == undefined || reservationToChange == null)
      throw boom.notFound(errNotFound);
    if (reservationToChange.length <= 0)
      throw boom.notFound(errEmpty);

      reservationToChange.active = false
      await reservationToChange.save();

      //a liberar lotes 


      ///
      let freelots = await ModelSearch.findOne({
        _id: idEstablecimiento
      })
  
      if (freelots == undefined || freelots == null)
        throw boom.notFound(errNotFound);
      if (freelots.length <= 0)
        throw boom.notFound(errEmpty);


        Date.prototype.today = function () { 
  
          return this.getFullYear() +"-"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+((this.getDate() < 10)?"0":"") + this.getDate();
          //return ((this.getDate() < 10)?"0":"") + this.getDate() +"-"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ this.getFullYear();
        }
      
        // For the time now
        Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
        }
      
        var datetime = new Date().today() + "T" + new Date().timeNow();
        
        //To Unix time
        var d1 = Date.parse(datetime)
        var d2 = Date.parse(freelots.expirationTime)
        if(d1>d2){
        freelots.parkinglots =  freelots.parkinglots + 1
        await freelots.save();
        }

  }

 

  async mongoUpdate(id, body) {

    let reservationToChange = await Model.findOne({
      idUser: id
    });

    if (reservationToChange == undefined || reservationToChange == null)
      throw boom.notFound(errNotFound);
    if (reservationToChange.length <= 0)
      throw boom.notFound(errEmpty);

   let originalReservation = {
      parkinglot: reservationToChange.parkinglot,
      cost: reservationToChange.cost,
      arrivingTime: reservationToChange.arrivingTime,
    };

    const {
      parkinglot, cost, arrivingTime
    } = body;

    if (parkinglot)
    reservationToChange.parkinglot = parkinglot;
    if (cost)
    reservationToChange.cost = cost;
    if (arrivingTime)
    reservationToChange.arrivingTime = arrivingTime;
    

    await reservationToChange.save();

    return {
      old: originalReservation,
      new: reservationToChange
    };
  }

  async mongoDelete(id){
    console.log("este es el id: " + id)
    let Reservation = await Model.findOne({
      _id: id
    });

    const {
      deletedReservation
    } = await Model.deleteOne({
      _id: id
    });

    return Reservation; 
    //eh? xd

  }

 
}


module.exports = ReservacionesService;