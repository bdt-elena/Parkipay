import '../pages/agregar_establecimiento-page/agregar_establecimiento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import $ from 'jquery';
import {storageRef} from '../../firebase.js'
import {v4 as uuidv4} from 'uuid';
import { useHistory   } from 'react-router-dom'

/*storageRef.child('images/').getDownloadURL()
      .then((url) => {
        var img = document.getElementById('imageTest');
        img.setAttribute('src', url);
      })*/


export function Form_Add_establecimiento() {

  let hasDecimal = false;
  const history = useHistory();
  async function submitHandler(e) {
    e.preventDefault();
    const name = $('#name').val();
    const address = $('#address').val();
    const parkinglot = $('#parkinglot').val();
    const hourPrice = $('#hourPrice').val();
    let fileInput = document.getElementById('logo');
    if ( name === '' | address === '' |  parkinglot === '' | hourPrice === '' | fileInput.files[0] === ''){
      swal('Favor de rellenar los campos faltantes');
    } else if (parkinglot < 100) {
      swal('tiene que haber mas de 100 espacios de estacionamiento');
    } else {
      let uuid = uuidv4();
      var metadata = {
        contentType: 'image/jpeg',
      };
      storageRef.child('images/' + uuid).put(fileInput.files[0],metadata);
      const body = {
        isActive: true,
        name: name,
        address: address,
        parkinglots: parkinglot,
        hourPrice: hourPrice,
        logo: uuid,
      };
      console.log(body);
      const response = await fetch(
        `http://localhost:3001/api/establecimientos`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      
      const respJson = await response.json();
      console.log(respJson);
      swal("Estacionamiento creado correctamente.");
      history.push("/administrar_establecimientos");
    }
  }

  const onlyNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const onlyNumberFloat = (event) => {
    const hourPrice = $('#hourPrice').val();
    if (/\.+/.test(hourPrice)) {
      hasDecimal = true;
    } else {
      hasDecimal = false;
    }
    if (/[0-9]\.[0-9][0-9]$/.test(hourPrice)) {
      event.preventDefault();
    }
    if (/(\.)/.test(event.key) && !hasDecimal) {
      return;
    } else if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  /*
    <label>Subir logo de establecimiento</label><br></br>
    <input type="file"></input><br></br>
    <label >Selecciona una hora de apertura y cierre:</label><br></br>
    <input type="time" name="appt"></input>
    <input type="time" name="appt"></input><br></br>
  */

  return (
    <>

      <form onSubmit={submitHandler}>
        <label>Nombre del establecimiento </label>
        <br></br>
        <input
          type="text"
          id="name"
          placeholder="Establecimiento los cuates"
        ></input>
        <br></br>
        <label>Direccion </label>
        <br></br>
        <input
          type="text"
          id="address"
          placeholder=" Agustin de iturbide #1500 A "
        ></input>
        <br></br>
        <label>Numero de cajones </label>
        <br></br>
        <input
          type="text"
          id="parkinglot"
          placeholder="200"
          onKeyPress={onlyNumber}
        ></input>
        <br></br>
        <label>Precio por hora</label>
        <br></br>
        <input
          type="text"
          id="hourPrice"
          placeholder="200"
          onKeyPress={onlyNumberFloat}
        ></input>
        <br></br>
        <label>Subir logo de establecimiento</label>
        <br></br>
        <input id="logo" type="file"  accept="image/png"></input>
        <br></br>
        <br></br>
        <br></br>
        <div className="btnCenter">
          <input  type="submit" value="Crear establecimiento"></input>
        </div>
      </form>
    </>
  );
}
