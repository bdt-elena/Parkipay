import "bootstrap/dist/css/bootstrap.min.css";
import {Lista_establecimientos} from '../lists/Lista_establecimientos.js';
import '../lists/lista_est.css'
import getCookie from '../../../funciones/GetCookie.js';
import { useEffect, useState } from 'react';
import {storageRef} from '../../../firebase.js';
import swal from 'sweetalert';
import { Form_search_park } from '../../forms/Form_search_park.js';
import styled from 'styled-components';

function getImage(id){
  storageRef.child('images/'+ id).getDownloadURL()
      .then((url) => {
        var img = document.getElementById(id + ",function () { [native code] }");
        img.setAttribute('src', url);
      })
}


export function Busqueda(){

    const [gotInfo, setGotInfo] = useState(false);
    const [establecimientosArray, setEstablecimientosArray] = useState([]);

    useEffect(() => {
        async function getEstablecimientos() {
        if (!gotInfo) {
            const busqueda = getCookie("busqueda");
            const body = {
                name: busqueda,
              };
            const response = await fetch(
                `http://localhost:3001/api/establecimientos/search`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body),
                }
              );
            const respJson = await response.json();
            if(respJson.error){
                swal("No se encontraron estacionamientos relacionados al nombre buscado")
                response = await fetch(`http://localhost:3001/api/establecimientos/`);
                respJson = await response.json();
            }
            setEstablecimientosArray(respJson)
            setGotInfo(true);
            /*swal("No existen estacionamientos relacionados a la busqueda")
                const response = await fetch(`http://localhost:3001/api/establecimientos/`);
                const respJson2 = await response.json();
                setEstablecimientosArray(respJson2)
                setGotInfo(true);*/
        }

        }

    getEstablecimientos();
  }, []);
    
    return <>
 <Contenedor>

        <div className="text-center">
            <div className="box-establecimiento py-2">
                <h3>RESULTADOS DE BUSQUEDA</h3>
                <hr></hr>
                <Form_search_park></Form_search_park>
                { 
                establecimientosArray.map((establecimeinto, index) =>
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
                Array.isArray(establecimientosArray) ? establecimientosArray.forEach(element => {
                getImage(element.logo);
                }):
                getImage(establecimientosArray.data.logo)
                }
            </div>
        </div>
</Contenedor>
    </>
}


const Contenedor = styled.div`
  margin: 20px auto;
  width: 90%;
  box-shadow: 9px 9px 9px -2px rgba(143,143,143,0.56);
    -webkit-box-shadow: 9px 9px 9px -2px rgba(143,143,143,0.56);
    -moz-box-shadow: 9px 9px 9px -2px rgba(143,143,143,0.56);
    border-radius: 10px;
    background-color: rgb(243, 243, 243);
    padding: 20px

`;