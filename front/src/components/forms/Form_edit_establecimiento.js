import '../pages/agregar_establecimiento-page/agregar_establecimiento.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import { useEffect, useState } from "react";

export function Form_edit_establecimiento() {

  let hasDecimal = false;
  const history = useHistory();

  const [gotInfo, setGotInfo] = useState(false);
  const establecimientoID = window.location.pathname.split('/')[2];
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hourPrice, setHourPrice] = useState(0);
  const [parkinglots, setParkinglots] = useState(0);


  async function submitHandlerEdit(e) {
    e.preventDefault();

    let pname = $('#name').val();
    let paddress = $('#address').val();
    let pparkinglots = $('#parkinglot').val();
    let phourPrice = $('#hourPrice').val();

    if (pname === '') pname = name;
    if (paddress === '') paddress = address;
    if (pparkinglots === '') pparkinglots = parkinglots;
    if (phourPrice === '') phourPrice = hourPrice;

    const body = {
      isActive: true,
      name: pname,
      address: paddress,
      parkinglots: pparkinglots,
      hourPrice: phourPrice,
    };
    const response = await fetch(
      `http://localhost:3001/api/establecimientos/edit/${establecimientoID}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    const respJson = await response.json();
    console.log(respJson);
    history.push("/administrar_establecimientos");

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

  useEffect(() => {

    async function getEstablecimiento() {
      if (!gotInfo) {
        const response = await fetch(`http://localhost:3001/api/establecimientos/findById/${establecimientoID}`);

        const respJson = await response.json();
        if (respJson.success) {
          setName(respJson.data.name)
          setAddress(respJson.data.address)
          setHourPrice(respJson.data.hourPrice)
          setParkinglots(respJson.data.parkinglots);
          setGotInfo(true);

        }
      }
    }
    getEstablecimiento();

  }, [])




  return (
    <>
      <form onSubmit={submitHandlerEdit}>
        <label>Nombre del establecimiento </label>
        <br></br>
        <input
          type="text"
          id="name"
          placeholder={name}
        ></input>
        <br></br>
        <label>Direccion </label>
        <br></br>
        <input
          type="text"
          id="address"
          placeholder={address}
        ></input>
        <br></br>
        <label>Numero de cajones </label>
        <br></br>
        <input
          type="text"
          id="parkinglot"
          placeholder={parkinglots}
          onKeyPress={onlyNumber}
        ></input>
        <br></br>
        <label>Precio por hora</label>
        <br></br>
        <input
          type="text"
          id="hourPrice"
          placeholder={hourPrice}
          onKeyPress={onlyNumberFloat}
        ></input>
        <br></br>
        <div className="btnCenter">
          <input type="submit" value="Editar establecimiento"></input>
        </div>
      </form>
    </>
  );
}
