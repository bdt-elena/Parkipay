import getCookie from '../funciones/GetCookie.js';
import swal from 'sweetalert';
let nombreP = "";
let usuarioP = "";
let correoP = "";
let telefonoP = "";
let credencialP = "";
export default async function ajaxEdicionUsuario(nombrePP,usuarioPP,correoPP,telefonoPP,credencialPP){
    nombreP = nombrePP;
    usuarioP = usuarioPP;
    correoP = correoPP;
    telefonoP = telefonoPP;
    credencialP = credencialPP;
    if(validarDatos()){
        var body = {
            id: getCookie("id"),
            name: nombreP,
            usuario: usuarioP,
            email: correoP,
            telephone: telefonoP,
            password: credencialP
        }
        const response = await fetch(`http://localhost:3001/api/login`,
            {
              method: 'PATCH',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(body)
            }
        );
        
        const respJson = await response.json();
        console.log(JSON.stringify(respJson));
        if (respJson.success) {
            document.cookie = "nombre=" + respJson.Data['name'] + ";";
            document.cookie = "correo=" + respJson.Data['email'] + ";";
            document.cookie = "usuario=" + respJson.Data['usuario'] + ";";
            document.cookie = "telefono=" + respJson.Data['telephone']+ ";";
            document.cookie = "id=" + respJson.Data['_id'] + ";";
            swal("Usuario editado correctamente");
            window.location.href = "/";
            return;
        }else{
            swal("Usuario no editado");
        }
    } 
 }

 function validarDatos(){
    let errores = 0;
    let txt = "";
    if(nombreP ==""){
        nombreP = null;
    }else{
        let regexNombre = /^[a-zA-Z\sñÁÉÍÓÚáéíóúàèìòùÀÈÌÒÙ]*$/;
        if(!regexNombre.test(nombreP)){
            txt = txt + "El nombre solo puede contener letras.\n"
            errores++;
        }
        if(nombreP.length > 100){
            txt = txt + "El nombre no puede tener más de 100 caracteres.\n"
            errores++;
        }
    }

    let regexNombreYCredencial = /^[a-zA-ZñÑ0-9¿?¡!@#$%&]*$/;
    if(usuarioP ==""){
        usuarioP = null;
    }else{  
        if(!regexNombreYCredencial.test(usuarioP)){
            txt = txt + "El usuario solo puede contener letras, numeros o los siguientes simbolos ¿?¡!@#$%&.\n"
            errores++;
        }
        if(usuarioP.length > 30){
            txt = txt + "El usuario no puede tener más de 30 caracteres.\n"
            errores++;
        }
    }

    if(credencialP ==""){
        credencialP = null;
    }else{  
        if(!regexNombreYCredencial.test(credencialP)){
            txt = txt + "La contraseña solo puede contener letras, numeros o los siguientes simbolos ¿?¡!@#$%&.\n"
            errores++;
        }
        if(credencialP.length > 30){
            txt = txt + "La contraseña no puede tener más de 30 caracteres.\n"
            errores++;
        }
    }

    if(telefonoP ==""){
        telefonoP = null;
    }else{
        let regexTelefono = /^[0-9]*$/;
        if(!regexTelefono.test(telefonoP)){
            txt = txt + "El telefono solo puede contener numeros.\n"
            errores++;
        }
        if(telefonoP.length != 10){
            txt = txt + "El telefono debe tener 10 caracteres.\n"
            errores++;
        }
    }
    
    if(correoP ==""){
        correoP = null;
    }else{
        let regexCorreo = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        if(!regexCorreo.test(correoP)){
            txt = txt + "El correo ingreado es incorrecto.\n"
            errores++;
        }
    }

    if (errores == 0)
        return true;
    else{
        swal(txt)
        return false;
    }
 }