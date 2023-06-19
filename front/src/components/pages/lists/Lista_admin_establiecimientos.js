import './lista_est.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Lista_admin_establiecimientos(props) {

  const id = useState(props.id);
  const name = useState(props.name);
  const address = useState(props.address);
  const hourPrice = useState(props.hourPrice);
  const imageId = useState(props.imageId);

  async function deleteHandler (e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3001/api/establecimientos/${id[0]}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const respJson = await response.json();
    console.log(respJson);
    window.location.reload();
  }

  return (
    <>
      <div className="row box-establecimiento-hijo">
        <div className="col-3 py-2 borders">
          <img class="list-image" height="230"width="230" id={imageId}></img>
        </div>
        <div className="col-9 py-2">
          <p className="box-establecimiento-details">Detalles</p>
          <p>{name}</p>
          <p>{address}</p>
          <p>Costo por hora ${hourPrice}</p>
          <div className="flexing">
            <Link to={'/establecimiento/' + id[0]}>
              <button className="box-boton">Ver</button>
            </Link>
            <Link to={'/editar_establecimiento/' + id[0]}>
              <button className="box-boton">Editar</button>
            </Link>
            <button className="box-boton" onClick={deleteHandler}>Borrar</button>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}
