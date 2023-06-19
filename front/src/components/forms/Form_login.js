import '../pages/login-page/login_page.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ajaxLogin from '../../funciones/Login_Usuario.js';

export function Form_login(){
    
    return <>
            <label className="label">Correo electrónico</label><br></br>
            <input className="input" name="correo" type="email" placeholder="exaple@gmail.com" required></input><br></br>
            <label className="label">Contraseña</label><br></br>
            <input className="input" id="contraseña"type="password" placeholder="Contraseña" required></input><br></br><br></br>
            <div className="text-center">
                <button onClick={ajaxLogin} className="boton__login">Aceptar</button><br></br>
            </div>
    </>
}