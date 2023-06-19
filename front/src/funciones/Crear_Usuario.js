import swal from 'sweetalert';

 export default async function ajaxRegistroUsuario(){
    let nombreP = document.getElementsByName("name_user")[0].value;
    let usuarioP = document.getElementsByName("username_user")[0].value;
    let correoP = document.getElementsByName("email_user")[0].value;
    let telefonoP = document.getElementsByName("tel_user")[0].value;
    let credencialP = document.getElementsByName("pssw_user")[0].value;
    
    if(validarDatos(nombreP,usuarioP,correoP,telefonoP,credencialP)){
        var body = {
            name: nombreP,
            usuario: usuarioP,
            email: correoP,
            telephone: telefonoP,
            password: credencialP,
            activo: true,
            dueño: false
        }

        const response = await fetch(`http://localhost:3001/api/signin`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(body),
            }
        );
        
        const respJson = await response.json();
        console.log(JSON.stringify(respJson));
        if (respJson.success) {
            document.cookie = "nombre=" + respJson.Data['name'] + ";";
            document.cookie = "usuario=" + respJson.Data['usuario'] + ";";
            document.cookie = "correo=" + respJson.Data['email'] + ";";
            document.cookie = "telefono=" + respJson.Data['telephone']+ ";";
            document.cookie = "id=" + respJson.Data['_id'] + ";";
            document.cookie = "dueño=" + respJson.Data['dueño'] + ";";
            swal("Usuario creado correctamente");
            window.location.href = "/";
            return;
        }else{
            swal("Usuario no creado");
        }
    } 
 }

 function validarDatos(nombreP, usuarioP, correoP, telefonoP, credencialP){
    let errores = 0;
    let txt = "";
    if(nombreP ==""){
        txt = txt + "El nombre está vacío.\n";
        errores++;
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
        txt = txt + "El usuario está vacío.\n";
        errores++;
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

    if(telefonoP ==""){
        txt = txt + "El campo de telefono está vacío.\n";
        errores++;
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
