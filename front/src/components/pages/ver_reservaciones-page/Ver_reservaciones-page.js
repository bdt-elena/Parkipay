import getCookie from '../../../funciones/GetCookie.js';
import "bootstrap/dist/css/bootstrap.min.css";
import '../lists/lista_reserva.css';
import '../lists/lista_reserva.css';
import React, { useState, useEffect } from 'react';
import { Lista_reserva } from "../lists/Lista_reserva.js";

export function Ver_Reservas() {

    const [reservations, setreservations] = useState([]);

    useEffect(() => {

        async function getReservations() {
          
            const response = await fetch(`http://localhost:3001/api/reserve/GetReservationUser/${getCookie("id")}`);
    
            const respJson = await response.json();
            if (respJson.success) {
              
              setreservations(respJson.data)
              
            }
          
        }
        getReservations();
    
      }, [])

    return <>
        <div className="reservacion">
            
        <div className="text-center"><h2> Reservaciones </h2>  </div>
       
          {reservations.map((data, index) =>
          <Lista_reserva
          key={index}
          id = {data._id}
          idUser = {data.idUser}
          idEstablecimiento = {data.establecimiento}
          parkinglot = {data.parkinglot}
          arrivingTime = {data.arrivingTime}
          cost = {data.cost}
          >
          </Lista_reserva>
          
          )}
        </div>
    </>

}