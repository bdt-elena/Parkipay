import './lista_reserva.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
//import deleteReservacion from '../../../Funciones/Ver_Reservacion';
/*import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";*/

export function Lista_reserva(props) {


    //const id = useState(props.idUser)
    const idres = useState(props.id)
    const idEstablecimiento = useState(props.idEstablecimiento)
    const cost = useState(props.cost)
    const str =  String(props.arrivingTime)
    const arrivingTime = useState(str.substring(0,10) + " " +str.substring(11))

    async function submitHandler(e) {
        const response = await fetch(`http://localhost:3001/api/reserve/${e[0]}`  ,
    {
        method: 'DELETE'
    }
    );
    const respJson = await response.json();
    console.log(JSON.stringify(respJson));
    window.location.reload();

    }


    return <>
        <div class="grid__reserva">
            <img src="https://cdn.pixabay.com/photo/2019/09/06/03/39/parking-4455360_960_720.jpg" class="img-fluid" alt="Responsive image"></img>
           

            <div class="info_establecimiento">
 
                <div class="grid_info">
                    <div className="">
                    <h3>{idEstablecimiento}</h3>

                    <div className="inline"> 
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 7v5l3 3" />
                        </svg>
                        <p> Hora de inicio: <span>{arrivingTime}</span>  </p>
                    </div>

                    <div className="inline">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-receipt-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
                        <path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5" />
                        </svg>  
                        <p> Precio: $<span>{cost}</span></p>
                    </div>
                           
                    </div>

                    <div className="wr_alin">
                    <img   class="qr" src="https://www.dreamhost.com/blog/wp-content/uploads/2022/12/qr-estatico.jpg" alt="codigo qr"/>
                    </div>
                    <input type="button" onClick={() => submitHandler(idres)} class="buuton" value="Cancelar reservación"></input>
                </div>
               
            </div>

            
            
        </div>

    </>

}

/*const Boton = styled.div`

    float: right;
    width: fit-content;
    background-color: rgb(201, 36, 36);
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 2vw;
    padding-right: 2vw;
    margin-top: 15px;
    border-radius: 5px;
    border-color: transparent;
    color: rgb(236, 242, 247);
    font-family: Herculanum, "Eras Light ITC", sans-serif;

    &:hover{
        background-color: rgb(168, 30, 30);
    }
`;*/