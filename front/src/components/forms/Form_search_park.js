import "bootstrap/dist/css/bootstrap.min.css";
import Busqueda from "../../funciones/Busqueda.js";

function onClickSearchButton(){
    Busqueda(document.getElementById('search').value);
}

export function Form_search_park(){

    return <>
    <div class="input-group mb-3">
        <input id="search" type="text" class="form-control" placeholder="Direccion del estacionamiento" aria-describedby="basic-addon2"/>
        <div class="input-group-append">
            <button class="btn btn-danger" type="button" onClick={onClickSearchButton}>Buscar </button>
        </div>
    </div>
    </>
}