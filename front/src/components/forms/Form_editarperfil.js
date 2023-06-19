import getCookie from '../../funciones/GetCookie.js';
import '../pages/register-page/registro_page.css'
import "bootstrap/dist/css/bootstrap.min.css";
import ajaxEdicionUsuario from '../../funciones/Editar_Usuario.js';
function submit(){
    let nombreP = document.getElementsByName("name_user_id")[0].value;
    let usuarioP = document.getElementsByName("username_user_id")[0].value;
    let correoP = document.getElementsByName("email_user_id")[0].value;
    let telefonoP = document.getElementsByName("tel_user_id")[0].value;
    let credencialP = document.getElementsByName("pssw_user_id")[0].value;
    ajaxEdicionUsuario(nombreP,usuarioP,correoP,telefonoP,credencialP);
}
export function Form_editarperfil(){
        return <>
        <div className="text-center">
            <label>Nombre</label><br></br>
            <input type="text" name="name_user_id" defaultValue={getCookie("nombre")} placeholder="Escribe tu nombre completo" required></input><br></br>
            <label>Nombre de usuario</label><br></br>
            <input type="text" name="username_user_id" defaultValue={getCookie("usuario")} placeholder="user123" required></input><br></br>
            <label>Correo</label><br></br>
            <input type="email" name="email_user_id" defaultValue={getCookie("correo")} placeholder="exaple@gmail.com" required></input><br></br>
            <label>Télefono celular</label><br></br>
            <input type="tel" name="tel_user_id" defaultValue={getCookie("telefono")} placeholder="81..." required></input><br></br>
            <label>Contraseña</label><br></br>
            <input type="password" name="pssw_user_id" defaultValue="" placeholder="Contraseña" required></input><br></br><br></br>
            <button  onClick={submit} className="box-boton">Aceptar</button><br></br>
        </div>
    </>
}