import 'bootstrap/dist/css/bootstrap.min.css';
import { Lista_admin_establiecimientos } from '../lists/Lista_admin_establiecimientos.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../lists/lista_est.css';
import {storageRef} from '../../../firebase.js';

function getImage(id){
  storageRef.child('images/'+ id).getDownloadURL()
      .then((url) => {
        var img = document.getElementById(id + ",function () { [native code] }");
        img.setAttribute('src', url);
      })
}

export function Administrar_establecimiento() {
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

  return (
    <>
      <div className="administrar">
        <div className="">
          <div className="text-center"><h3 className="h3">ADMINISTRAR ESTABLECIMIENTOS</h3>  </div>
          <Link className="no" to="/agregar_establecimiento" className="">
            <Boton >Agregar nuevo establecimiento</Boton>
          </Link>
          <hr></hr>
          {establecimientosArray.map((establecimeinto, index) =>
              <Lista_admin_establiecimientos
              key={index}
              id={establecimeinto._id}
              name={establecimeinto.name}
              address={establecimeinto.address}
              hourPrice={establecimeinto.hourPrice}
              imageId={establecimeinto.logo}
              ></Lista_admin_establiecimientos>
          )}
          {
          establecimientosArray.forEach(element => {
            getImage(element.logo);
          })}
        </div>
      </div>
    </>
  );
}

const Boton = styled.div`
  text-align: center;
  background-color: rgb(201, 36, 36);
  padding: 10px;
  border-radius: 5px;
  border-color: transparent;
  color: rgb(236, 242, 247);
  font-family: Herculanum, 'Eras Light ITC', sans-serif;
  margin: 0 90px;

  &:hover {
    background-color: rgb(168, 30, 30);
  }
`;
