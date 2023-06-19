
import "bootstrap/dist/css/bootstrap.min.css";
import './agregar_establecimiento.css';
import { Form_Add_establecimiento } from "../../forms/Form_Add_Establecimiento.js";

export function Add_establecimiento() {

    return <>
        <div class="titulo">
            <h1>Registra tu establecimiento</h1>
        </div>

        <div class="box-form">
            <Form_Add_establecimiento></Form_Add_establecimiento>
        </div>
    </>
}
