import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './ignore.css';
import styled from 'styled-components';
import { Form_comentar } from '../../forms/Form_comentar.js';
import { Lista_comentarios } from '../lists/Lista_comentarios.js';
import { Form_reservar } from '../../forms/Form_reservar.js';
import Modal from './Modal.js';
import getCookie from '../../../funciones/GetCookie.js';
import {storageRef} from '../../../firebase.js';

function getImage(id){
    storageRef.child('images/'+ id).getDownloadURL()
    .then((url) => {
      var img = document.getElementById(id);
      img.setAttribute('src', url);
    })
}

export function Establecimiento() {

  const [estadoModal1, cambiarestadoModal1] = useState(false);
  //const id = useState(props.id);
  const [gotInfo, setGotInfo] = useState(false);
  const establecimientoID = window.location.pathname.split('/')[2];
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hourPrice, setHourPrice] = useState(0);
  const [parkinglots, setParkinglots] = useState(0);
  const [resenias, setResenias] = useState([]);
  const [logo, setimageId] = useState("");

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
          setResenias(respJson.data.resenias)
          setimageId(respJson.data.logo)
          setGotInfo(true);

        }
      }
    }
    getEstablecimiento();

  }, [])


  return <>
  {getImage(logo)}
    <Box_padre>
      <div className="establecimiento">
        <div className="encabezado"><h2>Reserva un sitio</h2> </div>
        <Info_establecimiento>
            <img className="img__est" id={logo}></img>
          <Info_establecimiento_right>
              <h3 className="p-name nombre">{name}</h3>
              <p className="p-name">Direccion: <span>{address}</span></p>
              <p className="p-name">Numero de lugares disponibles: <span>{parkinglots}</span></p>
              <p className="p-name">Precio por hora: <span>${hourPrice}</span></p>
            <Modal
              estado={estadoModal1}
              cambiarestado={cambiarestadoModal1}>
              <Form_reservar
              idUser = {getCookie("id")}
              name = {name}
              address = {address}
              hourPrice = {hourPrice}
              parkinglots = {parkinglots}
              establecimientoID = {establecimientoID}
              ></Form_reservar>
            </Modal>
            <div className="ub"><Boton onClick={() => cambiarestadoModal1(!estadoModal1)}>Reservar un lugar</Boton></div>
            
          </Info_establecimiento_right>
        </Info_establecimiento>


        <div className="encabezado"><h4>Comentarios</h4> </div>
        <Comentar>
          <div className="info_coment">
            <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp"></img>
            <p>{getCookie("usuario")}</p>
          </div>
          <Form_comentar id={establecimientoID}></Form_comentar>
        </Comentar>
        {resenias.map((resenias, index) =>
          <Lista_comentarios
            key={index}
            nombre={resenias.nombre}
            contenido={resenias.contenido}
          />
        )}
      </div>
    </Box_padre>
  </>
}

const Box_padre = styled.div`

    width: 95%;
    margin: 0 auto;
  
  .encabezado{
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px solid gray
    ;
  }
  .establecimiento{
    background-color: rgb(228, 228, 228);
    margin: 10px auto;
    border-radius: 10px;
    padding: 20px;
  }
  @media (min-width: 764px){
    .establecimiento{
      background-color: rgb(228, 228, 228);
      margin: 20px auto;
      width: 70%;
      padding: 20px;
      
    box-shadow: 9px 9px 9px -2px rgba(143,143,143,0.56);
    -webkit-box-shadow: 9px 9px 9px -2px rgba(143,143,143,0.56);
    -moz-box-shadow: 9px 9px 9px -2px rgba(143,143,143,0.56);
    }
  }
  .img__est{
    width: 100%;

  }
  @media (min-width: 480px){
    .img__est{
      max-width: 30%;
    }
  }
  .p-name{
    padding: 0;
    margin: 0;
  }
  p{
    color: rgb(031, 031, 031);
    font-weight: bold
  }
  span{
    font-weight: normal
  }
  .nombre{
    margin: 10px;
  }
  @media (min-width: 768px){
    .nombre{
      margin: 0 0 10px 0;
    }
  }


`;
const Info_establecimiento = styled.div`
  displau: block;
  @media (min-width: 480px){
    display: flex;
  }
`;


const Info_establecimiento_right = styled.div`

    width: 100%;
    text-align: center;

`;
const Boton = styled.div`

    width: fit-content;
    background-color: rgb(201, 36, 36);
    padding: 5px 2vw;
    margin: 20px auto 20px auto;
  
    border-radius: 5px;
    border-color: transparent;
    color: rgb(236, 242, 247);
    font-family: Herculanum, "Eras Light ITC", sans-serif;
    @media (min-width: 480px){
      
        float: right;
      
    }

    &:hover{
        background-color: rgb(168, 30, 30);
    }

  
`;

const Comentar = styled.div`

        height: auto;
        width: 100%;
        background-color: rgb(228, 228, 228);
        padding: 20px;
        border-bottom: solid;
        border-width: 10px;
        border-color:  rgb(243, 243, 243);;

        .info_coment{
            display: flex;
        }

        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
        }
        p{
            color: black;
            font-weight: bold;
            padding-top: 15px;
            padding-left: 10px;
        }
        
`;


