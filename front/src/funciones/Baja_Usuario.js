import getCookie from '../funciones/GetCookie.js';
import swal from 'sweetalert';

export default async function ajaxBajaUsuario(){
    var body = {
        id: getCookie("id")
    }
    const response = await fetch(`http://localhost:3001/api/Usuario`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body),
        }
    );
    
    const respJson = await response.json();
    console.log(JSON.stringify(respJson));
    if (respJson.success) {
        var a = new Date();
        a = new Date(a.getTime() - 60);
        document.cookie = "nombre=a; expires=" +a.toGMTString()+";";
        document.cookie = "correo=a; expires=" +a.toGMTString()+";";
        document.cookie = "usuario=a; expires=" +a.toGMTString()+";";
        document.cookie = "telefono=a; expires=" +a.toGMTString()+";";
        document.cookie = "id=a; expires=" +a.toGMTString()+";";
        document.cookie = "dueño=a; expires=" +a.toGMTString()+";";
        swal("Usuario eliminado correctamente");
        window.location.href = "/";
        return;
    }else{
        swal(JSON.stringify.respJson)
        swal("Usuario no editado");
    }
 }