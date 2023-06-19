import swal from 'sweetalert';

export default async function ajaxLogin(){
    let correoP = document.getElementsByName("correo")[0].value;
    let credencialP = document.getElementById("contraseña").value;
    if(validarDatos(correoP,credencialP)){
        const response = await fetch(`http://localhost:3001/api/login?e=${correoP}&p=${credencialP}`);
        const respJson = await response.json();
        console.log(JSON.stringify(respJson));
        if (respJson.success) {
            document.cookie = "nombre=" + respJson.Data[0]['name'] + ";";
            document.cookie = "usuario=" + respJson.Data[0]['usuario'] + ";";
            document.cookie = "correo=" + respJson.Data[0]['email'] + ";";
            document.cookie = "telefono=" + respJson.Data[0]['telephone']+ ";";
            document.cookie = "id=" + respJson.Data[0]['_id'] + ";";
            document.cookie = "dueño=" + respJson.Data[0]['dueño'] + ";";
            console.log(decodeURIComponent(document.cookie));
            window.location.href = "/";
            
            swal("Sesión iniciada correctamente");
            return;
        }else
            swal("Usuario no encontrado");
    }
 }

 function validarDatos(correoP, credencialP){
    let errores = 0;
    let txt = "";
    let regexNombreYCredencial = /^[a-zA-ZñÑ0-9¿?¡!@#$%&]*$/;
    if(credencialP ==""){
        txt = txt + "La contraseña está vacía.\n";
        errores++;
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


    if(correoP ==""){
        txt = txt + "El correo está vacío.\n";
        errores++;
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
