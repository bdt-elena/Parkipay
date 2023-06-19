import '../pages/register-page/registro_page.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ajaxRegistroUsuario from '../../funciones/Crear_Usuario.js';

export function Form_register(){
    return <>
            <label className="label">Nombre</label><br></br>
            <input className="input" type="text" name="name_user" placeholder="Escibre tu nombre completo" required></input><br></br>

            <label className="label">Nombre de usuario</label><br></br>
            <input className="input" type="text" name="username_user" placeholder="user123" required></input><br></br>

            <label className="label">Correo</label><br></br>
            <input className="input" type="email" name="email_user" placeholder="exaple@gmail.com" required></input><br></br>

            <label className="label">Télefono celular</label><br></br>
            <input className="input" type="tel" name="tel_user" placeholder="81..." required></input><br></br>

            <label className="label">Contraseña</label><br></br>
            <input className="input" type="password" name="pssw_user" placeholder="Contraseña" required></input><br></br><br></br>

            <div className="text-center">
                <button onClick={ajaxRegistroUsuario} className="box-boton">Aceptar</button><br></br>
            </div>
    </>
}