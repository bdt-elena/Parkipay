
import './lista_est.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Link
} from "react-router-dom";
import { useState } from 'react';

export function Lista_establecimientos(props) {


  const id = useState(props.id);
  const name = useState(props.name);
  const address = useState(props.address);
  const hourPrice = useState(props.hourPrice);
  const imageId = useState(props.imageId);


  return <>
    <div className="estacionamientos__hijo">
      <div class="text-center img">
        <img id={imageId} height="210" width="210"></img>
      </div>
      <div className="estacionamientos__descripción">
        <h4>Detalles del estacionamiento</h4>
        <p><b>Nombre:</b> {name}</p>
        <p><b>Direccion:</b> {address}</p>
        <p><b>Precio por hora:</b> ${hourPrice}</p>
        <Link to={'/establecimiento/' + id[0]}>
          <button className="box-boton">Ver</button>
        </Link>
      </div>
    </div>
    <br></br>
  </>
}
