import getCookie from './funciones/GetCookie.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals.js';
/*Importamos componentes*/
import { Header } from './components/pages/header/Header.js';
import { Footer } from './components/pages/footer/Footer.js';
import { Main } from './components/pages/main/Main.js';
import { Login_page } from './components/pages/login-page/Login_page.js';
import { Registro_page } from './components/pages/register-page/Registro_page.js';
import { Perfil_page } from './components/pages/perfil-usuario-page/Perfil_page.js';
import { Establecimiento } from './components/pages/establecimiento-page/Establecimiento-page.js';
import { Add_establecimiento } from './components/pages/agregar_establecimiento-page/Agregar_establecimiento-page.js';
import { Ver_Reservas } from './components/pages/ver_reservaciones-page/Ver_reservaciones-page.js';
import { Administrar_establecimiento } from './components/pages/administrar_establecimientos-page/Administrar_establecimiento.js';
import { Editar_establecimiento_page } from './components/pages/editar_establecimiento-page/Editar_establecimiento_page.js';
import { Busqueda } from './components/pages/busquedas-page/Busqueda.js';
/*Importamos la biblioteca react-router para el enrutamiento de la página*/
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

/*Obtenemos el id root del index.html de la carpeta public y renderizamos la interfaz*/
const root = ReactDOM.createRoot(document.getElementById('root'));
let result = getCookie("nombre");
let result2 = getCookie("dueño");
console.log(result);
root.render(<>
    <Router>
        {/*user active es un boleano que si es falso nos
        mostrara el header como un usuario que no ha iniciado sesion,
        y si es true nos lo mostrara como un usuario que ha inciado sesion
        isadmin si es verdadero nos mostrara el haeder que ven los admins, si es falso se mostrara
        el header de un usuario comun que ha iniciado sesion*/}
        <Header user_active={result!="false"} user_dueño={result2!="false"} ></Header>
            <Switch>
                <Route path="/" exact>
                    <Main></Main>
                </Route>
                <Route path="/login">
                    <Login_page></Login_page>
                </Route>
                <Route path="/signin">
                    <Registro_page></Registro_page>
                </Route>
                <Route path="/perfil_de_usuario">
                     <Perfil_page></Perfil_page>
                </Route>
                <Route path="/establecimiento/:ID">
                    <Establecimiento></Establecimiento>
                </Route>
                <Route path="/agregar_establecimiento">
                    <Add_establecimiento></Add_establecimiento>
                </Route>
                <Route path="/ver_reservas">
                    <Ver_Reservas></Ver_Reservas>
                </Route>
                <Route path="/administrar_establecimientos">
                    <Administrar_establecimiento></Administrar_establecimiento>
                </Route>
                <Route path="/editar_establecimiento/:ID">
                    <Editar_establecimiento_page></Editar_establecimiento_page>
                </Route>
                <Route path="/Resultados_de_busqueda">
                    <Busqueda></Busqueda>
                </Route>
            </Switch>
        <Footer></Footer>
    </Router>
</>);

reportWebVitals();
