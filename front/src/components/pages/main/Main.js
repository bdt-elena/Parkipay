import './main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Lista_establecimientos } from '../lists/Lista_establecimientos.js'
import { useEffect, useState } from 'react';
import {storageRef} from '../../../firebase.js';
import { Form_search_park } from '../../forms/Form_search_park.js';

function getImage(id){
  storageRef.child('images/'+ id).getDownloadURL()
      .then((url) => {
        var img = document.getElementById(id + ",function () { [native code] }");
        img.setAttribute('src', url);
      })
}

export function Main() {

  const [gotInfo, setGotInfo] = useState(false);
  const [establecimientosArray, setEstablecimientosArray] = useState([]);

  useEffect(() => {
    async function getEstablecimientos() {
      if (!gotInfo) {

        const response = await fetch(`http://localhost:3001/api/establecimientos/`);
        const respJson = await response.json();
        setEstablecimientosArray(respJson)
        setGotInfo(true);
      }

    }

    getEstablecimientos();
  }, []);



  return <>
    <div className="bk">
      <div className="banner">
        <div className="banner__contenido" >
          <h4 id="title">PARKIPAY</h4>
          <p>Busca un lugar para estacionarte, reserva y paga más fácil y rápido. </p>
          <p>¡Mira las opiniones de otros usuarios!</p>
        </div>
      </div>

      <div className="estacionamientos">
        <div className="">
          <h3><b>NUESTROS ESTACIONAMIENTOS</b></h3>
          <hr></hr>
          <Form_search_park></Form_search_park>
          {establecimientosArray.map((establecimeinto, index) =>
            <Lista_establecimientos
              key={index}
              id={establecimeinto._id}
              name={establecimeinto.name}
              address={establecimeinto.address}
              hourPrice={establecimeinto.hourPrice}
              imageId={establecimeinto.logo}
            ></Lista_establecimientos>
          )}
          {
          establecimientosArray.forEach(element => {
            getImage(element.logo);
          })}
        </div>
      </div>
    </div>
  </>
}
