import getCookie from '../../../funciones/GetCookie.js';
import React, { useState } from 'react';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";
import './perfil_page.css';
import Modal from './Modal.js';
import { Form_editarperfil } from '../../forms/Form_editarperfil.js';
import ajaxBajaUsuario from '../../../funciones/Baja_Usuario.js';
import {
    Link
  } from "react-router-dom";
import swal from 'sweetalert';
  
function cerrarSesion(){
    var a = new Date();
        a = new Date(a.getTime() - 60);
    document.cookie = "nombre=a; expires=" +a.toGMTString()+";";
    document.cookie = "correo=a; expires=" +a.toGMTString()+";";
    document.cookie = "usuario=a; expires=" +a.toGMTString()+";";
    document.cookie = "telefono=a; expires=" +a.toGMTString()+";";
    document.cookie = "id=a; expires=" +a.toGMTString()+";";
    document.cookie = "dueño=a; expires=" +a.toGMTString()+";";
    swal("Sesion cerrada correctamente");
    window.location.href = "/";
} 
  
export function Perfil_page(){

    const [estadoModal1, cambiarestadoModal1] = useState(false);

    return <>
    
        <div className="perfil__contenedor">
            <div className="sidebar">
                
            </div>
            <div className="perfil__info">
                
            <div className="h2__centrar"><h2>Mi perfil</h2></div>
                <div className="grid__perfil">
                            <div>
                                <div className="text-center">
                                    <img className="foto_perfil" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp" ></img>
                                
                                    <h4 className="my-2 mb-2">{getCookie("usuario")}</h4>
                                </div>
                                <Modal 
                                    estado={estadoModal1}
                                    cambiarestado={cambiarestadoModal1}>
                                    <Form_editarperfil></Form_editarperfil>
                                </Modal>
                                <Boton onClick={() => cambiarestadoModal1(!estadoModal1)}>Editar perfil</Boton> <br></br>
                            </div>
                            <div>
                                <div className="flex__info">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                      </svg>
                                    <p>{getCookie("nombre")}</p>
                                </div>
                                <div className="flex__info">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                                    <path d="M3 7l9 6l9 -6" />
                                    </svg>
                                    <p>{getCookie("correo")}</p>
                                </div>
                                <div className="flex__info">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                    </svg>
                                    <p>{getCookie("telefono")}</p>
                                </div>
                                <div className="flex__info">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                    <path d="M15 12h-12l3 -3" />
                                    <path d="M6 15l-3 -3" />
                                    </svg>
                                    <Link className="no" onClick={cerrarSesion}><p>Cerrar sesión</p></Link>
                                </div>
                                
                            </div>
                        </div>
            </div>
        </div>
    </>
}

const Boton = styled.div`

    text-align: center;
    width: 100%;
    background-color: rgb(201, 36, 36);
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    border-color: transparent;
    color: rgb(236, 242, 247);
    font-family: Herculanum, "Eras Light ITC", sans-serif;

    &:hover{
        background-color: rgb(168, 30, 30);
    }
    .styled{
        
        text-decoration: none;
    }
`;

/**
 
<div className="">
                        <h2 id="">Mis Reservaciones</h2>
                        <p>Mi cuenta</p>
                        <Link to="/ver_reservas"><p  className="">Ver reservaciones</p></Link>
                        <Link onClick={cerrarSesion}><p>Cerrar sesión</p></Link>
                    </div>
 */